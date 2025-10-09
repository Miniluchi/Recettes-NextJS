import { Heart } from "lucide-react";

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0 fill-red-600 dark:fill-red-400" />
            <div className="text-sm text-red-900 dark:text-red-100">
              <p className="font-medium mb-1">Vos recettes favorites</p>
              <p className="text-red-700 dark:text-red-300">
                Retrouvez ici toutes les recettes que vous avez ajoutées à vos
                favoris.
              </p>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
