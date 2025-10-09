"use client";

import { CommentWithUser } from "@/app/recipes/utils";
import { CommentItem } from "@/components/comment-item";
import { StarRating } from "@/components/star-rating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CommentListProps = {
  comments: CommentWithUser[];
  currentUserId?: string;
  averageRating?: number;
};

export function CommentList({
  comments,
  currentUserId,
  averageRating,
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Commentaires</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Aucun commentaire pour le moment. Soyez le premier à donner votre
            avis !
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Commentaires ({comments.length})</CardTitle>
          {averageRating !== undefined && averageRating > 0 && (
            <div className="flex items-center gap-2">
              <StarRating
                rating={Math.round(averageRating)}
                interactive={false}
              />
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} / 5
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserId={currentUserId}
          />
        ))}
      </CardContent>
    </Card>
  );
}
