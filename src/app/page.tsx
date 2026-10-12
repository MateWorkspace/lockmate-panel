import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Lockmate",
};

export default function RootPage() {
  redirect("/dashboard");
}
