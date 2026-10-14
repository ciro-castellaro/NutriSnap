import { z } from "zod";

export const foodAnalysisSchema = z.object({
  foods: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(120),
        estimated_grams: z.number().nonnegative(),
        calories: z.number().nonnegative(),
        protein: z.number().nonnegative(),
        carbs: z.number().nonnegative(),
        fat: z.number().nonnegative(),
        confidence: z.number().min(0).max(1),
      })
    )
    .min(1),
  total: z.object({
    calories: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    carbs: z.number().nonnegative(),
    fat: z.number().nonnegative(),
  }),
});

export type RawFoodAnalysis = z.infer<typeof foodAnalysisSchema>;
