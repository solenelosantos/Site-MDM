## A) Description du projet

La Maison des Mines et des Ponts (Meuh) loge des centaines de mineurs chaque année. Sarah Chavanne, directrice adjointe de la Meuh, gère la création et l’organisation des dossiers de chaque élève, le paiement des loyers, les départs et arrivées de chacun… A chaque début d’année, elle reçoit des centaines de dossiers contenant les documents et informations nécessaires à l’obtention d’une chambre. Néanmoins, tout est fait à la main : elle reçoit encore les dossiers par la poste.

De plus, elle est sans cesse en train d’envoyer l’attestation de domicile et la quittance de loyer aux élèves qui lui demandent et dans le sens inverse est obligée de demander à chacun de lui envoyer des documents tels que l’attestation de bourse et le revenu d’impôts. Tous ces échanges se font par mail, sans qu’aucune plateforme ne les regroupe. Il faudrait un système unifié pour fluidifier la transmission des informations 

Nous avons donc été voir Sarah afin qu’elle nous explique précisément ce dont elle aurait besoin. Nous avons convenu de créer un espace personnel propre à chaque élève, dont l’accès est protégé par un mail et un mot de passe, qui permet d’accéder aux documents nécessaires (attestation de domicile et quittance de loyer) et de déposer ses propres documents (attestation de bourse et revenu d’impôts). Il est également possible de suivre le paiement de son loyer. Pour accéder à cette page d’espace personnel, il faut remplir un formulaire d’inscription afin de créer son compte puis ensuite se connecter à l’aide du mot de passe créé. Cela faciliterait les échanges et réduirait considérablement la tâche de travail de Sarah. 

A terme, nous souhaiterions relier cet espace personnel à CeriFoyer, logiciel actuellement utilisé par Sarah pour traiter les dossiers. Il serait intéressant que la création d’un espace personnel créé automatiquement un dossier dans le logiciel et qu’inversement, les documents générés soient accessibles au résident. 

## B) Description de nos choix techniques

En début de semaine, nous avons été orientés par M. Prasquier vers l'utilisation de React et de Vite pour commencer à coder par blocs les différents éléments que nous voulions voir affichés sur notre page. En React, ces différents éléments prennent la forme de "Composants" que nous avons commencé par coder indépendamment les uns des autres pour se faire une idée de comment ils pouvaient rendre à l'écran et s'intégrer dans les pages affichées. C'était d'après M. Prasquier un des grands intérêts de React + Vite : pouvoir coder avec la page rendue affichée en même temps et voir "en live" les modifications faites sur le code opérer sur la page.

Comme nous n'y connaissions rien en React et aux syntaxes utilisées, nous avons consacré pas mal de temps à lire la documentation et faire des tutoriels de React, disponibles sur la page : https://fr.react.dev/learn

Nous avons également pu récupérer directement certains composants React déjà codés sur le site https://ui.shadcn.com/docs/components
Cela nous a permis notamment de pouvoir intégrer sur nos pages des boîtes de dialogues, des boutons, des formulaires, des cartes, des tableaux, etc...

L'étape suivante était donc d'ajouter de l'interactivité entre les différentes pseudos pages que nous avions imaginées et de vraiment scinder notre architecture pour obtenir différentes pages à l'écran entre lesquelles l'utilisateur peut naviguer. Nous avons donc commencé par créer une page d'inscription, une page de connexion, et une page d'espace personnel. Pour cela, nous avons demandé de l'aide à M. Noce qui nous a orientés vers l'utilisation de la librairie Next.js, qui est une librairie de routage pour React. Cela nous a permis de créer des pages indépendantes les unes des autres et de pouvoir naviguer entre elles. Nous avons également utilisé la librairie "react-hook-form" pour gérer les formulaires et la validation des données saisies par l'utilisateur.
L'utilisation de Next.js a fortement conditionné la structure en arborescence de notre projet : il nous a fallu créer un dossier "app" dans lequel nous avons créé les différentes pages que nous voulions afficher, avec à chaque dossier correspondant à une page un fichier "page.tsx" qui contient le code de la page.
Nous avons également utilisé la librairie "zod" pour valider les données saisies par l'utilisateur dans les formulaires. Cela nous a permis de vérifier que les données saisies étaient conformes aux attentes et de renvoyer des messages d'erreur à l'utilisateur en cas de saisie incorrecte.

Le passage à Next s'est fait jeudi donc l'adaptation de notre premier code React à Next a été un peu compliquée, mais nous avons réussi à adapter notre code pour qu'il fonctionne avec Next.js et la validation des données saisies par l'utilisateur.

#### A ce stade, il reste énormément de perspectives de développement à parcourir. 

En l'état, notre code permet la navigation entre 3 pages : connexion (page par défaut), inscription, et espace personnel si la connexion est réussie. Il y a donc une mémorisation locale des données rentrées par l'utilisateur dans le formulaire d'inscription, mais pas de stockage permanent de ces données pour le moment. De même, une fonctionnalité dans l'espace personnel permet à l'utilisateur de déposer des documents, ils sont consultables par celui-ci même après déconnexion et reconnexion, mais ne sont pas stockés de façon permanente.
Il n'y a pas encore de contraintes (format ou taille) sur les documents déposés.

Le prototype visuel d'un tableau récapitulatif de la situation du résident vis à vis de ses paiements de loyer a été codé, mais celui-ci n'est pas dynamique : nous souhaitons à terme pouvoir le relier au logiciel CeriFoyer qui sert aux administrateurs de la Maison des Mines pour gérer les résidents et leurs paiements de loyer, mais nous ne savons pas encore si cela sera possible et si oui comment. De même, nous aimerions pouvoir relier le formulaire d'inscription à la base de données de la Maison des Mines pour que les données saisies par l'utilisateur soient stockées et puissent être consultées par les administrateurs. Nous n'avons pas encore commencé à travailler sur ces aspects.

#### De manière générale, en tant qu'élèves piauleurs (responsables de l'attribution des chambres de la résidence), nous sommes réellement intéressés par le fait de développer ce site internet et de retravailler ce code a posteriori quand nous aurons plus de temps pour le faire, et les idées évoquées ci-dessus sont concrètes et ont vocation à être reprises.

## C) Exécuter le projet

```bash
npm run dev
# or
yarn run dev
# or
pnpm run dev
# or
bun run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) pour voir le résultat sur le navigateur.

# Librairies//outils utilisés

- Next.js (React 18+)
- TypeScript
- Tailwind CSS
- shadcn/ui (composants UI)
- react-hook-form (gestion de formulaire)
- zod (validation de schémas)
- @hookform/resolvers (intégration zod avec react-hook-form)
- lucide-react (icônes SVG)

# Composants shadcn/ui utilisés

- Form
- Input
- Button
- Card
- Table
- Checkbox
- Dialog
- Select
- Toast

Installation via CLI :

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add form input button card checkbox select toast dialog table
```

# Autres outils utilisés

- `localStorage` : stockage temporaire des utilisateurs
- `useRouter` (next/navigation) : redirections client
- `"use client"` : composants côté client (obligatoire pour les hooks)

# Structure

- `/app/register/page.tsx` – Page d’inscription
- `/app/espace_perso/page.tsx` – Page d'espace personnel
- `/app/page.tsx` - Page de connexion
- `/lib/schemas.ts` – Schémas zod
- `/components/ui/` – Composants UI shadcn