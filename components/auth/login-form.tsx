"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <Label className="text-xs text-muted-foreground">Email</Label>
        <Input type="email" name="email" required autoComplete="email" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Contraseña</Label>
        <Input type="password" name="password" required autoComplete="current-password" />
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" size="lg" className="h-14 text-base" disabled={pending}>
        {pending ? "Entrando..." : "Entrar"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        ¿No tenés cuenta?{" "}
        <Link href="/register" className="font-medium text-foreground underline">
          Registrate
        </Link>
      </p>
    </form>
  );
}
