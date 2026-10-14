"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { AUTH_INPUT_CLASS } from "@/components/auth/styles";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, {});

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <Label className="text-xs text-muted-foreground">Nombre</Label>
        <Input type="text" name="name" required autoComplete="name" className={AUTH_INPUT_CLASS} />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Email</Label>
        <Input
          type="email"
          name="email"
          required
          autoComplete="email"
          className={AUTH_INPUT_CLASS}
        />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Contraseña</Label>
        <PasswordInput
          name="password"
          required
          minLength={6}
          autoComplete="new-password"
          className={AUTH_INPUT_CLASS}
        />
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" size="lg" className="h-14 text-base" disabled={pending}>
        {pending ? "Creando cuenta..." : "Crear cuenta"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="font-medium text-foreground underline">
          Entrá
        </Link>
      </p>
    </form>
  );
}
