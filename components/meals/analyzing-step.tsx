import Image from "next/image";
import { Loader2 } from "lucide-react";

interface AnalyzingStepProps {
  imageUrl: string;
}

export function AnalyzingStep({ imageUrl }: AnalyzingStepProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="relative size-48 overflow-hidden rounded-2xl">
        <Image src={imageUrl} alt="Comida a analizar" fill className="object-cover" unoptimized />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Loader2 className="size-10 animate-spin text-white" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Analizando tu comida...</h2>
        <p className="text-sm text-muted-foreground">
          Detectando alimentos y estimando porciones.
        </p>
      </div>
    </div>
  );
}
