import { cn } from "@/lib/cn";

/** Inter, uppercase, wide-tracked — the small label above a serif heading. */
export function Kicker({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "font-sans text-[0.8rem] font-medium uppercase tracking-[0.1em] text-accent",
        className,
      )}
    >
      {children}
    </p>
  );
}
