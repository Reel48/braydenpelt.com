"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { MoreMenu } from "@/components/nav/more-menu";
import { primaryNav, allNav } from "@/lib/nav";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-[1.2rem] tracking-[-0.01em] text-ink"
        >
          Brayden Pelt
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-1.5 font-sans text-sm transition-colors",
                isActive(pathname, item.href)
                  ? "text-ink"
                  : "text-muted hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <MoreMenu />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink sm:hidden"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </Container>

      {/* Mobile panel */}
      {mobileOpen ? (
        <Container className="sm:hidden">
          <nav className="grid grid-cols-2 gap-1 pb-4">
            {allNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 font-sans text-sm transition-colors",
                  isActive(pathname, item.href)
                    ? "bg-accent-soft text-accent-strong"
                    : "text-ink-soft hover:bg-canvas",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      ) : null}
    </header>
  );
}
