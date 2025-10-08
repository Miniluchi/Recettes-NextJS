import { PrismaClient } from "@prisma/client";
import recipesData from "../data/recipes.json";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed...");

  // Supprime toutes les recettes existantes
  await prisma.recipe.deleteMany({});
  console.log("🗑️  Recettes existantes supprimées");

  // Insère les recettes depuis le fichier JSON
  for (const recipe of recipesData) {
    await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        image: recipe.image,
        prepTime: recipe.prepTime,
        difficulty: recipe.difficulty as "facile" | "moyen" | "difficile",
        servings: recipe.servings,
      },
    });
  }

  console.log(`✅ ${recipesData.length} recettes insérées avec succès`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
