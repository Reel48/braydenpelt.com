import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ResourceList } from "@/components/cards/resource-list";
import { companies } from "@/content/resources";

export const metadata: Metadata = { title: "Companies" };

export default function CompaniesPage() {
  return (
    <Container>
      <PageHeader kicker="Resources" title="Companies" />
      <ResourceList items={companies} what="companies" />
    </Container>
  );
}
