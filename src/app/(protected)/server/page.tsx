import { currentUser } from "@/lib/auth";
import React from "react";

export default async function ServerPage() {
  const user = await currentUser();

  return <div>{JSON.stringify(user)}</div>;
}
