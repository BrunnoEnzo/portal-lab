import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL;

const getDecodedToken = (token: string) => {
  try {
    return jwtDecode<{ sub: string; username: string; email: string; role: string }>(token);
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const res = await fetch(`${BACKEND_INTERNAL_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          });

          const data = await res.json();
          if (res.ok && data.access_token) {
            return { id: 'credentials-user', accessToken: data.access_token };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 60*60, // 1 minuto em segundos
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Lógica para login com credenciais
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      
      // Lógica para login social (Google, GitHub)
      if (account && user) {
        try {
          const res = await fetch(`${BACKEND_INTERNAL_URL}/auth/social-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              provider: account.provider,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            token.accessToken = data.access_token; // Anexa o token do nosso backend
          }
        } catch (error) {
          console.error('Social login backend call failed', error);
          return { ...token, error: 'SocialLoginError' };
        }
      }

      // Após obter o token (de qualquer fonte), decodificamos para pegar a role
      if (token.accessToken) {
        const decoded = getDecodedToken(token.accessToken);
        if (decoded) {
          token.role = decoded.role;
          token.name = decoded.username;
          token.email = decoded.email;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Passa as informações do token JWT para o objeto da sessão
      // que fica acessível no lado do cliente.
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };