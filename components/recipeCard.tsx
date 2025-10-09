import FavoriteButton from "@/components/favoriteButton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Recipe } from "@prisma/client";
import { ChefHat, Clock, Users } from "lucide-react";
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
    <Card className="group overflow-hidden transition-all hover:shadow-xl p-0 gap-0">
      <Link href={`/recipes/${recipe.id}`} className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors mb-2">
                {recipe.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {recipe.description}
              </p>
            </div>
            <FavoriteButton recipeId={recipe.id} isFavorite={isFavorite} />
          </div>

          {/* Footer with badges - anchored to bottom */}
          <div className="flex items-center gap-2 mt-auto">
            <Badge
              variant="outline"
              className="text-muted-foreground border-muted-foreground/30"
            >
              <Clock />
              {recipe.prepTime} min
            </Badge>
            <Badge
              variant="outline"
              className="text-muted-foreground border-muted-foreground/30"
            >
              <ChefHat />
              {recipe.difficulty}
            </Badge>
            <Badge
              variant="outline"
              className="text-muted-foreground border-muted-foreground/30"
            >
              <Users />
              {recipe.servings} pers.
            </Badge>
          </div>
        </div>
      </Link>
    </Card>
  );
}
