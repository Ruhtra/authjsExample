import { logout } from "@/actions/logout";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}

      <h1>Settings</h1>
      <p>Manage your account settings here.</p>

      <form action={logout}>
        <button type="submit">signOut</button>
      </form>
    </div>
  );
}
