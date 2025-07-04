"use client"; // Indique que ce composant doit être rendu côté client (Next.js)

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Award, Edit, GraduationCap, LogOut, Mail, User as UserIcon,
  Upload, File as FileIcon
} from "lucide-react"; // Import d'icônes Lucide
import { useRouter } from "next/navigation"; // Pour rediriger avec Next.js
import { useState, type ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form"; // Hook pour les formulaires

// Import des composants UI réutilisables
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger, DialogClose
} from "@/components/ui/dialog";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage
} from "@/components/ui/form";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton"; // Composant de chargement
import { useToast } from "@/hooks/use-toast"; // Hook pour les notifications
import { profileSchema, ProfileSchema, RegisterSchema } from "@/lib/schemas"; // Schémas de validation

type User = RegisterSchema; // Alias pour simplifier

export default function DashboardPage() {
  const router = useRouter(); // Hook de navigation
  const { toast } = useToast(); // Hook de notification
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Fichier sélectionné
  const getUserFilesKey = (userId: string) => `user-files-${userId}`; // Clé locale pour stocker les fichiers
  const [user, setUser] = useState<User | null>(null); // Données utilisateur
  const [isMounted, setIsMounted] = useState(false); // Vérifie si le composant est monté (évite SSR)
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; dataUrl: string }[]>([]); // Fichiers uploadés
  const [isEditDialogOpen, setEditDialogOpen] = useState(false); // Contrôle de la modale de profil

  // Initialisation du formulaire avec validation Zod
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  // Récupération des données utilisateur et fichiers au montage
  useEffect(() => {
    try {
      const loggedInUserJson = localStorage.getItem("loggedInUser");
      if (loggedInUserJson) {
        const loggedInUser = JSON.parse(loggedInUserJson);
        setUser(loggedInUser);

        // Pré-remplit le formulaire
        form.reset({
          firstName: loggedInUser.firstName,
          lastName: loggedInUser.lastName,
          email: loggedInUser.email,
          studyYear: loggedInUser.studyYear,
        });

        // Charge les fichiers utilisateur
        const userFilesJson = localStorage.getItem(getUserFilesKey(loggedInUser.email));
        if (userFilesJson) {
          setUploadedFiles(JSON.parse(userFilesJson));
        }
      } else {
        router.replace("/"); // Redirection si utilisateur non connecté
      }
    } catch (error) {
      router.replace("/");
    } finally {
      setIsMounted(true); // Indique que le composant est prêt
    }
  }, [router, form]);

  // Mise à jour du fichier sélectionné
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  // Gère l’upload d’un fichier sélectionné
  const handleUpload = () => {
    if (selectedFile && user && user.email) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;

        const newFile = {
          name: selectedFile.name,
          dataUrl: base64,
        };

        const existingFilesJson = localStorage.getItem(getUserFilesKey(user.email));
        const existingFiles = existingFilesJson ? JSON.parse(existingFilesJson) : [];

        const updatedFiles = [...existingFiles, newFile];
        localStorage.setItem(getUserFilesKey(user.email), JSON.stringify(updatedFiles));
        setUploadedFiles(updatedFiles);

        setSelectedFile(null);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

        toast({
          title: "Succès",
          description: `Le fichier "${selectedFile.name}" a été déposé.`,
        });
      };

      reader.readAsDataURL(selectedFile);
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier à déposer.",
        variant: "destructive",
      });
    }
  };

  // Déconnecte l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast({ title: "Déconnexion", description: "Vous avez été déconnecté." });
    router.push("/");
  };

  // Enregistre les modifications de profil
  const handleProfileUpdate = (data: ProfileSchema) => {
    if (!user) return;

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

  // Affiche un squelette en attendant le chargement
  if (!isMounted || !user) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  // Rendu principal
  return (
    <>
      {/* En-tête avec bouton de déconnexion */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col gap-15">

          {/* Carte d'informations personnelles */}
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
                {/* Nom complet */}
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-primary" />
                  <span><strong>Nom complet :</strong> {user.firstName} {user.lastName}</span>
                </div>
                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span><strong>Email :</strong> {user.email}</span>
                </div>
                {/* Année d'étude */}
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span><strong>Année d'étude :</strong> {user.studyYear}</span>
                </div>
                {/* Statut boursier */}
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
              {/* Bouton d'édition du profil avec modale */}
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
                      {/* Prénom */}
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Nom */}
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Email (non modifiable) */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input {...field} readOnly disabled /></FormControl>
                            <FormDescription>L'adresse e-mail ne peut pas être modifiée.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Année d'étude (select) */}
                      <FormField
                        control={form.control}
                        name="studyYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Année d'étude</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger><SelectValue placeholder="Sélectionnez votre année" /></SelectTrigger>
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
                      {/* Boutons modale */}
                      <DialogFooter>
                        <DialogClose asChild><Button variant="outline" type="button">Annuler</Button></DialogClose>
                        <Button type="submit">Enregistrer</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Tableau des loyers */}
          <Table className='text-blue-500'>
            <TableCaption> Statuts de vos derniers loyers </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Mois</TableHead>
                <TableHead className="text-center">Somme</TableHead>
                <TableHead className="text-right">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-left">Mai</TableCell>
                <TableCell className="text-center">200.00 €</TableCell>
                <TableCell className="text-right">Acquitté</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">Juin</TableCell>
                <TableCell className="text-center">200.00 €</TableCell>
                <TableCell className="text-right">Acquitté</TableCell>
              </TableRow>
              <TableRow className="text-red-500">
                <TableCell className="text-left">Juillet</TableCell>
                <TableCell className="text-center">1.00 €</TableCell>
                <TableCell className="text-right">Dû</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Section de dépôt de fichiers */}
          <Card>
            <CardHeader>
              <CardTitle>Mes Documents</CardTitle>
              <CardDescription>Déposez vos documents importants ici.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input id="file-upload" type="file" onChange={handleFileChange} className="flex-grow" />
                <Button onClick={handleUpload} disabled={!selectedFile}>
                  <Upload className="mr-2 h-4 w-4" />
                  Déposer
                </Button>
              </div>
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Fichier sélectionné: {selectedFile.name}
                </p>
              )}
            </CardContent>
            {uploadedFiles.length > 0 && (
              <CardFooter className="flex flex-col items-start gap-4 border-t pt-6">
                <h4 className="font-medium text-sm">Fichiers déposés:</h4>
                <ul className="space-y-2 w-full">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted">
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono">{file.name}</span>
                      </div>
                      <a
                        href={file.dataUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Voir
                      </a>
                    </li>
                  ))}
                </ul>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>
    </>
  );
}
