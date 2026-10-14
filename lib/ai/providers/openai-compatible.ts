import { foodAnalysisSchema, type RawFoodAnalysis } from "@/lib/ai/schema";
import { FOOD_ANALYSIS_PROMPT } from "@/lib/ai/prompt";
import { AnalyzeFoodError, type AnalyzeFoodInput } from "@/lib/ai/types";
import { extractJson, fetchWithTimeout } from "@/lib/ai/utils";

const TIMEOUT_MS = 25000;

interface OpenAICompatibleOptions {
  baseUrl: string;
  apiKey: string;
  model: string;
  providerName: string;
  extraHeaders?: Record<string, string>;
}

export async function analyzeWithOpenAICompatible(
  input: AnalyzeFoodInput,
  options: OpenAICompatibleOptions
): Promise<RawFoodAnalysis> {
  const response = await fetchWithTimeout(
    `${options.baseUrl}/chat/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${options.apiKey}`,
        ...options.extraHeaders,
      },
      body: JSON.stringify({
        model: options.model,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: FOOD_ANALYSIS_PROMPT },
              {
                type: "image_url",
                image_url: { url: `data:${input.mimeType};base64,${input.base64}` },
              },
            ],
          },
        ],
      }),
    },
    TIMEOUT_MS
  );

  if (!response.ok) {
    throw new AnalyzeFoodError(`${options.providerName} respondió con error ${response.status}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== "string") {
    throw new AnalyzeFoodError(`${options.providerName} no devolvió una respuesta válida.`);
  }

  const parsed = JSON.parse(extractJson(text));
  return foodAnalysisSchema.parse(parsed);
}
