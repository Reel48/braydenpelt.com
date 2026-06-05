import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ResourceList } from "@/components/cards/resource-list";
import { apis } from "@/content/resources";

export const metadata: Metadata = { title: "APIs" };

export default function ApisPage() {
  return (
    <Container>
      <PageHeader kicker="Resources" title="APIs" />
      <ResourceList items={apis} what="APIs" />
    </Container>
  );
}
