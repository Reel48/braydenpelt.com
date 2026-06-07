"use client";

import { usePathname } from "next/navigation";
import { sectionForPath } from "@/lib/nav";

/**
 * Sets `data-section` on a display:contents wrapper so the per-section accent
 * overrides in globals.css cascade to the header, page, and selection. The
 * wrapper adds no box, so the body's flex layout is preserved.
 */
export function SectionTheme({ children }: { children: React.ReactNode }) {
  const section = sectionForPath(usePathname());
  return (
    <div className="contents" data-section={section}>
      {children}
    </div>
  );
}
