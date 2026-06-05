"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

/**
 * Light/dark toggle. NOT mounted in the header yet — the site ships light-first.
 * When the dark token block in globals.css is tuned, render this in the Header.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      suppressHydrationWarning
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-ink",
        className,
      )}
    >
      <span suppressHydrationWarning>{isDark ? "☀" : "☾"}</span>
    </button>
  );
}
