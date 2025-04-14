// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// Define as rotas que exigem autenticação (já cobertas no matcher)
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname

  const isAccessingRoot = pathname === '/'
  const isAccessingWorkspace = pathname.startsWith('/workspace/')

  const isProtectedRoute = isAccessingRoot || isAccessingWorkspace

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

// Executa o middleware apenas nas rotas protegidas
export const config = {
  matcher: [
    '/',
    '/workspace/:path*',
    // outras rotas privadas, se necessário
  ],
}
