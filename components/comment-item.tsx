"use client";

import {
  CommentWithUser,
  deleteComment,
  updateComment,
} from "@/app/recipes/utils";
import { StarRating } from "@/components/star-rating";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CommentItemProps = {
  comment: CommentWithUser;
  currentUserId?: string;
};

export function CommentItem({ comment, currentUserId }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [editedRating, setEditedRating] = useState(comment.rating);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isOwner = currentUserId === comment.userId;

  const handleSave = async () => {
    if (!editedContent.trim()) {
      toast.error("Le commentaire ne peut pas être vide");
      return;
    }

    setIsLoading(true);
    try {
      await updateComment(comment.id, {
        content: editedContent,
        rating: editedRating,
      });
      toast.success("Commentaire mis à jour");
      setIsEditing(false);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du commentaire");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(comment.content);
    setEditedRating(comment.rating);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteComment(comment.id, comment.recipeId);
      toast.success("Commentaire supprimé");
    } catch (error) {
      toast.error("Erreur lors de la suppression du commentaire");
      console.error(error);
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="border rounded-lg p-4 bg-card">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* En-tête avec nom et date */}
            <div className="flex items-center gap-2 mb-2">
              <p className="font-semibold text-sm">
                {comment.user.name || comment.user.email}
              </p>
              <span className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {comment.updatedAt.getTime() !== comment.createdAt.getTime() && (
                <span className="text-xs text-muted-foreground italic">
                  (modifié)
                </span>
              )}
            </div>

            {/* Note */}
            <div className="mb-3">
              {isEditing ? (
                <StarRating
                  rating={editedRating}
                  onRatingChange={setEditedRating}
                  interactive={true}
                />
              ) : (
                <StarRating rating={comment.rating} interactive={false} />
              )}
            </div>

            {/* Contenu */}
            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[80px]"
                  disabled={isLoading}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <Spinner className="h-4 w-4 mr-1" />
                    ) : (
                      <Save className="h-4 w-4 mr-1" />
                    )}
                    Enregistrer
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Annuler
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
            )}
          </div>

          {/* Boutons d'action (uniquement si propriétaire) */}
          {isOwner && !isEditing && (
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le commentaire ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le commentaire sera définitivement
              supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading && <Spinner className="h-4 w-4 mr-2" />}
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
