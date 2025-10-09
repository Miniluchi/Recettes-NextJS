"use client";

import { uploadImageToR2 } from "@/app/recipes/new/utils";
import { createRecipe } from "@/app/recipes/utils";
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
import { Difficulty } from "@prisma/client";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function NewRecipePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prepTime: "",
    difficulty: "" as Difficulty | "",
    servings: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validation du type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Type de fichier non valide. Utilisez JPG, PNG ou WEBP.");
        return;
      }

      // Validation de la taille (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("Le fichier est trop volumineux (max 5MB)");
        return;
      }

      setImageFile(file);

      // Créer une preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (!formData.title || !formData.difficulty) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!imageFile) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    setIsUploading(true);

    try {
      // Upload de l'image vers R2
      const formDataImage = new FormData();
      formDataImage.append("image", imageFile);

      const imageUrl = await uploadImageToR2(formDataImage);

      // Création de la recette avec l'URL de l'image
      await createRecipe({
        title: formData.title,
        description: formData.description || undefined,
        image: imageUrl,
        prepTime: parseInt(formData.prepTime) || 0,
        difficulty: formData.difficulty as Difficulty,
        servings: parseInt(formData.servings) || 1,
      });

      toast.success("Recette créée avec succès !");
      router.push("/recipes");
    } catch (error) {
      console.error("Erreur lors de la création de la recette:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la création de la recette",
      );
    } finally {
      setIsUploading(false);
    }
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

            {/* Upload d'image */}
            <div className="space-y-2">
              <Label htmlFor="image">
                Image <span className="text-red-500">*</span>
              </Label>

              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <input
                    id="image"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-blue-600 hover:text-blue-700">
                        Cliquez pour uploader
                      </span>{" "}
                      ou glissez-déposez
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP (max. 5MB)
                    </p>
                  </label>
                </div>
              ) : (
                <div className="relative border rounded-lg overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src={imagePreview}
                      alt="Aperçu"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
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
                disabled={isUploading}
              >
                Annuler
              </Button>
              <Button type="submit" className="flex-1" disabled={isUploading}>
                {isUploading ? "Upload en cours..." : "Créer la recette"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
