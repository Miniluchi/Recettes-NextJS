import { NextResponse } from "next/server";
import { getAllRecipes, addNewRecipe } from "./utils";
import { Recipe, RecipeDto } from "@/app/types";

export async function GET() {
  const recipes = getAllRecipes();
  return NextResponse.json(
    {
      status: 200,
      recipes: recipes,
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  const data: RecipeDto = await request.json();
  addNewRecipe(data);

  return NextResponse.json(
    {
      status: 201,
      message: "Recette ajoutée avec succès",
      timestamp: new Date().toISOString(),
    },
    { status: 201 },
  );
}
