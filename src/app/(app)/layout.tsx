import type { ReactNode } from "react";

import AppShell from "@/components/layout/AppShell";
import { sessionUser } from "@/lib/mock";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AppShell user={sessionUser}>{children}</AppShell>;
}
