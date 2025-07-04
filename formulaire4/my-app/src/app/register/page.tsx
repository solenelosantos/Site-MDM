"use client";

// Import des hooks et outils nécessaires
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Import des composants d'interface utilisateur
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";
import Link from "next/link";

// Import du système de formulaire personnalisé
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Import des composants de carte pour le layout
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import du composant Select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import du schéma de validation et du type de données pour l'inscription
import { registerSchema, RegisterSchema } from "@/lib/schemas";

export default function Signup() {
  const router = useRouter();
  const { toast } = useToast(); // Permet d’afficher des messages utilisateur (notifications)

  // Initialisation du formulaire avec validation via Zod
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      studyYear: "",
      isBursary: false,
    },
  });

  // Fonction exécutée lors de la soumission du formulaire
  function onSubmit(data: RegisterSchema) {
    const usersJson = localStorage.getItem("users");
    let users: RegisterSchema[] = usersJson ? JSON.parse(usersJson) : [];

    // Vérifie si un utilisateur existe déjà avec cet e-mail
    if (users.some((u) => u.email === data.email)) {
      toast({
        title: "Erreur d'inscription",
        description: "Un compte avec cette adresse e-mail existe déjà.",
        variant: "destructive",
      });
      return;
    }

    // Enregistre le nouvel utilisateur dans le localStorage
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    // Affiche un message de succès et redirige vers la page de connexion
    toast({
      title: "Inscription réussie",
      description: "Vous pouvez maintenant vous connecter !",
    });
    router.push("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-pink-500">Inscription</CardTitle>
          <CardDescription>Créez votre espace personnel de la Maison des Mines et des Ponts</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Champs Prénom et Nom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Barth" {...field} />
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
                        <Input placeholder="Lafont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Adresse email */}
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

              {/* Mot de passe */}
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

              {/* Année d'étude */}
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
                        <SelectItem value="1A">1ère année</SelectItem>
                        <SelectItem value="2A">2ème année</SelectItem>
                        <SelectItem value="3A">3ème année</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Boursier */}
              <FormField
                control={form.control}
                name="isBursary"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Êtes-vous boursier ?</FormLabel>
                      <FormDescription>
                        Cochez cette case si vous bénéficiez d'une bourse d'étude.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {/* Bouton de soumission */}
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                <UserPlus className="mr-2 h-4 w-4" />
                S'inscrire
              </Button>
            </form>
          </Form>
        </CardContent>

        {/* Lien vers la page de connexion */}
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/" className="font-semibold text-primary hover:underline">
              Connectez-vous
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
