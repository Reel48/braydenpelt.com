"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Dark-ready theme wiring. Ships light-only for now (dark tokens in
 * globals.css are commented out and there's no visible toggle yet).
 * When dark is tuned: uncomment the [data-theme="dark"] block in
 * globals.css, drop in a <ThemeToggle/>, and flip `enableSystem` if desired.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
