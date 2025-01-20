import type { NextAuthConfig, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

import { LoginSchema } from "@/schemas/LoginSchema";
import { getUserByEmail } from "./data/user";

export default {
    providers: [Credentials({
        async authorize(credentials): Promise<User | null> {

            
            const validatedFields = LoginSchema.safeParse(credentials)

            console.log(validatedFields);
            

            if (validatedFields.success) {
                const { email, password } = validatedFields.data

                const user = await getUserByEmail(email)

                
                if (!user || !user.passwordHash) return null

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.passwordHash
                )

                console.log(passwordMatch);
                

                if (!passwordMatch) return null;

                // const response: User = {
                //     id: user?.id,
                //     email: user?.email,
                //     image: user?.image,
                //     name: user?.name
                // }
                return user;
            } 

            return null;
        }
    })]
} satisfies NextAuthConfig