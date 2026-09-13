import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { mockMealHistory } from "@/lib/nutrition/mock-data";
import { MEAL_TYPE_LABELS } from "@/types/nutrition";

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meal = mockMealHistory.find((m) => m.id === id);

  if (!meal) notFound();

  return (
    <main className="flex flex-1 flex-col gap-4 px-4 pt-6">
      <div>
        <h1 className="text-xl font-semibold">{MEAL_TYPE_LABELS[meal.mealType]}</h1>
        <p className="text-sm text-muted-foreground">
          {new Date(meal.consumedAt).toLocaleString("es-AR", {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {meal.foods.map((food) => (
          <Card key={food.id}>
            <CardContent>
              <p className="font-medium">{food.name}</p>
              <p className="text-sm text-muted-foreground">
                {food.grams} g · {Math.round(food.calories)} kcal
              </p>
              <p className="text-sm text-muted-foreground">
                P {food.protein} g · C {food.carbs} g · G {food.fat} g
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-medium">Total</span>
            <span className="text-lg font-semibold tabular-nums">
              {Math.round(meal.totalCalories)} kcal
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            P {Math.round(meal.totalProtein)} g · C {Math.round(meal.totalCarbs)} g · G{" "}
            {Math.round(meal.totalFat)} g
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
