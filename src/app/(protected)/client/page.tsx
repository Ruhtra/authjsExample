"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";

export default function ClientPage() {
  const user = useCurrentUser();

  return <div>{JSON.stringify(user)}</div>;
}
