"use client"; // Indique que ce composant est exécuté côté client dans Next.js

// Imports de bibliothèques externes et d’icônes
import { zodResolver } from "@hookform/resolvers/zod";
import { Award, Edit, GraduationCap, LogOut, Mail, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";

// Composants UI personnalisés
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, File as FileIcon } from "lucide-react";
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger, DialogClose,
} from "@/components/ui/dialog";
import {
  Form, FormControl, FormField, FormItem,
  FormLabel, FormDescription, FormMessage
} from "@/components/ui/form";
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { profileSchema, ProfileSchema, RegisterSchema } from "@/lib/schemas";

// Définition du type User à partir du schéma d'enregistrement
type User = RegisterSchema;

// Composant principal
export default function DashboardPage() {
  const router = useRouter(); // Pour navigation dans Next.js
  const { toast } = useToast(); // Hook pour afficher des notifications

  // États React
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Fichier en cours de sélection
  const getUserFilesKey = (userId: string) => `user-files-${userId}`; // Génère une clé unique par utilisateur
  const [user, setUser] = useState<User | null>(null); // Utilisateur connecté
  const [isMounted, setIsMounted] = useState(false); // Pour gérer le rendu uniquement après le montage du composant
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; dataUrl: string }[]>([]); // Liste des fichiers déposés
  const [isEditDialogOpen, setEditDialogOpen] = useState(false); // Contrôle d’ouverture du modal d'édition

  // Formulaire pour éditer le profil, basé sur Zod et React Hook Form
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  // useEffect pour récupérer l'utilisateur connecté et ses fichiers depuis le localStorage
  useEffect(() => {
    try {
      const loggedInUserJson = localStorage.getItem("loggedInUser");

      if (loggedInUserJson) {
        const loggedInUser = JSON.parse(loggedInUserJson);
        setUser(loggedInUser);

        // Initialise le formulaire avec les données de l'utilisateur
        form.reset({
          firstName: loggedInUser.firstName,
          lastName: loggedInUser.lastName,
          email: loggedInUser.email,
          studyYear: loggedInUser.studyYear,
        });

        // Charge les fichiers déjà déposés
        const userFilesJson = localStorage.getItem(getUserFilesKey(loggedInUser.email));
        if (userFilesJson) {
          setUploadedFiles(JSON.parse(userFilesJson));
        }

      } else {
        // Redirige vers la page d’accueil si non connecté
        router.replace("/");
      }
    } catch (error) {
      router.replace("/");
    } finally {
      setIsMounted(true);
    }
  }, [router, form]);

  // Gère la sélection d’un fichier
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  // Fonction de dépôt d’un fichier
  const handleUpload = () => {
    if (selectedFile && user) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;

        const newFile = {
          name: selectedFile.name,
          dataUrl: base64, // fichier encodé en base64
        };

        const existingFilesJson = localStorage.getItem(getUserFilesKey(user.email));
        const existingFiles = existingFilesJson ? JSON.parse(existingFilesJson) : [];

        const updatedFiles = [...existingFiles, newFile];

        // Sauvegarde mise à jour
        localStorage.setItem(getUserFilesKey(user.email), JSON.stringify(updatedFiles));
        setUploadedFiles(updatedFiles);

        // Réinitialise le champ de fichier
        setSelectedFile(null);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

        // Affiche toast de confirmation
        toast({
          title: "Succès",
          description: `Le fichier "${selectedFile.name}" a été déposé.`,
        });
      };

      reader.readAsDataURL(selectedFile); // Convertit le fichier en base64
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier à déposer.",
        variant: "destructive",
      });
    }
  };

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast({ title: "Déconnexion", description: "Vous avez été déconnecté." });
    router.push("/");
  };

  // Mise à jour du profil utilisateur
  const handleProfileUpdate = (data: ProfileSchema) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };

    const usersJson = localStorage.getItem("users");
    let users: User[] = usersJson ? JSON.parse(usersJson) : [];

    const userIndex = users.findIndex(u => u.email === user.email);

    if (userIndex !== -1) {
      users[userIndex] = updatedUser;

      // Sauvegarde mise à jour
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast({ title: "Profil mis à jour", description: "Vos informations ont été enregistrées." });
      setEditDialogOpen(false);
    } else {
      toast({ variant: "destructive", title: "Erreur", description: "Utilisateur introuvable." });
    }
  };

  // Affiche des squelettes de chargement avant que le composant ne soit monté
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

          {/* Carte Profil */}
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
                {/* Informations utilisateur */}
                {/* ... (nom, email, année d'étude, statut boursier) */}
              </div>
            </CardContent>

            {/* Modal d’édition de profil */}
            <CardFooter>
              <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button><Edit className="mr-2 h-4 w-4" /> Modifier mon profil</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Modifier le profil</DialogTitle>
                    <DialogDescription>
                      Mettez à jour vos informations personnelles ici.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Formulaire d'édition */}
                  {/* ... (prénom, nom, email, année d'étude) */}
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Tableau des loyers */}
          <Table className='text-blue-500'>
            {/* ... Mois, Somme, Statut (acquitté ou dû) */}
          </Table>

          {/* Carte de dépôt de fichiers */}
          <Card>
            <CardHeader>
              <CardTitle>Mes Documents</CardTitle>
              <CardDescription>Déposez vos documents importants ici.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload file */}
              <div className="flex items-center space-x-2">
                <Input id="file-upload" type="file" onChange={handleFileChange} className="flex-grow" />
                <Button onClick={handleUpload} disabled={!selectedFile}>
                  <Upload className="mr-2 h-4 w-4" /> Déposer
                </Button>
              </div>
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Fichier sélectionné: {selectedFile.name}
                </p>
              )}
            </CardContent>

            {/* Liste des fichiers déposés */}
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
