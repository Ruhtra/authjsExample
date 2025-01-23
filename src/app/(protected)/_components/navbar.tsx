import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Button asChild>
            <Link href="/server">Server</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href="/settings">Settings</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href="/client">Client</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href="/admin">Admin</Link>
          </Button>
        </li>
        <li>
          <Button onClick={logout}>Logout</Button>
        </li>
      </ul>
    </nav>
  );
}
