"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { moreNav } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function MoreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = moreNav.some((i) => pathname.startsWith(i.href));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-sans text-sm transition-colors",
          isActive ? "text-ink" : "text-muted hover:text-ink",
        )}
      >
        More
        <span aria-hidden className={cn("transition-transform", open && "rotate-180")}>
          ⌄
        </span>
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 min-w-[10rem] rounded-[12px] border border-border bg-surface p-1.5 shadow-soft"
        >
          {moreNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2 font-sans text-sm transition-colors",
                  active
                    ? "bg-accent-soft text-accent-strong"
                    : "text-ink-soft hover:bg-canvas",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
