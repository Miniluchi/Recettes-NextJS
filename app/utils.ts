"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export type UserSession = Pick<User, "id" | "email">;

/**
 * Récupère l'utilisateur connecté depuis la session
 * Retourne null si l'utilisateur n'est pas authentifié
 */
export async function getCurrentUser(): Promise<UserSession | null> {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
    },
  });

  return user;
}

/**
 * Vérifie si l'utilisateur est authentifié
 * Utile pour les vérifications rapides sans récupérer l'utilisateur complet
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession();
  return !!session?.user?.email;
}
