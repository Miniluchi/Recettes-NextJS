"use client";

import { Recipe } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewRecipePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    prepTime: "",
    difficulty: "" as Recipe["difficulty"] | "",
    servings: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (!formData.title || !formData.description || !formData.difficulty) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newRecipe: Recipe = {
      id: Date.now(), // ID temporaire
      title: formData.title,
      description: formData.description,
      image: formData.image || "/pates-carbo.webp",
      prepTime: parseInt(formData.prepTime) || 0,
      difficulty: formData.difficulty as Recipe["difficulty"],
      servings: parseInt(formData.servings) || 1,
    };

    console.log("Nouvelle recette:", newRecipe);
    // TODO: Ajouter la logique pour sauvegarder la recette

    // Redirection vers la page des recettes
    router.push("/recipes");
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Nouvelle recette</CardTitle>
          <CardDescription>
            Ajoutez une nouvelle recette à votre collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Titre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Ex: Pâtes à la carbonara"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre recette..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image">URL de l&apos;image</Label>
              <Input
                id="image"
                type="url"
                placeholder="/mon-image.webp ou https://..."
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Laissez vide pour utiliser l&apos;image par défaut
              </p>
            </div>

            {/* Temps de préparation, Portions et Difficulté */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prepTime">Temps de préparation (min)</Label>
                <Input
                  id="prepTime"
                  type="number"
                  min="1"
                  placeholder="30"
                  value={formData.prepTime}
                  onChange={(e) => handleChange("prepTime", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="servings">Nombre de portions</Label>
                <Input
                  id="servings"
                  type="number"
                  min="1"
                  placeholder="4"
                  value={formData.servings}
                  onChange={(e) => handleChange("servings", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">
                  Difficulté <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => handleChange("difficulty", value)}
                  required
                >
                  <SelectTrigger id="difficulty" className="w-full">
                    <SelectValue placeholder="Sélectionnez une difficulté" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facile">Facile</SelectItem>
                    <SelectItem value="moyen">Moyen</SelectItem>
                    <SelectItem value="difficile">Difficile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button type="submit" className="flex-1">
                Créer la recette
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
