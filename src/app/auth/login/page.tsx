"use client";

import { login } from "@/actions/login";
import React, { useTransition, useState } from "react";
import SocialLogin from "./_components/social";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      try {
        console.log("aqui");
        const response = await login(values);
        console.log(response?.error);

        if (!!response?.error) {
          setError(response.error);
          setMessage(null);
          // add WHEN 2FA
        } else {
          setError(null);
          setMessage("Login successful!");
        }

        // setError(null);
        // setMessage('Login successful!');
      } catch (err) {
        console.log(err);

        setError("Login failed. Please try again.");
        setMessage(null);
      }
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
