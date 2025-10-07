import { Recipe, RecipeDto } from "../types";

const API_BASE_URL = "http://localhost:3000/api/recipes";

// Récupérer toutes les recettes
export async function getAllRecipes(): Promise<Recipe[]> {
  const response = await fetch(API_BASE_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des recettes");
  }

  const data = await response.json();
  return data.recipes;
}

// Récupérer une recette par ID
export async function getRecipeById(id: number): Promise<Recipe | null> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Erreur lors de la récupération de la recette");
  }

  const data = await response.json();
  return data.recipe;
}

// Ajouter une nouvelle recette
export async function addNewRecipe(newRecipe: RecipeDto): Promise<Recipe> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de la recette");
  }

  return response.json();
}

// Supprimer une recette
export async function deleteRecipeById(id: number): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    if (response.status === 404) return false;
    throw new Error("Erreur lors de la suppression de la recette");
  }

  return true;
}
