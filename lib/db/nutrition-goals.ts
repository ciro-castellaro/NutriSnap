import { prisma } from "@/lib/db/prisma";
import { DEFAULT_NUTRITION_GOAL } from "@/types/nutrition";

export async function getOrCreateGoal(userId: string) {
  const existing = await prisma.nutritionGoal.findUnique({ where: { userId } });
  if (existing) return existing;

  return prisma.nutritionGoal.create({
    data: { userId, ...DEFAULT_NUTRITION_GOAL },
  });
}

export interface UpdateGoalInput {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export async function updateGoal(userId: string, input: UpdateGoalInput) {
  return prisma.nutritionGoal.upsert({
    where: { userId },
    create: { userId, ...input },
    update: input,
  });
}
