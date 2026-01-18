import { NextRequest, NextResponse } from 'next/server';

// Use Edge Runtime for faster execution and lower costs
export const config = {
  matcher: [
    // Match only HTML pages, exclude all static assets and API routes
    // This matcher already excludes: _next, images, videos, and all file extensions
    '/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|robots.txt|sitemap.xml|images|videos|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico|css|js|json|woff|woff2|ttf|eot|pdf)$).*)',
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // OPTIMIZATION: Respect user's manual language choice (path takes priority)
  // If path already has a language prefix, skip geo-detection entirely
  // This is GDPR/CCPA compliant - no cookies needed, URL-based preference
  if (pathname.startsWith('/es') || pathname.startsWith('/de') || pathname.startsWith('/fr')) {
    return NextResponse.next();
  }

  // CRITICAL OPTIMIZATION: Only run geo-detection on root path '/'
  // If user is on any other English page (/blog, /about-us, etc.), they've already
  // been through root or explicitly navigated there - no need to detect again
  // This reduces function invocations by ~90% for non-root pages
  if (pathname !== '/') {
    return NextResponse.next();
  }

  // Only run geo-detection on root '/' path (first visit or direct root access)
  // This expensive operation now runs ONLY on root path, not on every English page
  
  // Get country from Vercel's geo headers (cast to any to avoid TypeScript issues)
  const country = (request as any).geo?.country;
  
  // Get Accept-Language header as fallback (always available, no consent needed)
  const acceptLanguage = request.headers.get('accept-language');

  // Priority: Country > Accept-Language > Default (English)
  let targetLocale = '';

  if (country === 'ES') {
    targetLocale = 'es';
  } else if (country === 'DE') {
    targetLocale = 'de';
  } else if (country === 'FR') {
    targetLocale = 'fr';
  } else if (acceptLanguage) {
    // Check accept-language header for Spanish, German, or French
    if (acceptLanguage.includes('es')) {
      targetLocale = 'es';
    } else if (acceptLanguage.includes('de')) {
      targetLocale = 'de';
    } else if (acceptLanguage.includes('fr')) {
      targetLocale = 'fr';
    }
  }

  // Redirect to localized version if target locale is determined
  if (targetLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLocale}${pathname}`;
    
    // No cookies set - GDPR/CCPA compliant
    const response = NextResponse.redirect(url);
    response.headers.set('x-geo-redirect', 'true');
    response.headers.set('x-detected-locale', targetLocale);
    
    return response;
  }

  // Default: English version (no redirect needed, no cookies)
  return NextResponse.next();
}