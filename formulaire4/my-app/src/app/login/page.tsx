"use client";

import './App.css'

import { useForm } from "react-hook-form";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {UserPlus } from "lucide-react";
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


function Login() {
  const form = useForm({
   defaultValues: {
      email: "",
      password: "",
  },
});
  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-pink-500">Connexion</CardTitle>
          <CardDescription>Connectez-vous à votre espace personnel de la Maison des Mines et des Ponts</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Login