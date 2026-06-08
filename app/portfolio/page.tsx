import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectCard } from "@/components/cards/project-card";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/content/portfolio";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <Container>
      <PageHeader kicker="About" title="Portfolio" />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          hint="Add the work you’re proud of — each gets a card with tags and links."
          file="content/portfolio.ts"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug ?? `${p.title}-${i}`} delay={Math.min(i, 6) * 60}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  );
}
