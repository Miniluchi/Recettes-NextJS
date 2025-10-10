import { getUserFavoriteIds } from "@/app/favorites/utils";
import { getAllRecipes } from "@/app/recipes/utils";
import RecipeCard from "@/components/recipes/recipeCard";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Recipe } from "@prisma/client";
import Link from "next/link";

export default async function Home() {
  const recipes: Recipe[] = await getAllRecipes();
  const favoriteIds = await getUserFavoriteIds();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Mes Recettes</h1>
        <p className="text-muted-foreground">
          Découvrez ma collection de recettes favorites
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {recipes.slice(0, 3).map((recipe: Recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favoriteIds.has(recipe.id)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <ButtonGroup>
          <Button variant="outline" asChild>
            <Link href="/recipes">Voir toutes les recettes →</Link>
          </Button>
          <Button asChild>
            <Link href="/recipes/new">Ajouter une recette</Link>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
