# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 recipe management application with authentication, favorites, and image storage. The app uses:

- **Next.js 15** with App Router and Turbopack
- **PostgreSQL** database via Prisma ORM
- **NextAuth.js** for authentication (credentials-based with JWT sessions)
- **Cloudflare R2** for image storage
- **shadcn/ui** components with Tailwind CSS

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Prisma commands
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:sync      # Generate + Migrate (useful after schema changes)
npm run prisma:studio    # Open Prisma Studio GUI

# Start PostgreSQL via Docker
docker-compose up -d
```

## Database Setup

The project uses a custom Prisma schema location: `prisma/schema-postgres.prisma`

All Prisma commands must use this schema file (already configured in package.json scripts).

To set up the database:

1. Start PostgreSQL: `docker-compose up -d`
2. Copy `.env.example` to `.env` and configure:
   - `DATABASE_URL` for PostgreSQL connection
   - `NEXTAUTH_SECRET` for NextAuth.js
   - `R2_*` variables for Cloudflare R2 storage
3. Run migrations: `npm run prisma:sync`

## Architecture

### Authentication Flow

- **Provider**: NextAuth.js with CredentialsProvider
- **Strategy**: JWT sessions (not database sessions)
- **Password hashing**: bcryptjs
- **Configuration**: `lib/authOptions.ts` exports the NextAuth configuration
- **API Route**: `app/api/auth/[...nextauth]/route.ts` handles auth endpoints
- **Session Provider**: Wrapped in `components/providers.tsx` at root layout level
- **Middleware**: `middleware.ts` protects `/recipes/new` and `/favorites` routes, redirects to `/login` with auth message in cookie

### Database Models (Prisma)

- **User**: Authentication with email/password, relations to accounts, sessions, and favorites
- **Recipe**: Core recipe data with title, description, image (R2 URL), prepTime, difficulty (enum), servings
- **Favorite**: Junction table linking users and recipes (unique constraint on userId + recipeId)
- **Account/Session/VerificationToken/Authenticator**: NextAuth.js adapter models

### Key Routes

- `/` - Home page
- `/login` - Login page (reads auth-message cookie for middleware redirects)
- `/register` - Registration page
- `/recipes` - Recipe list with filtering
- `/recipes/[recipeID]` - Recipe detail page
- `/recipes/new` - Create new recipe (protected route)
- `/favorites` - User's favorite recipes (protected route)

### Shared Components

- **Navbar**: Fixed top-right navigation with tooltips (components/navbar.tsx)
- **Providers**: SessionProvider wrapper (components/providers.tsx)
- **ThemeProvider**: Wraps next-themes, includes useEffect to force system theme by clearing localStorage

### Image Storage

Images are stored on Cloudflare R2 (S3-compatible). Configuration in `lib/r2.ts`:

- Uses AWS SDK S3Client
- Requires R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL

### Server Actions Organization

Server Actions are organized co-located with the features that use them, not in a central actions directory:

- Place Server Actions in a `utils.ts` file within the same directory where they're used
- Example: `/app/recipes/utils.ts` contains all recipe-related Server Actions (getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe)
- Each `utils.ts` file should have `"use server"` directive at the top
- Functions should be properly typed with Prisma types and include error handling
- Call `revalidatePath()` after mutations to update cached data

This keeps related functionality together and makes the codebase easier to navigate.

## Important Notes

- **Prisma schema location**: Always use `schema-postgres.prisma`, not the default `schema.prisma`
- **Protected routes**: Add new protected routes to the `protectedRoutes` array in `middleware.ts`
- **Authentication state**: Use `useSession()` from next-auth/react in client components
- **Server-side auth**: Use `getServerSession(authOptions)` in server components/API routes
