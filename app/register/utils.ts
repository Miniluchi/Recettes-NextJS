"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function register(name: string, email: string, password: string) {
  try {
    // Validation
    if (!name || !email || !password) {
      console.error("Tous les champs sont requis");
      return { success: false, error: "Tous les champs sont requis" };
    }

    if (password.length < 6) {
      console.error("Le mot de passe doit contenir au moins 6 caractères");
      return {
        success: false,
        error: "Le mot de passe doit contenir au moins 6 caractères",
      };
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error("Cet email est déjà utilisé");
      return { success: false, error: "Cet email est déjà utilisé" };
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("Inscription réussie:", { id: user.id, email: user.email });
    return { success: true, data: { id: user.id, email: user.email } };
  } catch (error) {
    console.error("Erreur lors de l'inscription:" + error);
    return { success: false, error: "Erreur lors de l'inscription" };
  }
}
