"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Award, Edit, GraduationCap, LogOut, Mail, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { profileSchema, ProfileSchema, RegisterSchema } from "@/lib/schemas";

type User = RegisterSchema;

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    try {
      const loggedInUserJson = localStorage.getItem("loggedInUser");
      if (loggedInUserJson) {
        const loggedInUser = JSON.parse(loggedInUserJson);
        setUser(loggedInUser);
        form.reset({
            firstName: loggedInUser.firstName,
            lastName: loggedInUser.lastName,
            email: loggedInUser.email,
            studyYear: loggedInUser.studyYear,
        });
      } else {
        router.replace("/");
      }
    } catch (error) {
      router.replace("/");
    } finally {
        setIsMounted(true);
    }
  }, [router, form]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast({ title: "Déconnexion", description: "Vous avez été déconnecté." });
    router.push("/");
  };
 
  const handleProfileUpdate = (data: ProfileSchema) => {
    if(!user) return;

    const updatedUser = { ...user, ...data };
   
    const usersJson = localStorage.getItem("users");
    let users: User[] = usersJson ? JSON.parse(usersJson) : [];
   
    const userIndex = users.findIndex(u => u.email === user.email);

    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast({ title: "Profil mis à jour", description: "Vos informations ont été enregistrées." });
        setEditDialogOpen(false);
    } else {
        toast({ variant: "destructive", title: "Erreur", description: "Utilisateur introuvable." });
    }
  };

  if (!isMounted || !user) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <>
        <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Button variant="ghost" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                </Button>
            </div>
        </header>

        <main className="container mx-auto p-4 md:p-8">
            <Card className="shadow-xl overflow-hidden">
                <CardHeader className="bg-primary/10">
                    <CardTitle className="text-3xl text-primary">Espace Personnel</CardTitle>
                    <CardDescription className="text-lg">
                        Bienvenue, {user.firstName} !
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 grid gap-6">
                    <h3 className="text-xl font-semibold text-foreground">Vos informations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-primary" />
                            <span><strong>Nom complet :</strong> {user.firstName} {user.lastName}</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <span><strong>Email :</strong> {user.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            <span><strong>Année d'étude :</strong> {user.studyYear}</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Award className="h-5 w-5 text-primary" />
                            <span><strong>Statut boursier :</strong>
                                {user.isBursary ? (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">Oui</Badge>
                                ) : (
                                    <Badge variant="secondary" className="bg-red-100 text-red-800">Non</Badge>
                                )}
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                     <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" /> Modifier mon profil
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Modifier le profil</DialogTitle>
                                <DialogDescription>
                                    Mettez à jour vos informations personnelles ici.
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleProfileUpdate)} className="space-y-4 py-4">
                                     <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Prénom</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Nom</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} readOnly disabled />
                                                </FormControl>
                                                <FormDescription>L'adresse e-mail ne peut pas être modifiée.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="studyYear"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Année d'étude</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sélectionnez votre année" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                    <SelectItem value="L1">Licence 1</SelectItem>
                                                    <SelectItem value="L2">Licence 2</SelectItem>
                                                    <SelectItem value="L3">Licence 3</SelectItem>
                                                    <SelectItem value="M1">Master 1</SelectItem>
                                                    <SelectItem value="M2">Master 2</SelectItem>
                                                    <SelectItem value="Doctorat">Doctorat</SelectItem>
                                                    <SelectItem value="Autre">Autre</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                             <Button variant="outline" type="button">Annuler</Button>
                                        </DialogClose>
                                        <Button type="submit">Enregistrer</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </main>
    </>
  );
}