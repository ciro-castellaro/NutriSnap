import type { Meal as PrismaMeal, FoodItem as PrismaFoodItem } from "@/lib/generated/prisma/client";
import type { Meal, FoodItem } from "@/types/nutrition";

type MealWithFoods = PrismaMeal & { foods: PrismaFoodItem[] };

function toFoodItemDTO(food: PrismaFoodItem): FoodItem {
  return {
    id: food.id,
    name: food.name,
    grams: food.grams,
    calories: food.calories,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
    confidence: food.confidence,
  };
}

export function toMealDTO(meal: MealWithFoods): Meal {
  return {
    id: meal.id,
    imageUrl: meal.imageUrl ?? undefined,
    mealType: meal.mealType,
    consumedAt: meal.consumedAt.toISOString(),
    foods: meal.foods.map(toFoodItemDTO),
    totalCalories: meal.totalCalories,
    totalProtein: meal.totalProtein,
    totalCarbs: meal.totalCarbs,
    totalFat: meal.totalFat,
  };
}
