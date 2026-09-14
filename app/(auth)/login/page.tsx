import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-5xl">🍽️</span>
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
      </div>
      <LoginForm />
    </div>
  );
}
