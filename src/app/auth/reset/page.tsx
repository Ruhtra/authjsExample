"use client";

import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResetSchema } from "@/schemas/LoginSchema";
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

export default function ResetPage() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [error, setError] = useState<string | null | undefined>(null);

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  async function submitForm(values: z.infer<typeof ResetSchema>) {
    setError("");
    setMessage("");

    startTransition(async () => {
      reset(values).then((data) => {
        setError(data?.error);
        setMessage(data?.success);
      });
    });
  }

  return (
    <div>
      <h2>Forgot your password?</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Write your email"
                    type="email"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "loading..." : "Send reset email"}
          </Button>
        </form>
      </Form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
