// Makes fetch requests that include cookies and
// automatically attempts to refresh the session on 401 responses

// For protected routes, use apiFetch instead of fetch
export const API_BASE = 'http://localhost:3000';

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
      "http://localhost:3000/auth/refresh-token",
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
