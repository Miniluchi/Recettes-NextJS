"use client";

import { createComment } from "@/app/recipes/utils";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

type CommentFormProps = {
  recipeId: string;
  userId: string;
};

export function CommentForm({ recipeId, userId }: CommentFormProps) {
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
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {isLoading ? "Envoi en cours..." : "Publier le commentaire"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
