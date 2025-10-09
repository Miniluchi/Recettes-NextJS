# 🍳 Application de Gestion de Recettes

Une application web moderne de gestion de recettes construite avec Next.js 15, permettant aux utilisateurs de découvrir, créer et sauvegarder leurs recettes préférées.

## ✨ Fonctionnalités

- **Authentification sécurisée** : Système d'inscription et de connexion avec gestion de session JWT
- **Gestion de recettes** : Création, consultation et filtrage de recettes
- **Système de favoris** : Sauvegardez vos recettes préférées
- **Stockage d'images** : Upload et hébergement d'images via Cloudflare R2
- **Interface moderne** : Design responsive avec shadcn/ui et Tailwind CSS
- **Thème adaptatif** : Adaptation automatique au thème système (clair/sombre)
- **Routes protégées** : Middleware pour sécuriser l'accès aux fonctionnalités authentifiées

## 🛠️ Stack Technique

- **Framework** : Next.js 15 avec App Router et Turbopack
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : NextAuth.js (stratégie JWT)
- **Stockage** : Cloudflare R2 (compatible S3)
- **UI** : shadcn/ui + Tailwind CSS v4
- **Validation** : React Hook Form + Zod
- **Notifications** : Sonner (toast notifications)

## 🚀 Installation et Démarrage

### Prérequis

- Node.js 20+ et npm
- Docker et Docker Compose (pour PostgreSQL)
- Un compte Cloudflare avec R2 activé

### Configuration

1. **Cloner le projet et installer les dépendances**

```bash
git clone <votre-repo>
cd recettes-nextjs
npm install
```

2. **Configurer les variables d'environnement**

Copiez le fichier `.env.example` vers `.env` et remplissez les valeurs :

```bash
cp .env.example .env
```

Variables à configurer :

- `DATABASE_URL` : URL de connexion PostgreSQL
- `NEXTAUTH_URL` : URL de l'application (http://localhost:3000 en dev)
- `NEXTAUTH_SECRET` : Clé secrète pour NextAuth (générez-en une avec `openssl rand -base64 32`)
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL` : Identifiants Cloudflare R2

3. **Démarrer la base de données**

```bash
docker-compose up -d
```

4. **Initialiser la base de données**

```bash
npm run prisma:sync
```

5. **Lancer l'application en développement**

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponibles

```bash
# Développement
npm run dev              # Démarre le serveur de développement (Turbopack)

# Production
npm run build            # Compile l'application pour la production
npm start                # Démarre le serveur de production

# Qualité du code
npm run lint             # Analyse le code avec ESLint

# Base de données (Prisma)
npm run prisma:generate  # Génère le client Prisma
npm run prisma:migrate   # Exécute les migrations
npm run prisma:sync      # Génère le client + migrations (recommandé après modification du schéma)
npm run prisma:studio    # Ouvre l'interface Prisma Studio
```

## 📁 Structure du Projet

```
recettes-nextjs/
├── app/                      # Routes et pages Next.js (App Router)
│   ├── api/                  # API routes
│   │   └── auth/             # Endpoints NextAuth
│   ├── recipes/              # Pages recettes
│   │   ├── utils.ts          # Server Actions pour les recettes
│   │   ├── page.tsx          # Liste des recettes
│   │   ├── new/              # Création de recette
│   │   └── [recipeID]/       # Détail d'une recette
│   ├── favorites/            # Page des favoris (protégée)
│   ├── login/                # Page de connexion
│   ├── register/             # Page d'inscription
│   └── layout.tsx            # Layout racine avec providers
├── components/               # Composants React réutilisables
│   ├── ui/                   # Composants shadcn/ui
│   ├── navbar.tsx            # Barre de navigation
│   ├── providers.tsx         # SessionProvider
│   └── theme-provider.tsx    # Gestion du thème
├── lib/                      # Utilitaires et configurations
│   ├── authOptions.ts        # Configuration NextAuth
│   ├── prisma.ts             # Instance Prisma Client
│   ├── r2.ts                 # Client Cloudflare R2
│   └── utils.ts              # Fonctions utilitaires
├── prisma/
│   └── schema-postgres.prisma # Schéma de base de données
├── middleware.ts             # Middleware de protection des routes
└── docker-compose.yml        # Configuration PostgreSQL
```

## 🔒 Authentification

L'application utilise NextAuth.js avec une stratégie JWT :

- Les mots de passe sont hachés avec bcryptjs
- Les sessions sont stockées côté client (JWT) pour de meilleures performances
- Le middleware protège automatiquement `/recipes/new` et `/favorites`
- Les utilisateurs non authentifiés sont redirigés vers `/login` avec un message

## 🗄️ Base de Données

Le schéma Prisma se trouve dans `prisma/schema-postgres.prisma`.

**Modèles principaux** :

- `User` : Utilisateurs avec authentification
- `Recipe` : Recettes (titre, description, image, temps de préparation, difficulté, portions)
- `Favorite` : Relation many-to-many entre utilisateurs et recettes
- Modèles NextAuth : `Account`, `Session`, `VerificationToken`, `Authenticator`

## 📦 Déploiement

### Variables d'environnement requises

Assurez-vous de configurer toutes les variables d'environnement sur votre plateforme de déploiement :

- Variables de base de données (DATABASE_URL)
- Variables NextAuth (NEXTAUTH_URL, NEXTAUTH_SECRET)
- Variables Cloudflare R2 (R2\_\*)

### Commandes de déploiement

```bash
npm run build
npm start
```
