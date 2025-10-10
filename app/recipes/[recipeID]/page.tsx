import { isFavorite } from "@/app/favorites/utils";
import {
  getAverageRating,
  getCommentsByRecipeId,
  getRecipeById,
} from "@/app/recipes/utils";
import { getCurrentUser } from "@/app/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@prisma/client";
import { ChefHat, Clock, Users } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CommentForm } from "../../../components/comments/comment-form";
import { CommentList } from "../../../components/comments/comment-list";
import { DeleteRecipeButton } from "../../../components/recipes/delete-recipe-button";
import FavoriteButton from "../../../components/recipes/favoriteButton";

export default async function RecipeByIdPage({
  params,
}: {
  params: Promise<{ recipeID: string }>;
}) {
  const { recipeID } = await params;
  const recipe: Recipe | null = await getRecipeById(recipeID);
  if (!recipe) {
    notFound();
  }

  const currentUser = await getCurrentUser();
  const isFav = await isFavorite(recipeID);
  const comments = await getCommentsByRecipeId(recipeID);
  const averageRating = await getAverageRating(recipeID);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">{recipe.title}</CardTitle>
            <CardDescription className="text-base">
              {recipe.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="relative h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <Clock className="h-4 w-4" />
                  {recipe.prepTime} min
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <ChefHat className="h-4 w-4" />
                  {recipe.difficulty}
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <Users className="h-4 w-4" />
                  {recipe.servings} personnes
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <FavoriteButton recipeId={recipe.id} isFavorite={isFav} />
                <DeleteRecipeButton recipeId={recipe.id} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section des commentaires */}
        <div className="mt-8 space-y-6">
          {/* Liste des commentaires */}
          <CommentList
            comments={comments}
            currentUserId={currentUser?.id}
            averageRating={averageRating}
          />

          {/* Formulaire d'ajout de commentaire (uniquement si connecté) */}
          {currentUser && (
            <CommentForm
              recipeId={recipeID}
              userId={currentUser.id}
              userName={currentUser.name}
              userEmail={currentUser.email}
              userAvatar={currentUser.avatar}
            />
          )}
        </div>
      </div>
    </div>
  );
}
