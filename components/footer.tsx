import Link from "next/link";
import { Container } from "@/components/ui/container";
import { nav } from "@/lib/nav";
import { profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <Container className="py-8">
        {/* Top-level pages, all on one row for quick selection */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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

        <p className="mt-6 text-center font-sans text-xs text-faint">
          © {year} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
