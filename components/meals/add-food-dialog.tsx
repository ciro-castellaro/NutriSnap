"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateId } from "@/lib/nutrition/calculations";
import type { FoodItem } from "@/types/nutrition";

interface AddFoodDialogProps {
  onAdd: (food: FoodItem) => void;
}

const EMPTY_FORM = { name: "", grams: "", calories: "", protein: "", carbs: "", fat: "" };

export function AddFoodDialog({ onAdd }: AddFoodDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim()) return;

    onAdd({
      id: generateId(),
      name: form.name.trim(),
      grams: Number(form.grams) || 0,
      calories: Number(form.calories) || 0,
      protein: Number(form.protein) || 0,
      carbs: Number(form.carbs) || 0,
      fat: Number(form.fat) || 0,
      confidence: 1,
    });
    setForm(EMPTY_FORM);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" className="w-full">
            <Plus className="size-4" />
            Agregar alimento
          </Button>
        }
      />
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Agregar alimento</DialogTitle>
          </DialogHeader>

          <div>
            <Label className="text-xs text-muted-foreground">Nombre</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ej: Manzana"
              autoFocus
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Cantidad (g)</Label>
            <Input
              type="number"
              inputMode="decimal"
              value={form.grams}
              onChange={(e) => setForm({ ...form, grams: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Calorías</Label>
              <Input
                type="number"
                inputMode="decimal"
                value={form.calories}
                onChange={(e) => setForm({ ...form, calories: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Proteínas (g)</Label>
              <Input
                type="number"
                inputMode="decimal"
                value={form.protein}
                onChange={(e) => setForm({ ...form, protein: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Carbohidratos (g)</Label>
              <Input
                type="number"
                inputMode="decimal"
                value={form.carbs}
                onChange={(e) => setForm({ ...form, carbs: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Grasas (g)</Label>
              <Input
                type="number"
                inputMode="decimal"
                value={form.fat}
                onChange={(e) => setForm({ ...form, fat: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Agregar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
