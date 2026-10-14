import { analyzeWithOpenAICompatible } from "@/lib/ai/providers/openai-compatible";
import { AnalyzeFoodError, type AnalyzeFoodInput } from "@/lib/ai/types";

export async function analyzeWithGroq(input: AnalyzeFoodInput) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new AnalyzeFoodError("Groq no está configurado.");

  return analyzeWithOpenAICompatible(input, {
    baseUrl: "https://api.groq.com/openai/v1",
    apiKey,
    model: process.env.GROQ_MODEL || "qwen/qwen3.8-27b",
    providerName: "Groq",
  });
}
