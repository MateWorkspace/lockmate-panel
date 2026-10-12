import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export default function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("card", className)} {...props} />;
}
