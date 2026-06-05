import Link from "next/link";
import type { NavItem } from "@/lib/nav";

/** A grid of large link cards — used by the home page and category hubs. */
export function LinkGrid({ items }: { items: NavItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex items-center justify-between rounded-[14px] border border-border bg-surface px-5 py-5 shadow-soft transition-colors hover:border-accent"
        >
          <span className="font-serif text-[1.25rem] text-ink">
            {item.label}
          </span>
          <span
            aria-hidden
            className="font-sans text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
          >
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
