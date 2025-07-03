"use client";

import iconEspace from './icons/icon_mon_espace_personnel.svg'
import { useState, type ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, File as FileIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DashboardPage() {
    const { toast } = useToast();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const getUserFilesKey = (userId: string) => `user-files-${userId}`;

    useEffect(() => {
        if (user) {
            try {
                const userFilesKey = getUserFilesKey(user.id);
                const storedFiles = localStorage.getItem(userFilesKey);
                if (storedFiles) {
                    setUploadedFiles(JSON.parse(storedFiles));
                }
            } catch (error) {
                console.error("Failed to parse files from localStorage", error);
                // Optionally, show a toast to the user
                toast({
                    title: "Erreur",
                    description: "Impossible de charger la liste de vos documents.",
                    variant: "destructive",
                });
            }
        }
    }, [user, toast]);

    if (!user) {
        return null;
    }
    
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const handleUpload = () => {
        if (selectedFile && user) {
            const newFiles = [...uploadedFiles, selectedFile.name];
            setUploadedFiles(newFiles);
            localStorage.setItem(getUserFilesKey(user.id), JSON.stringify(newFiles));
            
            setSelectedFile(null);
            
            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }

            toast({
                title: "Succès",
                description: `Le fichier "${selectedFile.name}" a été déposé.`,
            });
        } else {
            toast({
                title: "Erreur",
                description: "Veuillez sélectionner un fichier à déposer.",
                variant: "destructive",
            });
        }
    };

function Perso() {

  return (
    <>
      <div className="flex items-center gap-4">
  <img src={iconEspace} alt="Logo Espace Personnel" className="w-30 h-auto" />
  <h1 className="text-xl font-semibold">Mon espace personnel</h1>
</div>
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
      <TableCell>200.00 €</TableCell>
      <TableCell className="text-right">Acquitté</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="text-left">Juillet</TableCell>
      <TableCell>200.00 €</TableCell>
      <TableCell className = "text-right">Dû</TableCell>
    </TableRow>
  </TableBody>
</Table>
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-3xl space-y-8">
                    <Button>
                        Déconnexion
                    </Button>
                

                <Card className="w-full">
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            <div>
                                <CardTitle className="text-2xl font-headline">
                                    Bienvenue !
                                </CardTitle>
                                <CardDescription>
                                    Ceci est votre espace personnel sécurisé.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-4 space-y-4 text-sm">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">Nom complet</span>
                                <span className="font-medium">Prénom Nom</span>
                            </div>
                             <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">Identifiant unique</span>
                                <span className="font-mono font-medium">Id</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">Année d’étude</span>
                                <span className="font-medium">Année d'étude</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Boursier</span>
                                <span className="font-medium px-3 py-1 rounded-full">
                                    Boursier ?
                                </span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <p className="text-xs text-muted-foreground">
                            Pour modifier vos informations, veuillez contacter l'administrateur.
                        </p>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Mes Documents</CardTitle>
                        <CardDescription>
                            Déposez vos documents importants ici.
                        </CardDescription>
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
                                {uploadedFiles.map((fileName, index) => (
                                    <li key={index} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted">
                                        <div className="flex items-center gap-2">
                                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-mono">{fileName}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardFooter>
                    )}
                </Card>

            </div>
        </div>
        </>
    );
}

export default Perso;