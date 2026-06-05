import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { LinkGrid } from "@/components/ui/link-grid";
import { nav } from "@/lib/nav";

export const metadata: Metadata = { title: "Sports" };

const sports = nav.find((i) => i.href === "/sports")?.children ?? [];

export default function SportsPage() {
  return (
    <Container>
      <PageHeader title="Sports" />
      <div className="pb-20">
        <LinkGrid items={sports} />
      </div>
    </Container>
  );
}
