import type { Metadata } from "next";

import LockmateMark from "@/components/brand/LockmateMark";
import LockmateWordmark from "@/components/brand/LockmateWordmark";

import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
};

const POINTS = [
  "One identity across every Mate space",
  "Roles you can read at a glance",
  "Every grant versioned and reviewable",
];

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
      <section className="bg-highlight/70 relative hidden overflow-hidden p-12 lg:flex lg:flex-col lg:justify-between">
        <LockmateWordmark className="relative h-7 w-auto" />

        <div className="relative max-w-md">
          <LockmateMark className="role-pulse mb-8 h-16 w-16" />
          <h1 className="font-display text-primary text-4xl leading-[1.05] font-bold break-words">
            Access, kept honest.
          </h1>
          <p className="text-foreground/80 mt-4 max-w-[38ch] text-base">
            Lockmate is the shared sign-in and permissions layer for Mate
            projects. Calm on the surface, exact underneath.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {POINTS.map((point) => (
              <li
                key={point}
                className="text-foreground flex items-center gap-3 text-sm font-medium"
              >
                <span
                  className="bg-primary h-2 w-2 rounded-full"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <p className="eyebrow relative">Mate Workspace · secure sign-in</p>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <LockmateWordmark className="mb-8 h-6 w-auto lg:hidden" />
          <p className="eyebrow mb-2">Welcome back</p>
          <h2 className="font-display text-foreground text-3xl font-bold">
            Sign in to Lockmate
          </h2>
          <p className="text-muted mt-2 mb-7 text-sm">
            Continue to the Mate workspace you belong to.
          </p>

          <LoginForm />
        </div>
      </section>
    </main>
  );
}
