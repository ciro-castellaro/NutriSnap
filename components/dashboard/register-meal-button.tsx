import Link from "next/link";
import { Plus } from "lucide-react";

export function RegisterMealButton() {
  return (
    <Link
      href="/meals/new"
      className="fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform active:scale-95"
    >
      <Plus className="size-5" />
      Registrar comida
    </Link>
  );
}
