import { analyzeWithOpenAICompatible } from "@/lib/ai/providers/openai-compatible";
import { AnalyzeFoodError, type AnalyzeFoodInput } from "@/lib/ai/types";

export async function analyzeWithOpenRouter(input: AnalyzeFoodInput) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new AnalyzeFoodError("OpenRouter no está configurado.");

  return analyzeWithOpenAICompatible(input, {
    baseUrl: "https://openrouter.ai/api/v1",
    apiKey,
    model: process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free",
    providerName: "OpenRouter",
  });
}
