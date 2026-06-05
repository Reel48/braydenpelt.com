import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { LinkGrid } from "@/components/ui/link-grid";
import { nav } from "@/lib/nav";

export const metadata: Metadata = { title: "About" };

const about = nav.find((i) => i.href === "/about")?.children ?? [];

export default function AboutPage() {
  return (
    <Container>
      <PageHeader title="About" />
      <div className="pb-20">
        <LinkGrid items={about} />
      </div>
    </Container>
  );
}
