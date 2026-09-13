"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { mockGoal } from "@/lib/nutrition/mock-data";

export default function SettingsPage() {
  const [goal, setGoal] = useState(mockGoal);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Simula el guardado. Se reemplaza por la persistencia real contra la base de datos.
    toast.success("Objetivos guardados");
  }

  return (
    <main className="flex flex-1 flex-col gap-6 px-4 pt-6">
      <div>
        <h1 className="text-xl font-semibold">Objetivos diarios</h1>
        <p className="text-sm text-muted-foreground">
          Configurá tus metas de calorías y macronutrientes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Card>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Calorías (kcal)</Label>
              <Input
                type="number"
                inputMode="decimal"
                value={goal.calories}
                onChange={(e) => setGoal({ ...goal, calories: Number(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">🥩 Proteínas (g)</Label>
              <Input
                type="number"
                inputMode="decimal"
                value={goal.protein}
                onChange={(e) => setGoal({ ...goal, protein: Number(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">🍚 Carbohidratos (g)</Label>
              <Input
                type="number"
                inputMode="decimal"
                value={goal.carbs}
                onChange={(e) => setGoal({ ...goal, carbs: Number(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">🥑 Grasas (g)</Label>
              <Input
                type="number"
                inputMode="decimal"
                value={goal.fat}
                onChange={(e) => setGoal({ ...goal, fat: Number(e.target.value) || 0 })}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="h-14 text-base">
          Guardar objetivos
        </Button>
      </form>
    </main>
  );
}
