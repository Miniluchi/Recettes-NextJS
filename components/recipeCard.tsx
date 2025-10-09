import FavoriteButton from "@/components/favoriteButton";
import { Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite?: boolean;
}

export default function RecipeCard({
  recipe,
  isFavorite = false,
}: RecipeCardProps) {
  return (
    <div className="relative rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/recipes/${recipe.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>⏱️ {recipe.prepTime} min</span>
            <span>👨‍🍳 {recipe.difficulty}</span>
            <span>🍽️ {recipe.servings} pers.</span>
          </div>
        </div>
      </Link>

      <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full">
        <FavoriteButton recipeId={recipe.id} isFavorite={isFavorite} />
      </div>
    </div>
  );
}
