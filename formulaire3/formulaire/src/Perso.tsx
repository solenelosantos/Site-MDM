import iconEspace from './icons/icon_mon_espace_personnel.svg'
import './Perso.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
                </Card>

            </div>
        </div>
        </>
    );
}

export default Perso
