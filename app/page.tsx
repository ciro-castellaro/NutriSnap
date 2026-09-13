import { TodaySummary } from "@/components/dashboard/today-summary";
import { MealsTodayList } from "@/components/dashboard/meals-today-list";
import { RegisterMealButton } from "@/components/dashboard/register-meal-button";
import { mockGoal, mockMealsToday } from "@/lib/nutrition/mock-data";
import { sumFoodTotals } from "@/lib/nutrition/calculations";

export default function DashboardPage() {
  const allFoodsToday = mockMealsToday.flatMap((meal) => meal.foods);
  const consumed = sumFoodTotals(allFoodsToday);

  return (
    <main className="flex flex-1 flex-col gap-6 px-4 pt-6">
      <TodaySummary goal={mockGoal} consumed={consumed} />
      <MealsTodayList meals={mockMealsToday} />
      <RegisterMealButton />
    </main>
  );
}
