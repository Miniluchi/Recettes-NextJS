import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Routes qui nécessitent une authentification
const protectedRoutes = ["/recipes/new", "/favorites", "/profile"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si la route nécessite une authentification
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute) {
    // Vérifier si l'utilisateur est authentifié
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      // Rediriger vers /login avec un message via cookie
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);

      const response = NextResponse.redirect(loginUrl);

      // Passer le message via un cookie qui sera lu puis supprimé
      const message = "Vous devez être connecté pour accéder à cette page";
      response.cookies.set("auth-message", message, {
        maxAge: 60, // 60 secondes
        path: "/",
        httpOnly: false, // Important : doit être accessible côté client
        sameSite: "lax",
      });

      return response;
    }
  }

  return NextResponse.next();
}

// Configuration du matcher pour optimiser les performances
export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|.*\\.png$).*)",
  ],
};
