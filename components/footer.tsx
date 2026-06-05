import Link from "next/link";
import { Container } from "@/components/ui/container";
import { allNav } from "@/lib/nav";
import { profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
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

        <nav className="grid grid-cols-2 gap-x-10 gap-y-1.5">
          {allNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="border-t border-border py-5">
        <p className="font-sans text-xs text-faint">
          © {year} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
