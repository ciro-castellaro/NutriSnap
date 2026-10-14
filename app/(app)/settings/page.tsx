import { requireUserId } from "@/lib/auth/actions";
import { getOrCreateGoal } from "@/lib/db/nutrition-goals";
import { GoalsForm } from "@/components/nutrition/goals-form";

export default async function SettingsPage() {
  const userId = await requireUserId();
  const goal = await getOrCreateGoal(userId);

  return (
    <main className="flex flex-1 flex-col gap-6 px-4 pt-6">
      <div>
        <h1 className="text-xl font-semibold">Objetivos diarios</h1>
        <p className="text-sm text-muted-foreground">
          Configurá tus metas de calorías y macronutrientes.
        </p>
      </div>

      <GoalsForm goal={goal} />
    </main>
  );
}
