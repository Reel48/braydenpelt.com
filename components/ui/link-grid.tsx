import Link from "next/link";
import { sectionForPath, type NavItem } from "@/lib/nav";

/**
 * A grid of large link cards — used by the home page and category hubs.
 * Each tile is themed by its destination's section (via data-section), so the
 * home grid reads as a multicolor index while hub children stay one hue.
 */
export function LinkGrid({ items }: { items: NavItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          data-section={sectionForPath(item.href)}
          className="group flex items-center justify-between rounded-[14px] border border-card-border bg-card px-5 py-5 shadow-soft transition-colors hover:border-accent"
        >
          <span className="font-serif text-[1.25rem] text-accent-strong">
            {item.label}
          </span>
          <span
            aria-hidden
            className="font-sans text-accent transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
