import { cn } from "@/lib/cn";

type StatColor = "accent" | "secondary" | "highlight" | "ink";

const colorClass: Record<StatColor, string> = {
  accent: "text-accent",
  secondary: "text-secondary",
  highlight: "text-highlight",
  ink: "text-ink",
};

/** Big Georgia feature number with an Inter label. */
export function Stat({
  value,
  label,
  color = "accent",
  className,
}: {
  value: React.ReactNode;
  label: string;
  color?: StatColor;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className={cn(
          "font-serif font-normal text-[clamp(2.2rem,5vw,3rem)] leading-none tracking-[-0.02em]",
          colorClass[color],
        )}
      >
        {value}
      </div>
      <div className="mt-2 font-sans text-sm text-muted">{label}</div>
    </div>
  );
}
