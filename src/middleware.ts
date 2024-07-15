// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;

    if (pathname.startsWith("/extra") && token?.role !== "admin") {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (pathname.startsWith("/client") && token?.role !== "admin" && token?.role !== "manager") {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/pages/:path*", "/client/:path*", "/dashboard/:path*"],
};
