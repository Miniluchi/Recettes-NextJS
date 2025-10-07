export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string; // URL ou chemin vers l'image
  prepTime: number; // en minutes
  difficulty: "facile" | "moyen" | "difficile";
  servings: number;
}

export interface RecipeDto {
  title: string;
  description: string;
  image: string; // URL ou chemin vers l'image
  prepTime: number; // en minutes
  difficulty: "facile" | "moyen" | "difficile";
  servings: number;
}
