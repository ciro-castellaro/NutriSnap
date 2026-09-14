"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateGoalAction } from "@/lib/nutrition/actions";
import type { NutritionGoal } from "@/types/nutrition";

export function GoalsForm({ goal }: { goal: NutritionGoal }) {
  const [state, formAction, pending] = useActionState(updateGoalAction, {});
  const submittedOnce = useRef(false);

  useEffect(() => {
    if (!submittedOnce.current) {
      submittedOnce.current = true;
      return;
    }
    if (state.error) {
      toast.error(state.error);
    } else {
      toast.success("Objetivos guardados");
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label className="text-xs text-muted-foreground">Calorías (kcal)</Label>
            <Input type="number" inputMode="decimal" name="calories" defaultValue={goal.calories} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">🥩 Proteínas (g)</Label>
            <Input type="number" inputMode="decimal" name="protein" defaultValue={goal.protein} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">🍚 Carbohidratos (g)</Label>
            <Input type="number" inputMode="decimal" name="carbs" defaultValue={goal.carbs} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">🥑 Grasas (g)</Label>
            <Input type="number" inputMode="decimal" name="fat" defaultValue={goal.fat} />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="h-14 text-base" disabled={pending}>
        {pending ? "Guardando..." : "Guardar objetivos"}
      </Button>
    </form>
  );
}
