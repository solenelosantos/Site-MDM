import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
  studyYear: z.string({ required_error: "Veuillez sélectionner une année d'étude."}).min(1, { message: "Veuillez sélectionner une année d'étude." }),
  isBursary: z.boolean().default(false),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});

export const profileSchema = z.object({
    firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
    lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    email: z.string().email({ message: "Adresse e-mail invalide." }),
    studyYear: z.string().min(1, { message: "Veuillez sélectionner une année d'étude." }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type ProfileSchema = z.infer<typeof profileSchema>;