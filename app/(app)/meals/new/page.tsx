"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PhotoCaptureStep } from "@/components/meals/photo-capture-step";
import { AnalyzingStep } from "@/components/meals/analyzing-step";
import { ReviewStep } from "@/components/meals/review-step";
import { generateId, inferMealType } from "@/lib/nutrition/calculations";
import { saveMealAction } from "@/lib/nutrition/actions";
import type { FoodAnalysisResult, FoodItem, MealType } from "@/types/nutrition";

type Step = "capture" | "analyzing" | "review";

export default function NewMealPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("capture");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [mealType, setMealType] = useState<MealType>(() => inferMealType());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  async function handlePhotoSelected(file: File) {
    setImageUrl(URL.createObjectURL(file));
    setStep("analyzing");

    try {
      const formData = new FormData();
      formData.set("image", file);

      const response = await fetch("/api/analyze-food", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No pudimos analizar la imagen.");
      }

      const analysis = data as FoodAnalysisResult;
      setFoods(analysis.foods.map((food) => ({ ...food, id: generateId() })));
      setStep("review");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No pudimos analizar la imagen."
      );
      setStep("capture");
    }
  }

  async function handleSave() {
    setSaving(true);
    const result = await saveMealAction({
      mealType,
      foods: foods.map(({ name, grams, calories, protein, carbs, fat, confidence }) => ({
        name,
        grams,
        calories,
        protein,
        carbs,
        fat,
        confidence,
      })),
    });

    if (result.error) {
      toast.error(result.error);
      setSaving(false);
      return;
    }

    toast.success("Comida guardada");
    router.push("/");
  }

  if (step === "capture") {
    return <PhotoCaptureStep onPhotoSelected={handlePhotoSelected} />;
  }

  if (step === "analyzing" && imageUrl) {
    return <AnalyzingStep imageUrl={imageUrl} />;
  }

  return (
    <ReviewStep
      foods={foods}
      mealType={mealType}
      onFoodsChange={setFoods}
      onMealTypeChange={setMealType}
      onSave={handleSave}
      saving={saving}
    />
  );
}
