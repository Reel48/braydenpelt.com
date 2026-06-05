import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { Quote } from "@/components/ui/quote";
import { Stat } from "@/components/ui/stat";
import { DataFigure } from "@/components/mdx/data-figure";

const proseText = "font-serif text-[1.125rem] leading-[1.7] text-ink-soft";

/** Element + custom-component mapping for article MDX. */
export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <Heading level={1} className="mt-12 mb-4" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <Heading level={2} className="mt-10 mb-3" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <Heading level={3} className="mt-8 mb-2" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <Heading level={4} className="mt-6 mb-2" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className={`${proseText} my-5`} {...props} />
  ),
  a: ({ href = "#", ...props }: ComponentPropsWithoutRef<"a">) => (
    <Link
      href={href}
      className="text-accent underline decoration-from-font underline-offset-[3px]"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={`${proseText} my-5 list-disc pl-6 marker:text-faint`}
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={`${proseText} my-5 list-decimal pl-6 marker:text-faint`}
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="my-1.5" {...props} />
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <Quote className="my-8">{children}</Quote>
  ),
  hr: () => <hr className="my-10 border-border" />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded border border-border bg-canvas px-1.5 py-0.5 font-mono text-[0.9em]"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-[10px] border border-border bg-surface-2 p-4 font-mono text-sm"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse font-sans text-sm tnum"
        {...props}
      />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-border px-3 py-2 text-left font-semibold text-faint"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-border px-3 py-2 text-ink-soft" {...props} />
  ),
  // Custom components available inside MDX:
  DataFigure,
  Stat,
};
