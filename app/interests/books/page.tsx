import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { LiveBadge } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { MediaCard } from "@/components/cards/media-card";
import { Reveal } from "@/components/ui/reveal";
import { books as manualBooks } from "@/content/books";
import { getGoodreadsBooks } from "@/lib/integrations/goodreads";

export const metadata: Metadata = { title: "Books" };

// Live Goodreads feed refreshes hourly (see content/integrations.ts).
export const revalidate = 3600;

export default async function BooksPage() {
  const live = await getGoodreadsBooks();
  const isLive = live.length > 0;
  const books = isLive ? live : manualBooks;

  return (
    <Container>
      <PageHeader kicker="Interests" title="Books">
        {isLive ? <LiveBadge source="Goodreads" /> : null}
      </PageHeader>

      {books.length === 0 ? (
        <EmptyState
          title="No books yet"
          hint="Connect your Goodreads shelf in content/integrations.ts, or add books manually."
          file="content/integrations.ts"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-20 sm:grid-cols-2">
          {books.map((b, i) => (
            <Reveal key={`${b.title}-${i}`} delay={Math.min(i, 6) * 60}>
              <MediaCard
                title={b.title}
                subtitle={b.author}
                meta={b.year}
                rating={b.rating}
                note={b.note}
                image={b.cover}
                href={b.link}
              />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  );
}
