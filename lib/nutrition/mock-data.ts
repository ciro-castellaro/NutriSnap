import type { FoodAnalysisResult, Meal, NutritionGoal } from "@/types/nutrition";

export const mockGoal: NutritionGoal = {
  calories: 2200,
  protein: 160,
  carbs: 220,
  fat: 70,
};

export const mockMealsToday: Meal[] = [
  {
    id: "meal-1",
    mealType: "breakfast",
    consumedAt: new Date().toISOString(),
    foods: [
      {
        id: "food-1",
        name: "Avena con banana",
        grams: 250,
        calories: 420,
        protein: 14,
        carbs: 70,
        fat: 9,
        confidence: 0.86,
      },
    ],
    totalCalories: 420,
    totalProtein: 14,
    totalCarbs: 70,
    totalFat: 9,
  },
  {
    id: "meal-2",
    mealType: "lunch",
    consumedAt: new Date().toISOString(),
    foods: [
      {
        id: "food-2",
        name: "Pechuga de pollo",
        grams: 180,
        calories: 297,
        protein: 56,
        carbs: 0,
        fat: 6,
        confidence: 0.88,
      },
      {
        id: "food-3",
        name: "Arroz blanco",
        grams: 200,
        calories: 260,
        protein: 5,
        carbs: 56,
        fat: 1,
        confidence: 0.81,
      },
      {
        id: "food-4",
        name: "Ensalada verde",
        grams: 100,
        calories: 93,
        protein: 2,
        carbs: 5,
        fat: 5,
        confidence: 0.75,
      },
    ],
    totalCalories: 650,
    totalProtein: 63,
    totalCarbs: 61,
    totalFat: 12,
  },
  {
    id: "meal-3",
    mealType: "snack",
    consumedAt: new Date().toISOString(),
    foods: [
      {
        id: "food-5",
        name: "Yogur con frutos secos",
        grams: 180,
        calories: 350,
        protein: 12,
        carbs: 30,
        fat: 18,
        confidence: 0.7,
      },
    ],
    totalCalories: 350,
    totalProtein: 12,
    totalCarbs: 30,
    totalFat: 18,
  },
];

export const mockMealHistory: Meal[] = [
  ...mockMealsToday,
  {
    id: "meal-4",
    mealType: "dinner",
    consumedAt: new Date(Date.now() - 86400000).toISOString(),
    foods: [
      {
        id: "food-6",
        name: "Salmón a la plancha",
        grams: 160,
        calories: 310,
        protein: 34,
        carbs: 0,
        fat: 18,
        confidence: 0.83,
      },
      {
        id: "food-7",
        name: "Puré de papas",
        grams: 200,
        calories: 210,
        protein: 4,
        carbs: 40,
        fat: 4,
        confidence: 0.78,
      },
    ],
    totalCalories: 520,
    totalProtein: 38,
    totalCarbs: 40,
    totalFat: 22,
  },
  {
    id: "meal-5",
    mealType: "breakfast",
    consumedAt: new Date(Date.now() - 86400000).toISOString(),
    foods: [
      {
        id: "food-8",
        name: "Tostadas con palta",
        grams: 150,
        calories: 300,
        protein: 8,
        carbs: 32,
        fat: 16,
        confidence: 0.8,
      },
    ],
    totalCalories: 300,
    totalProtein: 8,
    totalCarbs: 32,
    totalFat: 16,
  },
];

export const mockAnalysisResult: FoodAnalysisResult = {
  foods: [
    {
      name: "Pechuga de pollo",
      grams: 180,
      calories: 297,
      protein: 56,
      carbs: 0,
      fat: 6,
      confidence: 0.88,
    },
    {
      name: "Arroz blanco",
      grams: 200,
      calories: 260,
      protein: 5,
      carbs: 56,
      fat: 1,
      confidence: 0.81,
    },
  ],
  total: {
    calories: 557,
    protein: 61,
    carbs: 56,
    fat: 7,
  },
};
