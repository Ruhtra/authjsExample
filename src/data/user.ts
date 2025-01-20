import { db } from "@/lib/db";

export async function getUserByEmail(email: string) {
    return await db.user.findUnique({
        where: {
            email: email,
        },
    });
}
export async function getUserById(id: string) {
    return await db.user.findUnique({
        where: {
            id: id,
        },
    });
}