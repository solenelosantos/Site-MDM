"use client"; // Directive pour Next.js afin d’indiquer que ce composant est exécuté côté client

import './globals.css' // Import global des styles CSS

// Import des outils de formulaire et de validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Import des composants Next.js et UI personnalisés
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Import d’icône
import { UserPlus } from "lucide-react";

// Import des hooks personnalisés
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Import des schémas de validation Zod et des types
import { loginSchema, LoginSchema, RegisterSchema } from "@/lib/schemas";

// Import des composants de formulaire personnalisés
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Import des composants de carte (UI)
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Fonction principale de la page de connexion
function Login(data: LoginSchema) {
  const router = useRouter(); // Permet de naviguer entre les pages
  const { toast } = useToast(); // Hook pour afficher des notifications

  // Initialisation du formulaire avec les valeurs par défaut et le schéma de validation
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema), // Utilise Zod pour la validation
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Fonction appelée lors de la soumission du formulaire
  function onSubmit(data: LoginSchema) {
    // Récupération des utilisateurs stockés dans le localStorage
    const usersJson = localStorage.getItem("users");
    const users: RegisterSchema[] = usersJson ? JSON.parse(usersJson) : [];

    // Vérifie si l'utilisateur existe avec l’email et le mot de passe fourni
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      // Si trouvé : stockage dans localStorage et redirection
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      toast({
        title: "Connexion réussie",
        description: "Vous allez être redirigé vers votre espace personnel.",
      });
      router.push("/espace_perso");
    } else {
      // Sinon : affiche un message d’erreur
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Adresse e-mail ou mot de passe incorrect.",
      });
    }
  }

  // JSX retourné pour l’affichage de la page
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-pink-500">
            Connexion
          </CardTitle>
          <CardDescription>
            Connectez-vous à votre espace personnel de la Maison des Mines et des Ponts
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Composant de formulaire avec gestion de validation */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Champ Email */}
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

              {/* Champ Mot de passe */}
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

              {/* Bouton de soumission */}
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                <UserPlus className="mr-2 h-4 w-4" />
                Se connecter
              </Button>
            </form>
          </Form>
        </CardContent>

        {/* Pied de carte : lien vers la page d'inscription */}
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

export default Login; // Export du composant