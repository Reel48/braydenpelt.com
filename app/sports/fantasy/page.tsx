import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { fantasy } from "@/content/fantasy";

export const metadata: Metadata = { title: "Fantasy" };

export default function FantasyPage() {
  return (
    <Container>
      <PageHeader kicker="Sports" title="Fantasy" />

      {fantasy.length === 0 ? (
        <EmptyState
          title="No leagues yet"
          hint="Add your fantasy leagues and results."
          file="content/fantasy.ts"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 pb-20 sm:grid-cols-2">
          {fantasy.map((f, i) => (
            <Card key={`${f.league}-${i}`}>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-serif text-[1.3rem] text-ink">
                  {f.league}
                </h2>
                {f.season ? (
                  <span className="font-sans text-sm text-muted tnum">
                    {f.season}
                  </span>
                ) : null}
              </div>
              {f.teamName ? (
                <p className="mt-0.5 font-sans text-sm text-accent">
                  {f.teamName}
                </p>
              ) : null}
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sans text-sm text-muted">
                {f.placement ? (
                  <span>
                    <span className="text-faint">Finish:</span> {f.placement}
                  </span>
                ) : null}
                {f.record ? (
                  <span className="tnum">
                    <span className="text-faint">Record:</span> {f.record}
                  </span>
                ) : null}
              </div>
              {f.note ? (
                <p className="mt-2 font-serif text-[1.05rem] leading-[1.6] text-ink-soft">
                  {f.note}
                </p>
              ) : null}
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
