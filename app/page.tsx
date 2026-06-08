import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { Display } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ArtCarousel } from "@/components/art-carousel";
import { QuoteCarousel } from "@/components/quote-carousel";
import { HomeResume } from "@/components/home-resume";
import { profile } from "@/content/profile";
import { art } from "@/content/art";
import { quotes } from "@/content/quotes";
import { work, education } from "@/content/work";

export default function HomePage() {
  return (
    <Container>
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        {profile.descriptors.length ? (
          <Kicker className="mb-4">{profile.descriptors.join(" · ")}</Kicker>
        ) : null}
        <Display>{profile.name}</Display>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/portfolio">View work</Button>
          <Button href="/interests/articles" variant="ghost">
            Read articles
          </Button>
        </div>
      </section>

      {/* Resume */}
      <Reveal>
        <HomeResume work={work} education={education} />
      </Reveal>

      {/* Art */}
      {art.length ? (
        <Reveal as="section" className="pb-16">
          <ArtCarousel
            items={art.map((a) => ({
              title: a.title,
              artist: a.artist,
              image: a.image,
            }))}
          />
        </Reveal>
      ) : null}

      {/* Quotes */}
      {quotes.length ? (
        <Reveal as="section" className="pb-16">
          <QuoteCarousel
            items={quotes.map((q) => ({
              text: q.text,
              author: q.author,
              source: q.source,
            }))}
          />
        </Reveal>
      ) : null}
    </Container>
  );
}
