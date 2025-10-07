import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChefHat } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <ChefHat className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl">Recette introuvable</CardTitle>
            <CardDescription>
              Désolé, cette recette n&apos;existe pas ou a été supprimée.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild>
              <Link href="/recipes">Retour aux recettes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
