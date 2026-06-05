import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { QuoteCard } from "@/components/cards/quote-card";
import { quotes } from "@/content/quotes";

export const metadata: Metadata = { title: "Quotes" };

export default function QuotesPage() {
  return (
    <Container>
      <PageHeader kicker="Interests" title="Quotes" />

      {quotes.length === 0 ? (
        <EmptyState
          title="No quotes yet"
          hint="Collect the words that have stuck with you."
          file="content/quotes.ts"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 pb-20 sm:grid-cols-2">
          {quotes.map((q, i) => (
            <QuoteCard key={`${q.author}-${i}`} quote={q} />
          ))}
        </div>
      )}
    </Container>
  );
}
