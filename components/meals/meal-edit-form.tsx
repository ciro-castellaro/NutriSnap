"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FoodCard } from "@/components/meals/food-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sumFoodTotals } from "@/lib/nutrition/calculations";
import { updateMealAction } from "@/lib/nutrition/actions";
import type { FoodItem } from "@/types/nutrition";

interface MealEditFormProps {
  mealId: string;
  initialFoods: FoodItem[];
}

export function MealEditForm({ mealId, initialFoods }: MealEditFormProps) {
  const router = useRouter();
  const [foods, setFoods] = useState(initialFoods);
  const [saving, setSaving] = useState(false);
  const totals = sumFoodTotals(foods);

  function updateFood(updated: FoodItem) {
    setFoods((prev) => prev.map((food) => (food.id === updated.id ? updated : food)));
  }

  function removeFood(id: string) {
    setFoods((prev) => prev.filter((food) => food.id !== id));
  }

  async function handleSave() {
    setSaving(true);
    const result = await updateMealAction({
      mealId,
      foods: foods.map(({ name, grams, calories, protein, carbs, fat, confidence }) => ({
        name,
        grams,
        calories,
        protein,
        carbs,
        fat,
        confidence,
      })),
    });

    if (result.error) {
      toast.error(result.error);
      setSaving(false);
      return;
    }

    toast.success("Comida actualizada");
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onChange={updateFood}
            onRemove={() => removeFood(food.id)}
          />
        ))}
      </div>

      <Card>
        <CardContent className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-medium">Total</span>
            <span className="text-lg font-semibold tabular-nums">
              {Math.round(totals.calories)} kcal
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            P {Math.round(totals.protein)} g · C {Math.round(totals.carbs)} g · G{" "}
            {Math.round(totals.fat)} g
          </p>
        </CardContent>
      </Card>

      <Button
        size="lg"
        className="h-14 text-base"
        onClick={handleSave}
        disabled={foods.length === 0 || saving}
      >
        {saving ? "Guardando..." : "Guardar cambios"}
      </Button>
    </div>
  );
}
