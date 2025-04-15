import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Acesso correto ao valor

  console.log(token)

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/workspace/:path*',
    // outras rotas privadas, se necessário
  ],
}
