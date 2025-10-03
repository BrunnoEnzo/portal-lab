import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  // Estendido para o objeto User retornado pelo authorize
  interface User {
    accessToken?: string;
  }
  
  interface Session {
    accessToken?: string;
    user: {
      role?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    role?: string;
  }
}