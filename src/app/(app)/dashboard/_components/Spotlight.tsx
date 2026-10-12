import Link from "next/link";

import LockmateMark from "@/components/brand/LockmateMark";
import Card from "@/components/ui/card";
import { buttonClasses } from "@/components/ui/button";
import { SparkIcon } from "@/components/icons";

export default function Spotlight() {
  return (
    <Card className="relative overflow-hidden p-6">
      <div
        className="bg-highlight/70 pointer-events-none absolute -top-12 -right-10 h-44 w-44 rounded-full blur-2xl"
        aria-hidden="true"
      />
      <div className="relative">
        <LockmateMark className="role-pulse h-11 w-11" />
        <h2 className="font-display text-foreground mt-5 text-2xl leading-tight font-bold">
          Nothing changes silently.
        </h2>
        <p className="text-muted mt-2.5 max-w-[38ch] text-sm">
          Every grant, invite, and revocation is versioned. When a role changes,
          Lockmate keeps the receipt — and shows who signed off.
        </p>

        <dl className="border-border mt-5 flex items-center gap-6 border-t pt-4">
          <div>
            <dt className="eyebrow">Changes · 7d</dt>
            <dd className="font-display text-primary mt-1 text-2xl font-bold">
              14
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Reviewers</dt>
            <dd className="font-display text-primary mt-1 text-2xl font-bold">
              3
            </dd>
          </div>
        </dl>

        <Link
          href="/access-control"
          className={buttonClasses({
            variant: "outline",
            className: "mt-5",
          })}
        >
          <SparkIcon className="h-4 w-4" />
          Review access
        </Link>
      </div>
    </Card>
  );
}
