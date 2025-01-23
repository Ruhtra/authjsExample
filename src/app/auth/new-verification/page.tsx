"use client";

import { newVerification } from "@/actions/new-verification-token";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function NewVerification() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onsubmit]);

  return (
    <div>
      <h1>New Verification Page</h1>

      {!success && !error && <p>loading....</p>}

      {success && <p> {success}</p>}
      {!success && error && <p> {error}</p>}

      <a href="/auth/login">Back to login</a>
    </div>
  );
}
