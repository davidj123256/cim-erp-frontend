"use client";

import { logout } from "@/lib/auth.client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLoout = async () => {
    try {
      await logout();

      router.refresh();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button className="text-sm text-red-600 hover:underline" onClick={handleLoout}>
      Logout
    </button>
  );
}
