import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { LinkGrid } from "@/components/ui/link-grid";
import { nav } from "@/lib/nav";

export const metadata: Metadata = { title: "Interests" };

const interests = nav.find((i) => i.href === "/interests")?.children ?? [];

export default function InterestsPage() {
  return (
    <Container>
      <PageHeader title="Interests" />
      <div className="pb-20">
        <LinkGrid items={interests} />
      </div>
    </Container>
  );
}
