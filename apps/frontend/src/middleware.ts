// apps/frontend/src/middleware.ts

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // A função `withAuth` enriquece sua `Request` com o token do usuário.
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      // O callback 'authorized' decide se o middleware deve ser executado.
      authorized: ({ token }) => {
        // Se não houver token (!!token será false), o usuário será
        // redirecionado para a página de login.
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/student/:path*', '/teacher/:path*', '/admin/:path*'],
};