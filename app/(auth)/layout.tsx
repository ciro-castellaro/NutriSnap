import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";

export default async function AuthLayout({ children }: LayoutProps<"/">) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6">
      {children}
    </div>
  );
}
