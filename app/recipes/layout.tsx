import { InfoIcon } from "lucide-react";

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-blue-50 dark:bg-blue-950 border-b border-blue-200 dark:border-blue-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-start gap-3">
            <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-medium mb-1">
                Bienvenue dans notre collection de recettes
              </p>
              <p className="text-blue-700 dark:text-blue-300">
                Utilisez les filtres ci-dessous pour trouver la recette parfaite
                selon vos critères.
              </p>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
