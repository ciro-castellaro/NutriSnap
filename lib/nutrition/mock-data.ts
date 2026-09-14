import type { FoodAnalysisResult } from "@/types/nutrition";

// Simula la respuesta de la IA multimodal. Se reemplaza por analyzeFood() en la integración real.
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
