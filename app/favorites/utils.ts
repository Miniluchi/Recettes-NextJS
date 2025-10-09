"use server";

import { getCurrentUser, UserSession } from "@/app/utils";
import { prisma } from "@/lib/prisma";
import { Favorite, Recipe } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Ajouter une recette aux favoris
export async function addToFavorites(
  recipeId: string,
): Promise<{ success: boolean; favorite?: Favorite }> {
  try {
    const user: UserSession | null = await getCurrentUser();

    if (!user) {
      throw new Error("Non authentifié");
    }

    const favorite: Favorite = await prisma.favorite.create({
      data: {
        userId: user.id,
        recipeId,
      },
    });

    revalidatePath("/favorites");
    revalidatePath("/recipes");
    revalidatePath("/");

    return { success: true, favorite };
  } catch (error: unknown) {
    console.error("Erreur lors de l'ajout aux favoris:", error);

    // Gestion spécifique pour l'erreur de contrainte unique (Prisma)
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      throw new Error("Cette recette est déjà dans vos favoris");
    }

    throw new Error("Erreur lors de l'ajout aux favoris");
  }
}

// Retirer une recette des favoris
export async function removeFromFavorites(
  recipeId: string,
): Promise<{ success: boolean }> {
  try {
    const user: UserSession | null = await getCurrentUser();

    if (!user) {
      throw new Error("Non authentifié");
    }

    await prisma.favorite.delete({
      where: {
        userId_recipeId: {
          userId: user.id,
          recipeId,
        },
      },
    });

    revalidatePath("/favorites");
    revalidatePath("/recipes");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression du favori:", error);
    throw new Error("Erreur lors de la suppression du favori");
  }
}

// Vérifier si une recette est en favori
export async function isFavorite(recipeId: string): Promise<boolean> {
  try {
    const user: UserSession | null = await getCurrentUser();

    if (!user) {
      return false;
    }

    const favorite: Favorite | null = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId: user.id,
          recipeId,
        },
      },
    });

    return !!favorite;
  } catch (error) {
    console.error("Erreur lors de la vérification du favori:", error);
    return false;
  }
}

// Récupérer tous les favoris d'un utilisateur
export async function getUserFavorites(): Promise<Recipe[]> {
  try {
    const user: UserSession | null = await getCurrentUser();

    if (!user) {
      return [];
    }

    const favorites: (Favorite & { recipe: Recipe })[] =
      await prisma.favorite.findMany({
        where: { userId: user.id },
        include: {
          recipe: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return favorites.map(
      (fav: Favorite & { recipe: Recipe }): Recipe => fav.recipe,
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des favoris:", error);
    return [];
  }
}

// Récupérer uniquement les IDs des favoris pour vérification rapide
export async function getUserFavoriteIds(): Promise<Set<string>> {
  try {
    const user: UserSession | null = await getCurrentUser();

    if (!user) {
      return new Set<string>();
    }

    const favorites: { recipeId: string }[] = await prisma.favorite.findMany({
      where: { userId: user.id },
      select: {
        recipeId: true,
      },
    });

    return new Set(
      favorites.map((fav: { recipeId: string }): string => fav.recipeId),
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des IDs de favoris:", error);
    return new Set<string>();
  }
}
