'use server'
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";


export async function register(values: any) {
    console.log(values);

    const { email, password } = values

    const pwd = await bcrypt.hash(password, 10);

    const user = await getUserByEmail(email)

    if (user) return { error: 'Email exist' }

    await db.user.create({
        data: {
            email,
            passwordHash: pwd
        }
    })

    // TODO: SEND VERIFICAITON TOKEN

    return { succes: 'user created' }


}