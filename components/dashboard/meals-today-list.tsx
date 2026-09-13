import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MEAL_TYPE_LABELS, type Meal } from "@/types/nutrition";

const MEAL_EMOJI: Record<Meal["mealType"], string> = {
  breakfast: "🍳",
  lunch: "🍗",
  snack: "🍎",
  dinner: "🍝",
};

interface MealsTodayListProps {
  meals: Meal[];
}

export function MealsTodayList({ meals }: MealsTodayListProps) {
  if (meals.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Todavía no registraste comidas hoy.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {meals.map((meal) => (
        <Link key={meal.id} href={`/meals/${meal.id}`}>
          <Card className="transition-colors active:bg-accent">
            <CardContent className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{MEAL_EMOJI[meal.mealType]}</span>
                <div>
                  <p className="font-medium">{MEAL_TYPE_LABELS[meal.mealType]}</p>
                  <p className="text-xs text-muted-foreground">
                    {meal.foods.length} alimento{meal.foods.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <span className="font-semibold tabular-nums">
                {Math.round(meal.totalCalories)} kcal
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
