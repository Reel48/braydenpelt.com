import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { teams } from "@/content/teams";

export const metadata: Metadata = { title: "Favorite Teams" };

export default function TeamsPage() {
  return (
    <Container>
      <PageHeader kicker="Sports" title="Favorite Teams" />

      {teams.length === 0 ? (
        <EmptyState
          title="No teams yet"
          hint="Add the teams you root for."
          file="content/teams.ts"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 pb-20 sm:grid-cols-2">
          {teams.map((t, i) => {
            const meta = [t.league, t.sport].filter(Boolean).join(" · ");
            return (
              <Card key={`${t.name}-${i}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-serif text-[1.3rem] text-ink">{t.name}</h2>
                  {t.since ? (
                    <span className="font-sans text-sm text-muted tnum">
                      since {t.since}
                    </span>
                  ) : null}
                </div>
                {meta ? (
                  <p className="mt-0.5 font-sans text-sm text-accent">{meta}</p>
                ) : null}
                {t.note ? (
                  <p className="mt-2 font-serif text-[1.05rem] leading-[1.6] text-ink-soft">
                    {t.note}
                  </p>
                ) : null}
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}
