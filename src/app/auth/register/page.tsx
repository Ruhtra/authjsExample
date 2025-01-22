"use client";

import React, { useTransition, useState } from "react";
import { register } from "@/actions/register";

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [error, setError] = useState<string | null | undefined>(null);

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    startTransition(() => {
      register(values).then((data) => {
        setMessage(data?.succes);
        setError(data?.error);
      });
    });
  }

  return (
    <div>
      <h2>Register</h2>
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
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
