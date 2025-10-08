import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { R2_PUBLIC_URL } from "../lib/r2";

const prisma = new PrismaClient();

async function updateImageUrls() {
  console.log("🚀 Mise à jour des URLs d'images...\n");

  try {
    // Récupérer toutes les recettes
    const recipes = await prisma.recipe.findMany();

    console.log(`📁 ${recipes.length} recettes trouvées\n`);

    for (const recipe of recipes) {
      let filename = "";

      // Si l'URL commence par "/", c'est une URL locale
      if (recipe.image.startsWith("/")) {
        filename = recipe.image.split("/").pop() || "";
      }
      // Si c'est une URL R2 privée (.r2.cloudflarestorage.com)
      else if (recipe.image.includes(".r2.cloudflarestorage.com")) {
        filename = recipe.image.split("/").pop() || "";
      }
      // Si c'est déjà une URL R2 publique (.r2.dev)
      else if (recipe.image.includes(".r2.dev")) {
        console.log(`⏭️  ${recipe.title}: déjà une URL publique`);
        continue;
      }
      // Autres URLs
      else {
        console.log(`⏭️  ${recipe.title}: URL non reconnue`);
        continue;
      }

      const newUrl = `${R2_PUBLIC_URL}/${filename}`;

      await prisma.recipe.update({
        where: { id: recipe.id },
        data: { image: newUrl },
      });

      console.log(`✅ ${recipe.title}: ${recipe.image} → ${newUrl}`);
    }

    console.log("\n🎉 Migration terminée avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de la migration:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

updateImageUrls();
