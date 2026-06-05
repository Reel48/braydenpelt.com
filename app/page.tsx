import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { Display } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { profile } from "@/content/profile";
import { primaryNav, moreNav } from "@/lib/nav";

// Everything except Home — the places to explore from the landing page.
const explore = [...primaryNav.filter((i) => i.href !== "/"), ...moreNav];

export default function HomePage() {
  return (
    <Container>
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        {profile.descriptors.length ? (
          <Kicker className="mb-4">{profile.descriptors.join(" · ")}</Kicker>
        ) : null}
        <Display>{profile.name}</Display>

        {profile.tagline ? (
          <Lead className="mt-6">{profile.tagline}</Lead>
        ) : (
          <EmptyState
            className="mt-8 max-w-xl text-left"
            title="Your tagline goes here"
            hint="Write a single line in your own voice — and optional kicker words like “Researcher · Builder · Writer.”"
            file="content/profile.ts"
          />
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/portfolio">View work</Button>
          <Button href="/writing" variant="ghost">
            Read articles
          </Button>
        </div>
      </section>

      {/* Explore */}
      <section className="pb-20">
        <p className="mb-5 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-faint">
          Explore
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {explore.map((item) => (
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
      </section>
    </Container>
  );
}
