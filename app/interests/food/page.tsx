import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { MediaCard } from "@/components/cards/media-card";
import { Reveal } from "@/components/ui/reveal";
import { places } from "@/content/food";

export const metadata: Metadata = { title: "Food & Drinks" };

export default function FoodPage() {
  return (
    <Container>
      <PageHeader kicker="Interests" title="Food & Drinks" />

      {places.length === 0 ? (
        <EmptyState
          title="No places yet"
          hint="Add the spots you love. (Beli has no public API yet, so this is manual for now.)"
          file="content/food.ts"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-20 sm:grid-cols-2">
          {places.map((p, i) => (
            <Reveal key={`${p.name}-${i}`} delay={Math.min(i, 6) * 60}>
              <MediaCard
                title={p.name}
                subtitle={p.cuisine}
                meta={p.city}
                rating={p.rating}
                note={p.note}
                image={p.image}
                href={p.url}
              />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  );
}
