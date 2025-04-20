import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './utils/verify-token';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const token = request.cookies.get("token")?.value;

  // Redireciona para "/" se o usuário autenticado acessar "/sign-in"
  if (pathname === "/sign-in") {
    if (token && await verifyToken(token)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Redireciona para "/sign-in" se o token for inválido ou inexistente
  if (!token || !(await verifyToken(token))) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Salva o slug do workspace nos cookies ao acessar "/workspace/:slug"
  if (pathname.startsWith('/workspace')) {
    const slug = pathname.split('/')[2]; // Obtém o slug do workspace
    if (slug) {
      response.cookies.set('workspace', slug, { path: '/' }); // Salva o slug nos cookies
    }
  } else {
    response.cookies.delete('workspace'); 
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/workspace/:path*',
    '/settings/:path*',
    '/sign-in',
  ],
};