import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { requireUserId } from "@/lib/auth/actions";
import { getMealById } from "@/lib/db/meals";
import { toMealDTO } from "@/lib/nutrition/mappers";
import { MEAL_TYPE_LABELS } from "@/types/nutrition";

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await requireUserId();
  const mealRow = await getMealById(userId, id);

  if (!mealRow) notFound();

  const meal = toMealDTO(mealRow);

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
