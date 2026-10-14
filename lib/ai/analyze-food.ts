import { analyzeWithGemini } from "@/lib/ai/providers/gemini";
import { analyzeWithOpenRouter } from "@/lib/ai/providers/openrouter";
import { analyzeWithGroq } from "@/lib/ai/providers/groq";
import { AnalyzeFoodError, type AnalyzeFoodInput } from "@/lib/ai/types";
import type { RawFoodAnalysis } from "@/lib/ai/schema";
import type { FoodAnalysisResult } from "@/types/nutrition";

interface Provider {
  name: string;
  run: (input: AnalyzeFoodInput) => Promise<RawFoodAnalysis>;
}

// Orden de fallback: se prueba el siguiente proveedor gratuito cuando el anterior
// falla (cuota agotada, error de red, respuesta inválida, etc.).
const PROVIDERS: Provider[] = [
  { name: "Gemini", run: analyzeWithGemini },
  { name: "OpenRouter", run: analyzeWithOpenRouter },
  { name: "Groq", run: analyzeWithGroq },
];

function toFoodAnalysisResult(raw: RawFoodAnalysis): FoodAnalysisResult {
  return {
    foods: raw.foods.map((food) => ({
      name: food.name,
      grams: food.estimated_grams,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      confidence: food.confidence,
    })),
    total: raw.total,
  };
}

export async function analyzeFood(input: AnalyzeFoodInput): Promise<FoodAnalysisResult> {
  for (const provider of PROVIDERS) {
    try {
      const raw = await provider.run(input);
      return toFoodAnalysisResult(raw);
    } catch (error) {
      console.error(`[analyzeFood] ${provider.name} falló:`, error);
    }
  }

  throw new AnalyzeFoodError(
    "No pudimos analizar la imagen en este momento. Probá de nuevo en unos minutos."
  );
}
