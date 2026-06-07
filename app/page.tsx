import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { Display } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkGrid } from "@/components/ui/link-grid";
import { ArtCarousel } from "@/components/art-carousel";
import { QuoteCarousel } from "@/components/quote-carousel";
import { profile } from "@/content/profile";
import { art } from "@/content/art";
import { quotes } from "@/content/quotes";
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

      {/* Art */}
      {art.length ? (
        <section className="pb-16">
          <ArtCarousel
            items={art.map((a) => ({
              title: a.title,
              artist: a.artist,
              image: a.image,
            }))}
          />
        </section>
      ) : null}

      {/* Quotes */}
      {quotes.length ? (
        <section className="pb-16">
          <QuoteCarousel
            items={quotes.map((q) => ({
              text: q.text,
              author: q.author,
              source: q.source,
            }))}
          />
        </section>
      ) : null}

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
