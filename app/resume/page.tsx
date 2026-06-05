import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { TimelineItem } from "@/components/cards/timeline-item";
import { work, education } from "@/content/work";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  const hasAny = work.length > 0 || education.length > 0;

  return (
    <Container>
      <PageHeader kicker="About" title="Resume" />

      {!hasAny ? (
        <EmptyState
          title="Nothing here yet"
          hint="Add your roles and education entries."
          file="content/work.ts"
        />
      ) : (
        <div className="pb-20">
          {work.length ? (
            <Section title="Experience">
              <ol className="mt-2">
                {work.map((w, i) => (
                  <TimelineItem
                    key={`${w.organization}-${i}`}
                    title={w.role}
                    subtitle={w.organization}
                    location={w.location}
                    period={`${w.start} – ${w.end ?? "Present"}`}
                    summary={w.summary}
                    highlights={w.highlights}
                  />
                ))}
              </ol>
            </Section>
          ) : null}

          {education.length ? (
            <Section title="Education">
              <ol className="mt-2">
                {education.map((e, i) => (
                  <TimelineItem
                    key={`${e.institution}-${i}`}
                    title={e.credential}
                    subtitle={e.institution}
                    location={e.location}
                    period={e.end ? `${e.start} – ${e.end}` : e.start}
                    summary={e.field}
                    highlights={e.notes ? [e.notes] : undefined}
                  />
                ))}
              </ol>
            </Section>
          ) : null}
        </div>
      )}
    </Container>
  );
}
