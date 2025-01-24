import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const session = useSession();
  console.log(session);

  return session.data?.user;
}
