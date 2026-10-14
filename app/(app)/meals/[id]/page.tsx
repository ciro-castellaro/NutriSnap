import { notFound } from "next/navigation";
import { requireUserId } from "@/lib/auth/actions";
import { getMealById } from "@/lib/db/meals";
import { toMealDTO } from "@/lib/nutrition/mappers";
import { MealEditForm } from "@/components/meals/meal-edit-form";
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
    <main className="flex flex-1 flex-col gap-4 px-4 pb-6 pt-6">
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

      <MealEditForm mealId={meal.id} initialFoods={meal.foods} />
    </main>
  );
}
