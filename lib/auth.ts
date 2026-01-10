import { headers } from "next/headers";
import { API_BASE } from "./api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export async function getAuthUser() {
  
  const cookieHeader = (await headers()).get("cookie");

  if (!cookieHeader) {
    return null;
  }
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
