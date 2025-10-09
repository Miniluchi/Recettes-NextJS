import RecipeCard from "@/components/recipeCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserFavorites } from "./utils";

export default async function FavoritesPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const recipes = await getUserFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Mes favoris</h1>
        <p className="text-muted-foreground">
          {recipes.length}{" "}
          {recipes.length > 1 ? "recettes favorites" : "recette favorite"}
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Vous n&apos;avez pas encore de recettes favorites.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} isFavorite={true} />
          ))}
        </div>
      )}
    </div>
  );
}
