"use client";

import { FoodCard } from "@/components/meals/food-card";
import { AddFoodDialog } from "@/components/meals/add-food-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sumFoodTotals } from "@/lib/nutrition/calculations";
import { MEAL_TYPE_LABELS, type FoodItem, type MealType } from "@/types/nutrition";
import { cn } from "@/lib/utils";

const MEAL_TYPES: MealType[] = ["breakfast", "lunch", "snack", "dinner"];

interface ReviewStepProps {
  foods: FoodItem[];
  mealType: MealType;
  onFoodsChange: (foods: FoodItem[]) => void;
  onMealTypeChange: (mealType: MealType) => void;
  onSave: () => void;
  saving: boolean;
}

export function ReviewStep({
  foods,
  mealType,
  onFoodsChange,
  onMealTypeChange,
  onSave,
  saving,
}: ReviewStepProps) {
  const totals = sumFoodTotals(foods);

  function updateFood(updated: FoodItem) {
    onFoodsChange(foods.map((f) => (f.id === updated.id ? updated : f)));
  }

  function removeFood(id: string) {
    onFoodsChange(foods.filter((f) => f.id !== id));
  }

  function addFood(food: FoodItem) {
    onFoodsChange([...foods, food]);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-6 pt-4">
      <div>
        <h1 className="text-xl font-semibold">Revisá tu comida</h1>
        <p className="text-sm text-muted-foreground">
          Los valores son estimaciones y pueden variar según los ingredientes, cantidades
          y preparación.
        </p>
      </div>

      <div className="flex gap-2">
        {MEAL_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onMealTypeChange(type)}
            className={cn(
              "flex-1 rounded-lg border px-2 py-2 text-xs font-medium transition-colors",
              mealType === type
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground"
            )}
          >
            {MEAL_TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} onChange={updateFood} onRemove={() => removeFood(food.id)} />
        ))}
      </div>

      <AddFoodDialog onAdd={addFood} />

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
        onClick={onSave}
        disabled={foods.length === 0 || saving}
      >
        {saving ? "Guardando..." : "Guardar comida"}
      </Button>
    </div>
  );
}
