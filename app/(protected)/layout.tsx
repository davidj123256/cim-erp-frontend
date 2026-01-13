import { redirect } from "next/navigation";
import { Sidebar } from "./components/Sidebar";
import { getAuthUser } from "@/lib/auth.server";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
