import { NextRequest, NextResponse } from "next/server";
import { getRecipeById, deleteRecipeById } from "../utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const recipeId = parseInt(id, 10);

  if (isNaN(recipeId)) {
    return NextResponse.json(
      {
        status: 400,
        message: "Invalid ID",
        timestamp: new Date().toISOString(),
      },
      { status: 400 },
    );
  }

  const recipe = getRecipeById(recipeId);
  if (!recipe) {
    return NextResponse.json(
      {
        status: 404,
        message: "Recipe not found",
        timestamp: new Date().toISOString(),
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    status: 200,
    recipe: recipe,
    timestamp: new Date().toISOString(),
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const recipeId = parseInt(id, 10);

  if (isNaN(recipeId)) {
    return NextResponse.json(
      {
        status: 400,
        message: "Invalid ID",
        timestamp: new Date().toISOString(),
      },
      { status: 400 },
    );
  }

  const recipe = getRecipeById(recipeId);
  if (!recipe) {
    return NextResponse.json(
      {
        status: 404,
        message: "Recipe not found",
        timestamp: new Date().toISOString(),
      },
      { status: 404 },
    );
  }

  deleteRecipeById(recipeId);
  return NextResponse.json({
    status: 200,
    message: "Recipe deleted successfully",
    timestamp: new Date().toISOString(),
  });
}
