import { signIn } from "next-auth/react";

export async function login(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Erreur de connexion:", result.error);
      return { success: false, error: result.error };
    }

    if (result?.ok) {
      console.log("Connexion réussie:", result);
      return { success: true, data: result };
    }

    console.error("Erreur inattendue");
    return { success: false, error: "Erreur inattendue" };
  } catch (error) {
    console.error("Erreur réseau:", error);
    return { success: false, error: "Erreur réseau" };
  }
}
