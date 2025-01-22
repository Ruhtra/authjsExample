"use client";

import { login } from "@/actions/login";
import React, { useTransition, useState } from "react";
import SocialLogin from "./_components/social";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [error, setError] = useState<string | null | undefined>(null);

  //error authjs
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : null;

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    startTransition(async () => {
      login(values).then((data) => {
        setError(data?.error);
        setMessage(data?.success);
      });
    });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="button">
          <Link href={"/auth/reset"}>Fogot password?</Link>
        </button>
        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error ||
        (urlError && <p style={{ color: "red" }}>{error || urlError}</p>)}
      <SocialLogin />
    </div>
  );
}
