import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"

import authConfig from "./auth.config";
import { db } from "./lib/db";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    }
})