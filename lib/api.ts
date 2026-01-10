// Makes fetch requests that include cookies and
// automatically attempts to refresh the session on 401 responses

// For protected routes, use apiFetch instead of fetch
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function apiFetch(
  input: RequestInfo,
  init: RequestInit = {}
) {
  let res = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (res.status === 401) {
    // try refresh
    const refreshRes = await fetch(
      `${API_BASE}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!refreshRes.ok) {
      throw new Error("Session expired");
    }

    // retry original request
    res = await fetch(input, {
      ...init,
      credentials: "include",
    });
  }

  return res;
}
