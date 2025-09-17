// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware que intercepta todas as requisições
export function middleware(request: NextRequest) {
  console.log('Middleware executado para a rota:', request.nextUrl.pathname);

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Aplica o middleware a todas as rotas, exceto as que começam com /api, /_next/static, /_next/image e favicon.ico
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};