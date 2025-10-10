"use client";

import RecipeCard from "@/components/recipes/recipeCard";
import { Recipe } from "@prisma/client";
import { useEffect, useState } from "react";
import { getUserFavorites } from "./utils";

export default function FavoritesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserFavorites()
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des favoris:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">
          Chargement de vos favoris...
        </div>
      </div>
    );
  }

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
