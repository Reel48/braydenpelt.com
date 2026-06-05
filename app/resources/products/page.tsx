import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ResourceList } from "@/components/cards/resource-list";
import { products } from "@/content/resources";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <Container>
      <PageHeader kicker="Resources" title="Products" />
      <ResourceList items={products} what="products" />
    </Container>
  );
}
