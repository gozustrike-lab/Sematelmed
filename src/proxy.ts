import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ── Security Headers Configuration ──
const SECURITY_HEADERS = {
  "X-DNS-Prefetch-Control": "on",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(self), interest-cohorts=()",
  "X-XSS-Protection": "1; mode=block",
};

// ── Content Security Policy ──
function getCSP(request: NextRequest): string {
  const isDev = process.env.NODE_ENV === "development";
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const base = [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-inline' 'unsafe-eval'${
      isDev ? "" : " https://cdn.sanity.io"
    }`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' data: blob: https:`,
    `font-src 'self' https://fonts.gstatic.com`,
    `connect-src 'self' https://cdn.sanity.io https://*.sanity.io wss://*.sanity.io https://wa.me https://maps.google.com`,
    `frame-src https://maps.google.com https://www.google.com`,
    `media-src 'self' https:`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self' https://wa.me`,
    `frame-ancestors 'self'`,
  ];

  return base.join("; ");
}

// ── Admin paths that should be monitored ──
const ADMIN_PATHS = ["/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Apply security headers to all responses
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Apply Content Security Policy
  response.headers.set("Content-Security-Policy", getCSP(request));

  // Log admin access attempts (for monitoring)
  if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    console.log(
      `[Middleware] Admin access: ${pathname} from ${request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"}`,
    );
  }

  return response;
}

// ── Run middleware on all paths ──
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon\\.ico|assets/|images/|.*\\.svg$).*)",
  ],
};
