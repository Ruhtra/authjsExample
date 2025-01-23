"use client";

import { login } from "@/actions/login";
import React, { useTransition, useState } from "react";
import SocialLogin from "./_components/social";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/LoginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(null);

  //error authjs
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : null;

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  async function submitForm(values: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      login(values)
        .then((data) => {
          if (data.error) {
            form.reset();
            setError(data?.error);
          }
          if (data.success) {
            form.reset();
            setMessage(data?.success);
          }
          if (data.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => {
          setError("Something went Wrong");
        });
    });
  }

  return (
    <div>
      <h2>Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          {showTwoFactor && (
            <>
              <FormField
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
          {!showTwoFactor && (
            <>
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="email@gmail.com"
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="******" type="password" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <button type="button">
                <Link href={"/auth/reset"}>Fogot password?</Link>
              </button>
            </>
          )}

          <Button type="submit" disabled={isPending}>
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error ||
        (urlError && <p style={{ color: "red" }}>{error || urlError}</p>)}
      <SocialLogin />
    </div>
  );
}
