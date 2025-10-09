"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Recipe } from "@prisma/client";
import { Filter, X } from "lucide-react";
import { useMemo, useState } from "react";
import RecipeCard from "./recipeCard";
import { Button } from "./ui/button";

interface RecipeFiltersProps {
  recipes: Recipe[];
  favoriteIds: Set<string>;
}

export default function RecipeFilters({
  recipes,
  favoriteIds,
}: RecipeFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [maxPrepTime, setMaxPrepTime] = useState<number[]>([180]);
  const [minServings, setMinServings] = useState<number>(1);

  // Calculer les valeurs min/max pour les sliders
  const prepTimeRange = useMemo(() => {
    const times = recipes.map((r) => r.prepTime);
    return {
      min: Math.min(...times),
      max: Math.max(...times),
    };
  }, [recipes]);

  // Filtrer les recettes en temps réel
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Filtre de recherche (titre + description)
      const matchesSearch =
        searchQuery === "" ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtre de difficulté
      const matchesDifficulty =
        difficultyFilter === "all" || recipe.difficulty === difficultyFilter;

      // Filtre de temps de préparation
      const matchesPrepTime = recipe.prepTime <= maxPrepTime[0];

      // Filtre de portions
      const matchesServings = recipe.servings >= minServings;

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesPrepTime &&
        matchesServings
      );
    });
  }, [recipes, searchQuery, difficultyFilter, maxPrepTime, minServings]);

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("all");
    setMaxPrepTime([prepTimeRange.max]);
    setMinServings(1);
  };

  // Vérifier si des filtres sont actifs
  const hasActiveFilters =
    searchQuery !== "" ||
    difficultyFilter !== "all" ||
    maxPrepTime[0] !== prepTimeRange.max ||
    minServings > 1;

  return (
    <div className="space-y-6">
      {/* Barre de filtres */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Filtres</h2>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Réinitialiser
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Recherche */}
          <div className="space-y-2">
            <Label htmlFor="search">Rechercher</Label>
            <Input
              id="search"
              placeholder="Titre ou description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Difficulté */}
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulté</Label>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="facile">Facile</SelectItem>
                <SelectItem value="moyen">Moyen</SelectItem>
                <SelectItem value="difficile">Difficile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Temps de préparation */}
          <div className="space-y-2">
            <Label htmlFor="prepTime">
              Temps max : {maxPrepTime[0]} min
            </Label>
            <Slider
              id="prepTime"
              min={prepTimeRange.min}
              max={prepTimeRange.max}
              step={5}
              value={maxPrepTime}
              onValueChange={setMaxPrepTime}
              className="mt-2"
            />
          </div>

          {/* Nombre de portions */}
          <div className="space-y-2">
            <Label htmlFor="servings">Portions min : {minServings}</Label>
            <Slider
              id="servings"
              min={1}
              max={10}
              step={1}
              value={[minServings]}
              onValueChange={(value) => setMinServings(value[0])}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {filteredRecipes.length} recette{filteredRecipes.length > 1 ? "s" : ""}{" "}
          {hasActiveFilters && `sur ${recipes.length}`}
        </p>
      </div>

      {/* Grille de recettes */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Aucune recette ne correspond à vos critères
          </p>
          <Button variant="outline" onClick={resetFilters} className="mt-4">
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favoriteIds.has(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
