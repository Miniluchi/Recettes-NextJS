import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Génère les initiales d'un utilisateur à partir de son nom ou email
 * @param name - Le nom de l'utilisateur (optionnel)
 * @param email - L'email de l'utilisateur
 * @returns Les initiales (2 caractères maximum)
 */
export function getUserInitials(
  name: string | null | undefined,
  email: string,
): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return email[0].toUpperCase();
}
