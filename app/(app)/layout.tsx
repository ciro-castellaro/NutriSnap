import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { BottomNav } from "@/components/layout/bottom-nav";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col pb-20">
      {children}
      <BottomNav />
    </div>
  );
}
