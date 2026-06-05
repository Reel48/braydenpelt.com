import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { Display } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkGrid } from "@/components/ui/link-grid";
import { profile } from "@/content/profile";
import { exploreNav } from "@/lib/nav";

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
          <Button href="/interests/articles" variant="ghost">
            Read articles
          </Button>
        </div>
      </section>

      {/* Explore */}
      <section className="pb-20">
        <p className="mb-5 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-faint">
          Explore
        </p>
        <LinkGrid items={exploreNav} />
      </section>
    </Container>
  );
}
