import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-5xl">🍽️</span>
        <h1 className="text-2xl font-semibold">Crear cuenta</h1>
      </div>
      <RegisterForm />
    </div>
  );
}
