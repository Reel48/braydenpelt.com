import { cn } from "@/lib/cn";

/** Georgia italic pull-quote. */
export function Quote({
  cite,
  className,
  children,
}: {
  cite?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={cn(className)}>
      <blockquote className="font-serif italic font-normal text-[clamp(1.4rem,2.7vw,1.9rem)] leading-[1.3] tracking-[-0.01em] text-ink">
        {children}
      </blockquote>
      {cite ? (
        <figcaption className="mt-4 font-sans text-sm text-muted">
          {cite}
        </figcaption>
      ) : null}
    </figure>
  );
}
