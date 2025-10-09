"use client";

import { addToFavorites, removeFromFavorites } from "@/app/favorites/utils";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface FavoriteButtonProps {
  recipeId: string;
  isFavorite: boolean;
}

export default function FavoriteButton({
  recipeId,
  isFavorite: initialIsFavorite,
}: FavoriteButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.error("Vous devez être connecté pour ajouter des favoris");
      router.push("/login");
      return;
    }

    startTransition(async () => {
      try {
        if (isFavorite) {
          await removeFromFavorites(recipeId);
          setIsFavorite(false);
          toast.success("Recette retirée des favoris");
        } else {
          await addToFavorites(recipeId);
          setIsFavorite(true);
          toast.success("Recette ajoutée aux favoris");
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
        toast.error("Une erreur est survenue");
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleFavorite}
      disabled={isPending}
      className="rounded-full"
    >
      <Heart
        className={`h-5 w-5 ${
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
        }`}
      />
    </Button>
  );
}
