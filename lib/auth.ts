import { cookies, headers } from "next/headers";
import { apiFetch } from "./api";

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
  const res = await fetch("http://localhost:3000/auth/me", {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
