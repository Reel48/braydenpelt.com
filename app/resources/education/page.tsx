import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ResourceList } from "@/components/cards/resource-list";
import { education } from "@/content/resources";

export const metadata: Metadata = { title: "Education" };

export default function EducationPage() {
  return (
    <Container>
      <PageHeader kicker="Resources" title="Education" />
      <ResourceList items={education} what="education resources" />
    </Container>
  );
}
