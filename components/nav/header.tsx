"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { nav, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { Close, Menu } from "@/components/ui/icons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Desktop top-level item — a link to its hub, with a hover/focus subnav if it has children. */
function DesktopItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href);
  const base =
    "rounded-full px-3 py-1.5 font-sans text-sm transition-colors inline-flex items-center gap-1";
  const tone = active ? "text-white" : "text-blue-200 hover:text-white";

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
      </Link>
      {/* pt-2 bridges the gap so the menu stays open while moving the cursor.
          Kept mounted and faded/slid in on hover/focus so it animates. */}
      <div className="invisible absolute left-0 top-full -translate-y-1 pt-2 opacity-0 transition duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
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

  // Close the menu whenever the route changes (covers back/forward too).
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // While the menu is open: lock background scroll, close on Escape, and
  // close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => {
      if (mq.matches) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    // The viewport scroller is <html>, so lock it (locking <body> alone does
    // not stop the root scroll).
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-white/10 bg-secondary/90 text-white backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-[1.2rem] tracking-[-0.01em] text-white"
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
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 md:hidden"
        >
          {mobileOpen ? <Close size={18} /> : <Menu size={18} />}
        </button>
      </Container>
      </header>

      {/* Mobile panel — full-height overlay below the bar; parents link to their
          hub with children beneath. Rendered outside <header> because the header's
          backdrop-filter would otherwise trap this fixed element. Solid background
          + locked body scroll so the page can't show or scroll behind it. */}
      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 animate-fade-in overflow-y-auto overscroll-contain bg-secondary md:hidden"
        >
          <Container>
            <nav className="flex flex-col gap-1 py-4">
            {nav.map((item, i) => (
              <div
                key={item.href}
                className="animate-fade-up py-1"
                style={
                  { "--reveal-delay": `${i * 40}ms` } as React.CSSProperties
                }
              >
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 font-sans text-sm font-medium transition-colors",
                    isActive(pathname, item.href)
                      ? "bg-accent-soft text-accent-strong"
                      : "text-white hover:bg-white/10",
                  )}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="mt-0.5 ml-3 flex flex-col border-l border-white/15 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "rounded-lg px-3 py-2 font-sans text-sm transition-colors",
                          isActive(pathname, child.href)
                            ? "font-medium text-white"
                            : "text-blue-200 hover:bg-white/10",
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
        </div>
      ) : null}
    </>
  );
}
