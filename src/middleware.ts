import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token') || null // Usar diretamente como um valor simples
  const pathname = request.nextUrl.pathname

  console.log('Token:', token)

  const isAccessingRoot = pathname === '/'
  const isAccessingWorkspace = pathname.startsWith('/workspace/')

  const isProtectedRoute = isAccessingRoot || isAccessingWorkspace

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
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
