"use server";

import { prisma } from "@/lib/prisma";
import { Difficulty } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Recipe } from "@prisma/client";

// Récupérer toutes les recettes
export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const recipes: Recipe[] = await prisma.recipe.findMany({
      orderBy: { createdAt: "desc" },
    });
    return recipes;
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error);
    throw new Error("Erreur lors de la récupération des recettes");
  }
}

// Récupérer une recette par ID
export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const recipe: Recipe | null = await prisma.recipe.findUnique({
      where: { id },
    });
    return recipe;
  } catch (error) {
    console.error("Erreur lors de la récupération de la recette:", error);
    throw new Error("Erreur lors de la récupération de la recette");
  }
}

// Ajouter une nouvelle recette
export async function createRecipe(data: {
  title: string;
  description?: string;
  image: string;
  prepTime: number;
  difficulty: Difficulty;
  servings: number;
}): Promise<Recipe> {
  try {
    const recipe: Recipe = await prisma.recipe.create({
      data,
    });
    revalidatePath("/");
    console.log("Recette créée:", recipe.id);
    return recipe;
  } catch (error) {
    console.error("Erreur lors de la création de la recette:", error);
    throw new Error("Erreur lors de la création de la recette");
  }
}

// Mettre à jour une recette
export async function updateRecipe(
  id: string,
  data: {
    title?: string;
    description?: string;
    image?: string;
    prepTime?: number;
    difficulty?: Difficulty;
    servings?: number;
  },
): Promise<Recipe> {
  try {
    const recipe: Recipe = await prisma.recipe.update({
      where: { id },
      data,
    });
    revalidatePath("/");
    console.log("Recette mise à jour:", recipe.id);
    return recipe;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la recette:", error);
    throw new Error("Erreur lors de la mise à jour de la recette");
  }
}

// Supprimer une recette
export async function deleteRecipe(id: string): Promise<boolean> {
  try {
    await prisma.recipe.delete({
      where: { id },
    });
    revalidatePath("/");
    console.log("Recette supprimée:", id);
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression de la recette:", error);
    return false;
  }
}
