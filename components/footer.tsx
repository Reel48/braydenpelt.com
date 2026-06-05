import Link from "next/link";
import { Container } from "@/components/ui/container";
import { nav } from "@/lib/nav";
import { profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <p className="font-serif text-[1.2rem] text-ink">{profile.name}</p>
          {profile.socials.length ? (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {profile.socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-muted transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {nav
          .filter((i) => i.href !== "/")
          .map((item) => (
            <nav key={item.href} className="flex flex-col gap-1.5">
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
            </nav>
          ))}
      </Container>
      <Container className="border-t border-border py-5">
        <p className="font-sans text-xs text-faint">
          © {year} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
