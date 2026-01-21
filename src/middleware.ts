import { auth } from "@/lib/auth";

export default auth;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     *
     * Also exclude requests to files with extensions (e.g. .png/.jpg/.svg/.txt/.xml),
     * so static assets never hit auth middleware.
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};

