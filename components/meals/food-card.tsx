"use client";

import { Trash2, TriangleAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { FoodItem } from "@/types/nutrition";

interface FoodCardProps {
  food: FoodItem;
  onChange: (food: FoodItem) => void;
  onRemove: () => void;
}

const LOW_CONFIDENCE_THRESHOLD = 0.6;

export function FoodCard({ food, onChange, onRemove }: FoodCardProps) {
  const lowConfidence = food.confidence < LOW_CONFIDENCE_THRESHOLD;

  function updateField(field: keyof FoodItem, value: string) {
    const numericFields: Array<keyof FoodItem> = ["grams", "calories", "protein", "carbs", "fat"];
    if (numericFields.includes(field)) {
      onChange({ ...food, [field]: value === "" ? 0 : Number(value) });
    } else {
      onChange({ ...food, [field]: value });
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground">Alimento</Label>
            <Input
              value={food.name}
              placeholder="Nombre del alimento"
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="mt-4 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
            aria-label="Eliminar alimento"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        {lowConfidence && (
          <div className="flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1.5 text-xs text-amber-600 dark:text-amber-400">
            <TriangleAlert className="size-3.5 shrink-0" />
            No estoy seguro de este alimento ni de la porción. Revisá los valores.
          </div>
        )}

        <div>
          <Label className="text-xs text-muted-foreground">Cantidad (g)</Label>
          <Input
            type="number"
            inputMode="decimal"
            value={food.grams}
            onChange={(e) => updateField("grams", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-muted-foreground">Calorías</Label>
            <Input
              type="number"
              inputMode="decimal"
              value={food.calories}
              onChange={(e) => updateField("calories", e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Proteínas (g)</Label>
            <Input
              type="number"
              inputMode="decimal"
              value={food.protein}
              onChange={(e) => updateField("protein", e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Carbohidratos (g)</Label>
            <Input
              type="number"
              inputMode="decimal"
              value={food.carbs}
              onChange={(e) => updateField("carbs", e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Grasas (g)</Label>
            <Input
              type="number"
              inputMode="decimal"
              value={food.fat}
              onChange={(e) => updateField("fat", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
