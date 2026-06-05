import { cn } from "@/lib/cn";

type Tone = "blue" | "sage" | "gold" | "neutral";

const tones: Record<Tone, string> = {
  blue: "bg-blue-100 text-blue-700",
  sage: "bg-sage-100 text-sage-700",
  gold: "bg-[color-mix(in_srgb,var(--color-gold)_22%,#fff)] text-[#7a661f]",
  neutral: "bg-canvas text-muted border border-border",
};

export function Tag({
  tone = "blue",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full font-sans text-[0.68rem] font-medium px-2 py-0.5 tracking-[0.02em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
