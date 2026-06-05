import { cn } from "@/lib/cn";

/** Larger Georgia intro paragraph. */
export function Lead({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "font-serif text-[1.3rem] leading-[1.6] text-ink-soft max-w-[60ch]",
        className,
      )}
    >
      {children}
    </p>
  );
}
