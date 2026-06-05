import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { LinkGrid } from "@/components/ui/link-grid";
import { nav } from "@/lib/nav";

export const metadata: Metadata = { title: "Resources" };

const resources = nav.find((i) => i.href === "/resources")?.children ?? [];

export default function ResourcesPage() {
  return (
    <Container>
      <PageHeader title="Resources" />
      <div className="pb-20">
        <LinkGrid items={resources} />
      </div>
    </Container>
  );
}
