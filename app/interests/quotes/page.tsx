import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { QuoteEntry } from "@/components/cards/quote-entry";
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
        <div className="pb-20">
          {quotes.map((q, i) => (
            <QuoteEntry
              key={`${q.author}-${i}`}
              quote={q}
              className="border-t border-border py-9 first:border-t-0 first:pt-2"
            />
          ))}
        </div>
      )}
    </Container>
  );
}
