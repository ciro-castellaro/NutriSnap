import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MacroProgress } from "@/components/nutrition/macro-progress";
import { progressPercent } from "@/lib/nutrition/calculations";
import type { NutritionGoal } from "@/types/nutrition";
import type { NutritionTotals } from "@/lib/nutrition/calculations";

interface TodaySummaryProps {
  goal: NutritionGoal;
  consumed: NutritionTotals;
}

export function TodaySummary({ goal, consumed }: TodaySummaryProps) {
  const caloriesPercent = progressPercent(consumed.calories, goal.calories);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Hoy</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium">Calorías</span>
            <span className="text-2xl font-semibold tabular-nums">
              {Math.round(consumed.calories).toLocaleString("es-AR")}
              <span className="text-sm font-normal text-muted-foreground">
                {" "}
                / {goal.calories.toLocaleString("es-AR")} kcal
              </span>
            </span>
          </div>
          <Progress value={caloriesPercent} />
        </div>

        <div className="flex flex-col gap-4">
          <MacroProgress emoji="🥩" label="Proteínas" current={consumed.protein} target={goal.protein} />
          <MacroProgress emoji="🍚" label="Carbohidratos" current={consumed.carbs} target={goal.carbs} />
          <MacroProgress emoji="🥑" label="Grasas" current={consumed.fat} target={goal.fat} />
        </div>
      </CardContent>
    </Card>
  );
}
