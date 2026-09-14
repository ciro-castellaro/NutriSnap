import { prisma } from "@/lib/db/prisma";
import type { MealType } from "@/lib/generated/prisma/client";

export interface CreateMealFoodInput {
  name: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

export interface CreateMealInput {
  mealType: MealType;
  imageUrl?: string;
  foods: CreateMealFoodInput[];
}

function startOfDay(date: Date): Date {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
}

function endOfDay(date: Date): Date {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
}

export async function getTodayMeals(userId: string) {
  const now = new Date();
  return prisma.meal.findMany({
    where: {
      userId,
      consumedAt: { gte: startOfDay(now), lte: endOfDay(now) },
    },
    include: { foods: true },
    orderBy: { consumedAt: "asc" },
  });
}

export async function getMealHistory(userId: string) {
  return prisma.meal.findMany({
    where: { userId },
    include: { foods: true },
    orderBy: { consumedAt: "desc" },
  });
}

export async function getMealById(userId: string, id: string) {
  return prisma.meal.findFirst({
    where: { id, userId },
    include: { foods: true },
  });
}

export async function createMeal(userId: string, input: CreateMealInput) {
  const totals = input.foods.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fat: acc.fat + food.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return prisma.meal.create({
    data: {
      userId,
      mealType: input.mealType,
      imageUrl: input.imageUrl,
      totalCalories: totals.calories,
      totalProtein: totals.protein,
      totalCarbs: totals.carbs,
      totalFat: totals.fat,
      foods: { create: input.foods },
    },
    include: { foods: true },
  });
}
