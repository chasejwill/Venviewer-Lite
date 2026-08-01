"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";

export function LoginForm({ csrf }: { csrf: string }) {
  const [state, action] = useActionState(loginAction, {});
  return (
    <form action={action} className="card form stack">
      <input type="hidden" name="csrf" value={csrf} />
      <label>
        Email
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      {state.error ? (
        <p className="error" role="alert">
          {state.error}
        </p>
      ) : null}
      <SubmitButton>Log in</SubmitButton>
    </form>
  );
}
