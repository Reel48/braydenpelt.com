import Link from "next/link";
import { Container } from "@/components/ui/container";
import { nav } from "@/lib/nav";
import { profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <Container className="py-10">
        {/* Mobile: simple one row of top-level pages */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop: columns with subpages listed */}
        <nav className="hidden justify-center gap-x-12 gap-y-8 md:flex md:flex-wrap">
          {nav.map((item) => (
            <div key={item.href} className="flex flex-col gap-1.5">
              <Link
                href={item.href}
                className="font-sans text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="font-sans text-sm text-muted transition-colors hover:text-ink"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <p className="mt-8 text-center font-sans text-xs text-faint">
          © {year} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
