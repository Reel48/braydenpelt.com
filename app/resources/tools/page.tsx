import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ResourceList } from "@/components/cards/resource-list";
import { tools } from "@/content/resources";

export const metadata: Metadata = { title: "Tools" };

export default function ToolsPage() {
  return (
    <Container>
      <PageHeader kicker="Resources" title="Tools" />
      <ResourceList items={tools} what="tools" />
    </Container>
  );
}
