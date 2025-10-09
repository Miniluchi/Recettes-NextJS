"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { R2_BUCKET_NAME, R2_PUBLIC_URL, r2Client } from "@/lib/r2";
import crypto from "crypto";

// Upload une image vers Cloudflare R2 et retourne l'URL publique
export async function uploadImageToR2(formData: FormData): Promise<string> {
  try {
    const file = formData.get("image") as File;

    if (!file) {
      throw new Error("Aucun fichier fourni");
    }

    // Validation du type de fichier
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      throw new Error("Type de fichier non valide. Utilisez JPG, PNG ou WEBP.");
    }

    // Validation de la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("Le fichier est trop volumineux (max 5MB)");
    }

    // Générer un nom unique pour le fichier
    const fileExtension = file.name.split(".").pop();
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const fileName = `recipes/${uniqueId}.${fileExtension}`;

    // Convertir le fichier en buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload vers R2
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    await r2Client.send(command);

    // Retourner l'URL publique
    const publicUrl = `${R2_PUBLIC_URL}/${fileName}`;
    return publicUrl;
  } catch (error) {
    console.error("Erreur lors de l'upload vers R2:", error);
    throw new Error(
      error instanceof Error ? error.message : "Erreur lors de l'upload",
    );
  }
}
