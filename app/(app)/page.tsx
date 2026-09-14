import { TodaySummary } from "@/components/dashboard/today-summary";
import { MealsTodayList } from "@/components/dashboard/meals-today-list";
import { RegisterMealButton } from "@/components/dashboard/register-meal-button";
import { requireUserId } from "@/lib/auth/actions";
import { getTodayMeals } from "@/lib/db/meals";
import { getOrCreateGoal } from "@/lib/db/nutrition-goals";
import { sumFoodTotals } from "@/lib/nutrition/calculations";
import { toMealDTO } from "@/lib/nutrition/mappers";

export default async function DashboardPage() {
  const userId = await requireUserId();
  const [mealRows, goal] = await Promise.all([getTodayMeals(userId), getOrCreateGoal(userId)]);

  const meals = mealRows.map(toMealDTO);
  const consumed = sumFoodTotals(meals.flatMap((meal) => meal.foods));

  return (
    <main className="flex flex-1 flex-col gap-6 px-4 pt-6">
      <TodaySummary goal={goal} consumed={consumed} />
      <MealsTodayList meals={meals} />
      <RegisterMealButton />
    </main>
  );
}
