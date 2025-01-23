import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

// export const getTwoFactorByEmail = async (email: string) => {
//   try {
//     const twoFfactorToken = await db.twoFactorToken.findFirst({
//       where: {
//         email,
//       },
//     });
//     return twoFfactorToken;
//   } catch {
//     return null;
//   }
// };
