"use client";

import { toast } from "sonner";
import { RoleGate } from "./role-gate";
import { UserRole } from "@prisma/client";
import { admin } from "@/actions/admin";

export default function AdminPage() {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success("Allowed api route!");
      }
      if (data.error) {
        toast.error("forbidden api route!");
      }
    });
  };

  const onApiRouteClikc = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed api route!");
      } else {
        toast.error("forbidden api route!");
      }
    });
  };

  return (
    <>
      <RoleGate allowerrole={UserRole["admin"]}>
        <>You are allowed to see this content!</>
      </RoleGate>

      <div>
        <p>admin only api route</p>

        <button onClick={onApiRouteClikc}> click to test</button>
      </div>
      <br />
      <div>
        <p>admin only api server action</p>

        <button onClick={onServerActionClick}> click to test</button>
      </div>
    </>
  );
}
