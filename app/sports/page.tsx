import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { sports } from "@/content/sports";

export const metadata: Metadata = { title: "Sports" };

export default function SportsPage() {
  return (
    <Container>
      <PageHeader title="Sports" />

      {sports.length === 0 ? (
        <EmptyState
          title="No sports added yet"
          hint="Add the sports you play — teams, roles, and moments worth remembering."
          file="content/sports.ts"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 pb-20 sm:grid-cols-2">
          {sports.map((s, i) => {
            const meta = [s.role, s.team].filter(Boolean).join(" · ");
            return (
              <Card key={`${s.sport}-${i}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-serif text-[1.3rem] text-ink">
                    {s.sport}
                  </h2>
                  {s.period ? (
                    <span className="font-sans text-sm text-muted tnum">
                      {s.period}
                    </span>
                  ) : null}
                </div>
                {meta ? (
                  <p className="mt-0.5 font-sans text-sm text-accent">{meta}</p>
                ) : null}
                {s.note ? (
                  <p className="mt-2 font-serif text-[1.05rem] leading-[1.6] text-ink-soft">
                    {s.note}
                  </p>
                ) : null}
                {s.achievements?.length ? (
                  <ul className="mt-3 list-disc pl-5 font-serif text-[1rem] leading-[1.6] text-ink-soft marker:text-secondary">
                    {s.achievements.map((a, j) => (
                      <li key={j} className="my-1">
                        {a}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}
