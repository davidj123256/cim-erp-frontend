import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") ?? "";

  // 1. Check session
  const meRes = await fetch("http://localhost:3000/auth/me", {
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  //   2. If not authenticated, attempt refresh token
  if (meRes.status === 401) {
    const refreshRes = await fetch("http://localhost:3000/auth/refresh-token", {
      method: "POST",
      headers: {
        cookie: cookieHeader, // forward cookies again
      },
      cache: "no-store",
    });

    // 3. Refresh failed, so redirect to login
    if (!refreshRes.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 🔑 Force a new request so cookies are applied
    const response = NextResponse.redirect(req.nextUrl);

    const setCookies = refreshRes.headers.getSetCookie?.();

    if (setCookies?.length) {
      for (const cookie of setCookies) {
        response.headers.append("set-cookie", cookie);
      }
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Run middleware on all routes
      EXCEPT:
      - auth pages
      - api
      - next internals
      - static files
    */
    "/((?!login|api|_next|favicon.ico).*)",
  ],
};
