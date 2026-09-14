import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { requireUserId } from "@/lib/auth/actions";
import { getMealHistory } from "@/lib/db/meals";
import { formatDayLabel } from "@/lib/nutrition/calculations";
import { toMealDTO } from "@/lib/nutrition/mappers";
import { MEAL_TYPE_LABELS, type Meal } from "@/types/nutrition";

const MEAL_EMOJI: Record<Meal["mealType"], string> = {
  breakfast: "🍳",
  lunch: "🍗",
  snack: "🍎",
  dinner: "🍝",
};

function groupByDay(meals: Meal[]): Array<[string, Meal[]]> {
  const groups = new Map<string, Meal[]>();
  for (const meal of meals) {
    const key = new Date(meal.consumedAt).toDateString();
    groups.set(key, [...(groups.get(key) ?? []), meal]);
  }
  return Array.from(groups.entries()).sort(
    ([a], [b]) => new Date(b).getTime() - new Date(a).getTime()
  );
}

export default async function MealsHistoryPage() {
  const userId = await requireUserId();
  const mealRows = await getMealHistory(userId);
  const groups = groupByDay(mealRows.map(toMealDTO));

  return (
    <main className="flex flex-1 flex-col gap-6 px-4 pt-6">
      <h1 className="text-xl font-semibold">Historial</h1>

      {groups.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Todavía no registraste ninguna comida.
        </p>
      )}

      {groups.map(([dayKey, meals]) => (
        <div key={dayKey} className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            {formatDayLabel(meals[0].consumedAt)}
          </h2>
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
        </div>
      ))}
    </main>
  );
}
