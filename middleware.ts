import { NextRequest, NextResponse } from 'next/server';

// Use Edge Runtime for faster execution and lower costs
export const config = {
  matcher: [
    // Match all paths except static files, images, and API routes
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico|css|js)$).*)',
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Don't redirect if already on a localized path, API routes, or static assets
  if (
    pathname.startsWith('/es') || 
    pathname.startsWith('/de') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next();
  }

  // Get country from Vercel's geo headers (cast to any to avoid TypeScript issues)
  const country = (request as any).geo?.country;
  
  // Get Accept-Language header as fallback
  const acceptLanguage = request.headers.get('accept-language');

  // Check if user has a language preference cookie
  const langCookie = request.cookies.get('preferred-language')?.value;

  // Priority: Cookie > Country > Accept-Language > Default
  let targetLocale = '';

  if (langCookie === 'es' || langCookie === 'de') {
    targetLocale = langCookie;
  } else if (country === 'ES') {
    targetLocale = 'es';
  } else if (country === 'DE') {
    targetLocale = 'de';
  } else if (acceptLanguage) {
    // Check accept-language header for Spanish or German
    if (acceptLanguage.includes('es')) {
      targetLocale = 'es';
    } else if (acceptLanguage.includes('de')) {
      targetLocale = 'de';
    }
  }

  // Redirect to localized version if target locale is determined
  if (targetLocale && !pathname.startsWith(`/${targetLocale}`)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLocale}${pathname}`;
    
    // Add headers to indicate this was a geo-redirect for debugging
    const response = NextResponse.redirect(url);
    response.headers.set('x-geo-redirect', 'true');
    response.headers.set('x-detected-locale', targetLocale);
    
    return response;
  }

  // Default: English version (no redirect needed)
  return NextResponse.next();
}