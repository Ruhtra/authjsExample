import React from "react";

export default function AuthErrorPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>We're sorry, but an unexpected error has occurred.</p>
      <a href="/auth/login">Go back to Login</a>
    </div>
  );
}
