import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { renderInline } from "@/lib/inline";
import type { Project } from "@/lib/types";
import { ArrowRight } from "@/components/ui/icons";
import { FadeImage } from "@/components/ui/fade-image";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden p-0 transition duration-200 hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 active:shadow-soft">
      {project.image ? (
        <FadeImage
          src={project.image}
          alt={project.title}
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <div className="aspect-[16/10] w-full bg-[linear-gradient(135deg,var(--color-blue-700),var(--color-blue-400))]" />
      )}
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-[1.2rem] text-ink">{project.title}</h3>
          {project.year ? (
            <span className="font-sans text-xs text-faint tnum">
              {project.year}
            </span>
          ) : null}
        </div>
        {project.role ? (
          <p className="mt-0.5 font-sans text-xs uppercase tracking-[0.06em] text-muted">
            {project.role}
          </p>
        ) : null}
        <p className="mt-2 font-serif text-[1rem] leading-[1.6] text-ink-soft">
          {renderInline(project.summary)}
        </p>
        {project.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : null}
        {project.url || project.repo ? (
          <div className="mt-4 flex gap-4 font-sans text-sm font-medium">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/visit inline-flex items-center gap-1 text-accent transition-colors hover:text-accent-strong"
              >
                Visit
                <ArrowRight className="transition-transform duration-200 group-hover/visit:translate-x-0.5" />
              </a>
            ) : null}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                Code
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
