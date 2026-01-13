import { API_BASE, apiFetch } from "./api";

export async function logout() {
  await apiFetch(`${API_BASE}/auth/logout`, { method: "POST" });
}