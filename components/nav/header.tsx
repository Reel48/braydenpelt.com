"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { nav, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Desktop top-level item — a link to its hub, with a hover/focus subnav if it has children. */
function DesktopItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href);
  const base =
    "rounded-full px-3 py-1.5 font-sans text-sm transition-colors inline-flex items-center gap-1";
  const tone = active ? "text-ink" : "text-muted hover:text-ink";

  if (!item.children) {
    return (
      <Link href={item.href} className={cn(base, tone)}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link href={item.href} className={cn(base, tone)} aria-haspopup="menu">
        {item.label}
        <span
          aria-hidden
          className="text-faint transition-transform group-hover:rotate-180"
        >
          ⌄
        </span>
      </Link>
      {/* pt-2 bridges the gap so the menu stays open while moving the cursor */}
      <div className="absolute left-0 top-full hidden pt-2 group-hover:block group-focus-within:block">
        <div
          role="menu"
          className="min-w-[13rem] rounded-[12px] border border-border bg-surface p-1.5 shadow-soft"
        >
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              className={cn(
                "block rounded-lg px-3 py-2 font-sans text-sm transition-colors",
                isActive(pathname, child.href)
                  ? "bg-accent-soft text-accent-strong"
                  : "text-ink-soft hover:bg-canvas",
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
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
        <nav className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <DesktopItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink md:hidden"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </Container>

      {/* Mobile panel — parents shown as headings (links to hub) with children beneath */}
      {mobileOpen ? (
        <Container className="md:hidden">
          <nav className="flex flex-col gap-1 pb-5">
            {nav.map((item) => (
              <div key={item.href} className="py-1">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 font-sans text-sm font-medium transition-colors",
                    isActive(pathname, item.href)
                      ? "bg-accent-soft text-accent-strong"
                      : "text-ink hover:bg-canvas",
                  )}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="mt-0.5 ml-3 flex flex-col border-l border-border pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "rounded-lg px-3 py-2 font-sans text-sm transition-colors",
                          isActive(pathname, child.href)
                            ? "text-accent-strong"
                            : "text-ink-soft hover:bg-canvas",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </Container>
      ) : null}
    </header>
  );
}
