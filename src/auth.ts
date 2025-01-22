import NextAuth, { DefaultSession, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./lib/user";
import "next-auth/jwt";
import { UserRole } from "@prisma/client";

// Types.d.ts declare
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
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
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if (user.id) {
        const existingUser = await getUserById(user.id);

        //Prevent sign in without email verification
        if (!existingUser?.emailVerified) return false;
      } else {
        throw new Error("Usuário não contém id");
      }

      return true;
    },
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
