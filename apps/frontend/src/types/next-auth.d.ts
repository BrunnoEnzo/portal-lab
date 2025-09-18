// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// Estende o tipo do token JWT
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: string;
    accessToken?: string;
  }
}

// Estende o tipo do usuário da sessão
declare module "next-auth" {
  interface Session {
    user?: {
      role?: string;
    } & DefaultSession["user"];
  }

  // Estende o tipo do usuário que vem dos providers
  interface User extends DefaultUser {
    role?: string;
  }
}