import RecipeCard from "@/components/recipeCard";
import { Recipe } from "@prisma/client";
import { getAllRecipes } from "./utils";

export default async function RecipesPage() {
  const recipes: Recipe[] = await getAllRecipes();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Toutes les recettes</h1>
        <p className="text-muted-foreground">
          {recipes.length} recettes disponibles
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
