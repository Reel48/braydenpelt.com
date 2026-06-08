import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { MediaCard } from "@/components/cards/media-card";
import { Reveal } from "@/components/ui/reveal";
import { videos } from "@/content/youtube";

export const metadata: Metadata = { title: "YouTube" };

export default function YouTubePage() {
  return (
    <Container>
      <PageHeader kicker="Media" title="YouTube" />

      {videos.length === 0 ? (
        <EmptyState
          title="No videos yet"
          hint="Add favorite videos (title + YouTube URL). A playlist auto-sync can be added later."
          file="content/youtube.ts"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-20 sm:grid-cols-2">
          {videos.map((v, i) => (
            <Reveal key={`${v.title}-${i}`} delay={Math.min(i, 6) * 60}>
              <MediaCard
                title={v.title}
                subtitle={v.channel}
                note={v.note}
                image={v.thumbnail}
                href={v.url}
              />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  );
}
