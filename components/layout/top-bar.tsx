import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/80">
      <span className="text-sm font-semibold">🍽️ NutriSnap</span>
      <form action={logoutAction}>
        <Button
          type="submit"
          variant="ghost"
          size="icon-sm"
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <LogOut className="size-4" />
        </Button>
      </form>
    </header>
  );
}
