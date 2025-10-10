import { getUserFavoriteIds } from "@/app/favorites/utils";
import RecipeFilters from "@/components/recipes/recipeFilters";
import { Recipe } from "@prisma/client";
import { getAllRecipes } from "./utils";

export default async function RecipesPage() {
  const recipes: Recipe[] = await getAllRecipes();
  const favoriteIds = await getUserFavoriteIds();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Toutes les recettes</h1>
        <p className="text-sm text-muted-foreground">
          Découvrez notre collection complète de recettes
        </p>
      </div>

      <RecipeFilters recipes={recipes} favoriteIds={favoriteIds} />
    </div>
  );
}
