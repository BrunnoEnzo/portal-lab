// apps/frontend/src/app/api/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

// A função NextAuth() é o coração da biblioteca.
// Ela recebe um objeto de configuração.
const handler = NextAuth({
  // A propriedade 'providers' é um array com todos os métodos de login que você quer oferecer.
  providers: [
    GithubProvider({
      // O NextAuth procura automaticamente por estas variáveis de ambiente no seu .env
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Você pode adicionar mais provedores aqui (ex: CredentialsProvider para login com email/senha)
  ],

  // Aqui é onde adicionaremos a lógica para integrar com nosso backend Nest.js no futuro.
  callbacks: {
    async signIn({ user, account }) {
      console.log('Callback signIn:', { user, account });
      // TODO: Fazer chamada para o backend NestJS para criar/verificar o usuário.
      return true; // Retornar true para permitir o login
    },
    // ... outros callbacks como 'jwt' e 'session'
  },
});

// O Next.js precisa que você exporte o handler para os métodos GET e POST.
// O [...nextauth] "pega" todas as requisições e as envia para este handler.
export { handler as GET, handler as POST };