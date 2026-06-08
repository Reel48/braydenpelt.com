import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { Display, Heading } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";
import { Quote } from "@/components/ui/quote";
import { Stat } from "@/components/ui/stat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { EmptyState } from "@/components/ui/empty-state";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Close,
  Menu,
} from "@/components/ui/icons";

export const metadata: Metadata = { title: "Design System" };

type Swatch = { name: string; hex: string };

const foundation: Swatch[] = [
  { name: "Pure White", hex: "#FFFFFF" },
  { name: "Light Grey", hex: "#ECECEA" },
  { name: "Charcoal", hex: "#1F1F1F" },
];

const blue: Swatch[] = [
  { name: "Sky", hex: "#DCE6F6" },
  { name: "Azure", hex: "#3D78D6" },
  { name: "Signature Blue", hex: "#0A4FB4" },
  { name: "Deep Navy", hex: "#0A2A5E" },
];

const grey: Swatch[] = [
  { name: "50", hex: "#F6F6F5" },
  { name: "100", hex: "#ECECEA" },
  { name: "200", hex: "#DEDEDB" },
  { name: "300", hex: "#CACAC6" },
  { name: "400", hex: "#ADADA8" },
  { name: "500", hex: "#8C8C87" },
  { name: "600", hex: "#6A6A65" },
  { name: "700", hex: "#4A4A47" },
  { name: "800", hex: "#30302E" },
  { name: "900", hex: "#1F1F1F" },
];

