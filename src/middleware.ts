import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { i18n } from '../next-i18next.config';

acceptLanguage.languages(i18n.locales);

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const cookieName = 'i18next';

export function middleware(request: NextRequest) {
  let language;

  // Get language from cookie if available
  if (request.cookies.has(cookieName)) {
    language = acceptLanguage.get(request.cookies.get(cookieName)?.value);
  }
  
  // Otherwise get language from Accept-Language header
  if (!language) {
    language = acceptLanguage.get(request.headers.get('Accept-Language'));
  }
  
  // If still no language, use default locale
  if (!language) {
    language = i18n.defaultLocale;
  }

  // Redirect if language is not in pathname
  const pathnameHasLocale = i18n.locales.some(
    (locale) => request.nextUrl.pathname.startsWith(`/${locale}/`) || request.nextUrl.pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/${language}${request.nextUrl.pathname}`, request.url)
    );
  }

  // Handle locale change via cookie
  if (request.headers.has('referer')) {
    const refererUrl = new URL(request.headers.get('referer') || '');
    const langInReferer = i18n.locales.find((l) => refererUrl.pathname.startsWith(`/${l}/`));
    const response = NextResponse.next();
    
    if (langInReferer) {
      response.cookies.set(cookieName, langInReferer);
    }
    
    return response;
  }

  return NextResponse.next();
} 