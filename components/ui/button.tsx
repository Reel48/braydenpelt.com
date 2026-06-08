import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center rounded-full font-sans text-[0.92rem] font-medium px-5 py-3 transition duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-accent-strong text-on-accent hover:bg-secondary",
  ghost:
    "bg-surface text-ink border border-border-strong hover:border-accent hover:text-accent",
};

export function Button({
  href,
  variant = "primary",
  external,
  className,
  children,
}: {
  href?: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = cn(base, variants[variant], className);
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return <button className={cls}>{children}</button>;
}
