import { Progress } from "@/components/ui/progress";
import { progressPercent } from "@/lib/nutrition/calculations";

interface MacroProgressProps {
  emoji: string;
  label: string;
  current: number;
  target: number;
  unit?: string;
}

export function MacroProgress({
  emoji,
  label,
  current,
  target,
  unit = "g",
}: MacroProgressProps) {
  const percent = progressPercent(current, target);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          {emoji} {label}
        </span>
        <span className="text-muted-foreground">
          {Math.round(current)} / {Math.round(target)} {unit}
        </span>
      </div>
      <Progress value={percent} />
    </div>
  );
}
