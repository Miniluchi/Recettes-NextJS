// Lire le fichier JSON et le parser en objet JavaScript
import fs from "fs";
import path from "path";
import { Recipe, RecipeDto } from "@/app/types";

export function getAllRecipes(): Recipe[] {
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const recipes: Recipe[] = JSON.parse(jsonData);
  return recipes;
}

export function getRecipeById(id: number): Recipe | undefined {
  const recipes = getAllRecipes();
  return recipes.find((recipe) => recipe.id === id);
}

export function addNewRecipe(newRecipe: RecipeDto): void {
  const recipes = getAllRecipes();
  const finalRecipe: Recipe = {
    id: recipes.length > 0 ? recipes[recipes.length - 1].id + 1 : 1,
    ...newRecipe,
  };
  recipes.push(finalRecipe);
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), "utf-8");
}

export function deleteRecipeById(id: number): boolean {
  const recipes = getAllRecipes();
  const index = recipes.findIndex((recipe) => recipe.id === id);
  if (index === -1) {
    return false;
  }
  recipes.splice(index, 1);
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), "utf-8");
  return true;
}
