"use server";

import { prisma } from "@/lib/prisma";
import { Difficulty, Comment } from "@prisma/client";
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

// Type pour un commentaire avec les infos de l'utilisateur
export type CommentWithUser = Comment & {
  user: {
    id: string;
    name: string | null;
    email: string;
    avatar: string | null;
  };
};

// Récupérer tous les commentaires d'une recette
export async function getCommentsByRecipeId(
  recipeId: string,
): Promise<CommentWithUser[]> {
  try {
    const comments = await prisma.comment.findMany({
      where: { recipeId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return comments;
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    throw new Error("Erreur lors de la récupération des commentaires");
  }
}

// Ajouter un commentaire
export async function createComment(data: {
  content: string;
  rating: number;
  userId: string;
  recipeId: string;
}): Promise<Comment> {
  try {
    // Validation de la note (1-5)
    if (data.rating < 1 || data.rating > 5) {
      throw new Error("La note doit être entre 1 et 5");
    }

    const comment = await prisma.comment.create({
      data,
    });
    revalidatePath(`/recipes/${data.recipeId}`);
    console.log("Commentaire créé:", comment.id);
    return comment;
  } catch (error) {
    console.error("Erreur lors de la création du commentaire:", error);
    throw new Error("Erreur lors de la création du commentaire");
  }
}

// Mettre à jour un commentaire
export async function updateComment(
  id: string,
  data: {
    content?: string;
    rating?: number;
  },
): Promise<Comment> {
  try {
    // Validation de la note si elle est fournie
    if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
      throw new Error("La note doit être entre 1 et 5");
    }

    const comment = await prisma.comment.update({
      where: { id },
      data,
    });

    // Récupérer le recipeId pour la revalidation
    const commentWithRecipe = await prisma.comment.findUnique({
      where: { id },
      select: { recipeId: true },
    });

    if (commentWithRecipe) {
      revalidatePath(`/recipes/${commentWithRecipe.recipeId}`);
    }

    console.log("Commentaire mis à jour:", comment.id);
    return comment;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du commentaire:", error);
    throw new Error("Erreur lors de la mise à jour du commentaire");
  }
}

// Supprimer un commentaire
export async function deleteComment(
  id: string,
  recipeId: string,
): Promise<boolean> {
  try {
    await prisma.comment.delete({
      where: { id },
    });
    revalidatePath(`/recipes/${recipeId}`);
    console.log("Commentaire supprimé:", id);
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire:", error);
    return false;
  }
}

// Calculer la note moyenne d'une recette
export async function getAverageRating(recipeId: string): Promise<number> {
  try {
    const result = await prisma.comment.aggregate({
      where: { recipeId },
      _avg: {
        rating: true,
      },
    });
    return result._avg.rating || 0;
  } catch (error) {
    console.error("Erreur lors du calcul de la note moyenne:", error);
    return 0;
  }
}
