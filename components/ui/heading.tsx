import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const levelStyles: Record<1 | 2 | 3 | 4, string> = {
  1: "text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.1] tracking-[-0.015em] font-normal",
  2: "text-[clamp(1.75rem,3.5vw,2.25rem)] leading-[1.15] tracking-[-0.01em] font-normal",
  3: "text-[1.5rem] leading-[1.2] tracking-[-0.005em] font-normal",
  4: "text-[1.25rem] leading-[1.3] font-bold",
};

/** Georgia heading. Hierarchy comes from size + italic + color, not weight. */
export function Heading({
  level = 2,
  as,
  className,
  children,
}: {
  level?: 1 | 2 | 3 | 4;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}) {
  const Tag: ElementType = as ?? (`h${level}` as ElementType);
  return createElement(
    Tag,
    { className: cn("font-serif text-ink", levelStyles[level], className) },
    children,
  );
}

/** Oversized Georgia display, for hero name / page openers. */
export function Display({
  as = "h1",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const Tag: ElementType = as;
  return (
    <Tag
      className={cn(
        "font-serif font-normal text-ink text-[clamp(2.75rem,7vw,4.75rem)] leading-[1.05] tracking-[-0.02em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
