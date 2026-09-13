"use client";

import { Camera, ImageIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PhotoCaptureStepProps {
  onPhotoSelected: (file: File) => void;
}

export function PhotoCaptureStep({ onPhotoSelected }: PhotoCaptureStepProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onPhotoSelected(file);
    event.target.value = "";
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-6xl">📸</span>
        <h1 className="text-2xl font-semibold">Analizar comida</h1>
        <p className="text-sm text-muted-foreground">
          Sacá una foto de tu plato o elegí una imagen de la galería para estimar
          calorías y macronutrientes.
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        <label className={cn(buttonVariants({ size: "lg" }), "h-14 cursor-pointer text-base")}>
          <Camera className="size-5" />
          Sacar foto
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleChange}
          />
        </label>

        <label
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "h-14 cursor-pointer text-base"
          )}
        >
          <ImageIcon className="size-5" />
          Elegir de la galería
          <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
        </label>
      </div>
    </div>
  );
}
