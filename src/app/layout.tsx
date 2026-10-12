import type { Metadata } from "next";

import { fontVariables } from "@/config/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lockmate",
    template: "%s · Lockmate",
  },
  description:
    "Lockmate is the shared authentication and authorization service for Mate projects.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="bg-background text-foreground flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
