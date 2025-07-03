"use client";

import './globals.css'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { loginSchema, LoginSchema, RegisterSchema } from "@/lib/schemas";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


function Login(data: LoginSchema) {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm({
   defaultValues: {
      email: "",
      password: "",
   },
  })
  
  function onSubmit(data: LoginSchema) {
    const usersJson = localStorage.getItem("users");
    const users: RegisterSchema[] = usersJson ? JSON.parse(usersJson) : [];
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      toast({
        title: "Connexion réussie",
        description: "Vous allez être redirigé vers votre espace personnel.",
      });
      router.push("/espace_perso");
    } else {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Adresse e-mail ou mot de passe incorrect.",
      });
    }
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-pink-500">Connexion</CardTitle>
          <CardDescription>Connectez-vous à votre espace personnel de la Maison des Mines et des Ponts</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse e-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="exemple@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                <UserPlus className="mr-2 h-4 w-4" />
                Se connecter
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Pas encore de compte?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Login