import NextAuth, { DefaultSession, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import "next-auth/jwt";
import { UserRole } from "@prisma/client";

// Types.d.ts declare
declare module "next-auth" {
  interface Session {
    user: {
      //   id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: UserRole;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    // async signIn({ user }) {
    //   if (user.id) {
    //     const suer = await getUserById(user.id);

    //     if (!suer || !suer.emailVerified) {
    //       return false;
    //     }
    //   }

    //   return true;
    // },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) return token;

      token.role = user.role;

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
