"use client";

import { useCurrentRole } from "@/hooks/use-curret-role";
import { UserRole } from "@prisma/client";
import { ReactNode } from "react";

interface RoleGateProps {
  children: ReactNode;
  allowerrole: UserRole;
}

export function RoleGate({ children, allowerrole }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowerrole) {
    return <>Yout do not have permission to view this content</>;
  }

  return <>{children}</>;
}
