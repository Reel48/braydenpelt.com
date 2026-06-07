import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  as = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return createElement(
    as,
    {
      className: cn(
        "rounded-[14px] border border-card-border bg-card p-6 sm:p-8 shadow-soft",
        className,
      ),
    },
    children,
  );
}
