"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth/actions";
import { createMeal, updateMeal } from "@/lib/db/meals";
import { updateGoal } from "@/lib/db/nutrition-goals";

const foodInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  grams: z.number().nonnegative(),
  calories: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
  fat: z.number().nonnegative(),
  confidence: z.number().min(0).max(1),
});

const saveMealSchema = z.object({
  mealType: z.enum(["breakfast", "lunch", "snack", "dinner"]),
  foods: z.array(foodInputSchema).min(1),
});

export interface SaveMealResult {
  error?: string;
}

export async function saveMealAction(input: unknown): Promise<SaveMealResult> {
  const parsed = saveMealSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "No pudimos guardar la comida: revisá los alimentos cargados." };
  }

  const userId = await requireUserId();
  await createMeal(userId, parsed.data);

  revalidatePath("/");
  revalidatePath("/meals");
  return {};
}

const updateMealSchema = z.object({
  mealId: z.string().trim().min(1),
  foods: z.array(foodInputSchema).min(1),
});

export async function updateMealAction(input: unknown): Promise<SaveMealResult> {
  const parsed = updateMealSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "No pudimos guardar los cambios: revisá los alimentos cargados." };
  }

  const userId = await requireUserId();
  const updated = await updateMeal(userId, parsed.data.mealId, parsed.data.foods);
  if (!updated) {
    return { error: "No encontramos esa comida." };
  }

  revalidatePath("/");
  revalidatePath("/meals");
  revalidatePath(`/meals/${parsed.data.mealId}`);
  return {};
}

const goalSchema = z.object({
  calories: z.number().int().positive(),
  protein: z.number().int().nonnegative(),
  carbs: z.number().int().nonnegative(),
  fat: z.number().int().nonnegative(),
});

export interface UpdateGoalResult {
  error?: string;
}

export async function updateGoalAction(
  _prevState: UpdateGoalResult,
  formData: FormData
): Promise<UpdateGoalResult> {
  const parsed = goalSchema.safeParse({
    calories: Number(formData.get("calories")),
    protein: Number(formData.get("protein")),
    carbs: Number(formData.get("carbs")),
    fat: Number(formData.get("fat")),
  });

  if (!parsed.success) {
    return { error: "Revisá los valores: tienen que ser números válidos." };
  }

  const userId = await requireUserId();
  await updateGoal(userId, parsed.data);

  revalidatePath("/");
  revalidatePath("/settings");
  return {};
}
