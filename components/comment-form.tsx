"use client";

import { createComment } from "@/app/recipes/utils";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { getUserInitials } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type CommentFormProps = {
  recipeId: string;
  userId: string;
  userName?: string | null;
  userEmail: string;
  userAvatar?: string | null;
};

export function CommentForm({
  recipeId,
  userId,
  userName,
  userEmail,
  userAvatar,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Veuillez écrire un commentaire");
      return;
    }

    setIsLoading(true);
    try {
      await createComment({
        content: content.trim(),
        rating,
        userId,
        recipeId,
      });
      toast.success("Commentaire ajouté avec succès");
      setContent("");
      setRating(5);
    } catch (error) {
      toast.error("Erreur lors de l'ajout du commentaire");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Laisser un commentaire</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3">
          {/* Avatar de l'utilisateur connecté */}
          <Avatar className="h-10 w-10 mt-1">
            <AvatarImage
              src={userAvatar || undefined}
              alt={userName || userEmail}
            />
            <AvatarFallback>
              {getUserInitials(userName, userEmail)}
            </AvatarFallback>
          </Avatar>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4 flex-1">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Votre note
              </label>
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                interactive={true}
                size="lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Votre commentaire
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Partagez votre avis sur cette recette..."
                className="min-h-[100px]"
                disabled={isLoading}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Spinner className="mr-2" />}
              {isLoading ? "Envoi en cours..." : "Publier le commentaire"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
