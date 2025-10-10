"use server";

import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2Client, R2_BUCKET_NAME, R2_PUBLIC_URL } from "@/lib/r2";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/app/utils";

export async function uploadAvatar(formData: FormData) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, error: "Non authentifié" };
    }

    const file = formData.get("avatar") as File;
    if (!file) {
      return { success: false, error: "Aucun fichier fourni" };
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "Le fichier doit être une image" };
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "L'image ne doit pas dépasser 5 MB" };
    }

    // Récupérer l'ancien avatar pour le supprimer
    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { avatar: true },
    });

    // Générer un nom de fichier unique
    const fileExtension = file.name.split(".").pop();
    const fileName = `${currentUser.id}-${Date.now()}.${fileExtension}`;
    const key = `avatars/${fileName}`;

    // Convertir le fichier en Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Uploader sur R2
    await r2Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }),
    );

    const avatarUrl = `${R2_PUBLIC_URL}/${key}`;

    // Mettre à jour l'avatar dans la base de données
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { avatar: avatarUrl },
    });

    // Supprimer l'ancien avatar de R2 s'il existe
    if (user?.avatar) {
      try {
        const oldKey = user.avatar.replace(`${R2_PUBLIC_URL}/`, "");
        await r2Client.send(
          new DeleteObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: oldKey,
          }),
        );
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'ancien avatar:",
          error,
        );
      }
    }

    revalidatePath("/profile");
    return { success: true, avatarUrl };
  } catch (error) {
    console.error("Erreur lors de l'upload de l'avatar:", error);
    return { success: false, error: "Erreur lors de l'upload de l'avatar" };
  }
}

export async function deleteAvatar() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, error: "Non authentifié" };
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { avatar: true },
    });

    if (!user?.avatar) {
      return { success: false, error: "Aucun avatar à supprimer" };
    }

    // Supprimer de R2
    try {
      const key = user.avatar.replace(`${R2_PUBLIC_URL}/`, "");
      await r2Client.send(
        new DeleteObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: key,
        }),
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avatar sur R2:", error);
    }

    // Mettre à jour la base de données
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { avatar: null },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'avatar:", error);
    return {
      success: false,
      error: "Erreur lors de la suppression de l'avatar",
    };
  }
}
