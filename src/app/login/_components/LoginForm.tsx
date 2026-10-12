"use client";

import { useState } from "react";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import {
  CircleCheckIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
} from "@/components/icons";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(false);
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setDone(true);
    }, 700);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div>
        <Label htmlFor="login-email" className="mb-1.5">
          Email
        </Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue="dewi@mateworkspace.id"
          placeholder="you@workspace.id"
          required
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <Label htmlFor="login-password">Password</Label>
          <a
            href="#"
            className="text-primary hover:text-accent-deep text-sm font-semibold transition-colors"
          >
            Forgot?
          </a>
        </div>
        <div className="relative">
          <Input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            defaultValue="lockmate-demo"
            className="pr-11"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="text-muted hover:text-primary focus-visible:ring-focus/50 absolute top-1/2 right-1.5 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <label className="text-muted flex items-center gap-2.5 text-sm">
        <input
          type="checkbox"
          defaultChecked
          className="accent-primary h-4 w-4 rounded"
        />
        Keep me signed in on this device
      </label>

      <div className="relative">
        <Button type="submit" block loading={pending}>
          Sign in
        </Button>
        {done ? (
          <span className="star-burst right-2 -bottom-2" aria-hidden="true" />
        ) : null}
      </div>

      {done ? (
        <p
          role="status"
          className="text-success flex items-center gap-2 text-sm font-semibold"
        >
          <CircleCheckIcon className="h-4 w-4" />
          Signed in — this is a demo, no session was created.
        </p>
      ) : null}

      <div className="text-subtle flex items-center gap-3 text-xs">
        <span className="bg-border h-px flex-1" />
        or
        <span className="bg-border h-px flex-1" />
      </div>

      <Button type="button" variant="outline" block>
        <GoogleIcon className="h-4 w-4" />
        Continue with Google
      </Button>
    </form>
  );
}
