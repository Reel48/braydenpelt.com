import Link from "next/link";
import { Container } from "@/components/ui/container";
import { nav } from "@/lib/nav";
import { profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-white/10 bg-secondary text-white">
      <Container className="py-10">
        {/* Mobile: simple one row of top-level pages */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm text-blue-200 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop: equal-width columns with subpages listed */}
        <nav
          className="hidden gap-8 md:grid"
          style={{
            gridTemplateColumns: `repeat(${nav.length}, minmax(0, 1fr))`,
          }}
        >
          {nav.map((item) => (
            <div key={item.href} className="flex flex-col gap-1.5">
              <Link
                href={item.href}
                className="font-sans text-sm font-medium text-white transition-colors hover:text-blue-200"
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="font-sans text-sm text-blue-200 transition-colors hover:text-white"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <p className="mt-8 text-center font-sans text-xs text-white/60">
          © {year} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
