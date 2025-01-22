"use client";

import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NewPasswordSchema } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { reset } from "@/actions/reset";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

export default function NewPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [error, setError] = useState<string | null | undefined>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function submitForm(values: z.infer<typeof NewPasswordSchema>) {
    setError("");
    setMessage("");

    startTransition(async () => {
      newPassword(values).then((data) => {
        setError(data?.error);
        setMessage(data?.success);
      });
    });
  }

  return (
    <div>
      <h2>Enter a new password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Write your password"
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "reseting..." : "Reset password"}
          </Button>
        </form>
      </Form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
