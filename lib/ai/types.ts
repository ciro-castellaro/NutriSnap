import type { FoodAnalysisResult } from "@/types/nutrition";

export interface AnalyzeFoodInput {
  base64: string;
  mimeType: string;
}

export type AnalyzeFood = (input: AnalyzeFoodInput) => Promise<FoodAnalysisResult>;

export class AnalyzeFoodError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AnalyzeFoodError";
  }
}

export type { FoodAnalysisResult };
