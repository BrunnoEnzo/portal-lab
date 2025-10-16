// frontend/src/middleware.ts (ATUALIZADO)

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // Se o usuário não tem role e está tentando acessar uma rota protegida
    if (!token?.role) {
      // Pode redirecionar para uma página de "acesso negado" ou para o login
      return new NextResponse("Você não tem permissão para acessar esta página.", { status: 403 });
    }

    // Proteção para rotas de Administrador
    if (pathname.startsWith('/administrator') && token.role !== 'ADMIN') {
      return new NextResponse("Acesso negado.", { status: 403 });
    }

    // Proteção para rotas de Professor (quando implementar)
    if (pathname.startsWith('/professor') && token.role !== 'PROFESSOR') {
       return new NextResponse("Acesso negado.", { status: 403 });
    }

    // Proteção para rotas de Aluno
    if (pathname.startsWith('/student') && token.role !== 'STUDENT') {
       return new NextResponse("Acesso negado.", { status: 403 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/student/:path*', '/professor/:path*', '/administrator/:path*'],
};