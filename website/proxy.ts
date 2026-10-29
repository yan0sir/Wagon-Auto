import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "ar"];

/** Sends visitors without a locale prefix to /en or /ar, based on their browser language. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase())
    .find((tag) => locales.includes(tag.slice(0, 2)));
  const locale = preferred?.slice(0, 2) ?? "en";

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, metadata files and anything with a file extension (public assets).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
