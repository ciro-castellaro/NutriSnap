import { foodAnalysisSchema, type RawFoodAnalysis } from "@/lib/ai/schema";
import { FOOD_ANALYSIS_PROMPT } from "@/lib/ai/prompt";
import { AnalyzeFoodError, type AnalyzeFoodInput } from "@/lib/ai/types";
import { extractJson, fetchWithTimeout } from "@/lib/ai/utils";

const TIMEOUT_MS = 25000;

export async function analyzeWithGemini(input: AnalyzeFoodInput): Promise<RawFoodAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new AnalyzeFoodError("Gemini no está configurado.");

  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetchWithTimeout(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: FOOD_ANALYSIS_PROMPT },
              { inline_data: { mime_type: input.mimeType, data: input.base64 } },
            ],
          },
        ],
        generationConfig: { responseMimeType: "application/json" },
      }),
    },
    TIMEOUT_MS
  );

  if (!response.ok) {
    throw new AnalyzeFoodError(`Gemini respondió con error ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== "string") {
    throw new AnalyzeFoodError("Gemini no devolvió una respuesta válida.");
  }

  const parsed = JSON.parse(extractJson(text));
  return foodAnalysisSchema.parse(parsed);
}