function Ramp({ swatches }: { swatches: Swatch[] }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
      {swatches.map((s) => (
        <div
          key={s.name + s.hex}
          className="overflow-hidden rounded-[10px] border border-border bg-surface"
        >
          <div className="aspect-[5/3]" style={{ backgroundColor: s.hex }} />
          <div className="px-2 py-1.5">
            <p className="font-sans text-[0.72rem] font-semibold text-ink">
              {s.name}
            </p>
            <p className="font-sans text-[0.66rem] text-muted tnum">{s.hex}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SpecRow({
  tag,
  meta,
  children,
}: {
  tag: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-dashed border-border py-6 last:border-0">
      <p className="mb-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-accent">
        {tag}
      </p>
      {children}
      <p className="mt-2 font-sans text-[0.74rem] text-faint">{meta}</p>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <Container>
      <PageHeader
        kicker="Color System"
        title="Design System"
        intro="The living source of truth — palette, type, and components. Built from the same tokens the whole site uses."
      />

      {/* PALETTE */}
      <Section title="Palette">
        <div className="space-y-7">
          <div>
            <h3 className="mb-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-faint">
              Foundation — walls, surfaces, type
            </h3>
            <Ramp swatches={foundation} />
          </div>
          <div>
            <h3 className="mb-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-faint">
              Blue — signature color
            </h3>
            <Ramp swatches={blue} />
          </div>
          <div>
            <h3 className="mb-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-faint">
              Grey — neutral ramp
            </h3>
            <Ramp swatches={grey} />
          </div>
        </div>
      </Section>

      {/* TYPE */}
      <Section title="Typography">
        <SpecRow tag="Display · Georgia" meta="clamp(2.75–4.75rem) · 1.05 · −0.02em">
          <Display>Brayden Pelt</Display>
        </SpecRow>
        <SpecRow tag="H1 · Georgia" meta="clamp(2.25–3.25rem) · 1.1 · −0.015em">
          <Heading level={1}>A heading at level one</Heading>
        </SpecRow>
        <SpecRow tag="H2 · Georgia" meta="clamp(1.75–2.25rem) · 1.15 · −0.01em">
          <Heading level={2}>A heading at level two</Heading>
        </SpecRow>
        <SpecRow tag="H3 · Georgia" meta="1.5rem · 1.2 · −0.005em">
          <Heading level={3}>A heading at level three</Heading>
        </SpecRow>
        <SpecRow tag="H4 · Georgia bold" meta="1.25rem · 1.3 · 700">
          <Heading level={4}>A heading at level four</Heading>
        </SpecRow>
        <SpecRow tag="Lead · Georgia" meta="1.3rem · 1.6 · max 60ch">
          <Lead>
            A larger opening paragraph that draws the reader in, set in Georgia
            for warmth.
          </Lead>
        </SpecRow>
        <SpecRow tag="Body · Georgia" meta="1.125rem · 1.7 · max 68ch · italic emphasis">
          <p className="max-w-[68ch] font-serif text-[1.125rem] leading-[1.7] text-ink-soft">
            Long-form reading set in Georgia. Emphasis arrives through{" "}
            <em className="italic">true italics</em> rather than bold weight, and
            links use the <span className="text-accent">blue accent</span>.
          </p>
        </SpecRow>
        <SpecRow tag="Pull-quote · Georgia italic" meta="clamp(1.4–1.9rem) · 1.3">
          <Quote cite={<>— Specimen</>}>
            The best way to predict the future is to invent it.
          </Quote>
        </SpecRow>
        <SpecRow tag="Kicker · Inter" meta="0.8rem · UPPERCASE · +0.1em · 500">
          <Kicker>Research · 8 min read</Kicker>
        </SpecRow>
        <SpecRow tag="Feature number · Georgia + Inter label" meta="data → Inter tnum">
          <div className="flex flex-wrap gap-10">
            <Stat value="1.2M" label="Words written" />
            <Stat value="42" label="Articles" color="secondary" />
            <Stat value="18" label="Projects" color="highlight" />
          </div>
        </SpecRow>
      </Section>

      {/* COMPONENTS */}
      <Section title="Components">
        <div className="space-y-8 pb-20">
          <div>
            <h3 className="mb-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-faint">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button href="#">Primary</Button>
              <Button href="#" variant="ghost">
                Ghost
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-faint">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              <Tag>Blue</Tag>
              <Tag tone="sage">Grey</Tag>
              <Tag tone="neutral">Neutral</Tag>
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-faint">
              Icons — inline SVG, currentColor, stroke 2
            </h3>
            <div className="flex flex-wrap items-center gap-5 text-ink">
              {(
                [
                  ["ArrowRight", ArrowRight],
                  ["ArrowUpRight", ArrowUpRight],
                  ["ArrowLeft", ArrowLeft],
                  ["ChevronDown", ChevronDown],
                  ["ChevronLeft", ChevronLeft],
                  ["ChevronRight", ChevronRight],
                  ["Close", Close],
                  ["Menu", Menu],
                ] as const
              ).map(([name, Glyph]) => (
                <div key={name} className="flex flex-col items-center gap-1.5">
                  <Glyph size={20} />
                  <span className="font-sans text-[0.66rem] text-muted">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-faint">
              Elevation
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {(
                [
                  ["shadow-soft", "Cards at rest"],
                  ["shadow-lift", "Interactive hover"],
                  ["shadow-art", "Frameless paintings"],
                ] as const
              ).map(([cls, label]) => (
                <div
                  key={cls}
                  className={`rounded-[14px] bg-surface p-5 ${cls}`}
                >
                  <p className="font-sans text-[0.8rem] font-semibold text-ink">
                    {cls}
                  </p>
                  <p className="mt-0.5 font-sans text-[0.72rem] text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-faint">
              Card
            </h3>
            <Card className="max-w-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lift">
              <Heading level={3}>Card title</Heading>
              <p className="mt-2 font-serif text-[1rem] leading-[1.6] text-ink-soft">
                A surface for grouped content — used across portfolio, quotes, and
                more. Hover to see the lift.
              </p>
            </Card>
          </div>
          <div>
            <h3 className="mb-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-faint">
              Empty state
            </h3>
            <EmptyState
              title="No items yet"
              hint="This is the pattern every page uses before its content is added."
              file="content/example.ts"
            />
          </div>
        </div>
      </Section>
    </Container>
  );
}
