import type { SVGProps } from "react";

/**
 * Inline-SVG icon set. Each icon draws with `currentColor` at
 * `stroke-width={2}`, so it inherits the text color and any color/transform
 * transitions of its parent link. Short, chunky proportions — a deliberate
 * replacement for the thin, elongated Unicode arrow glyphs (→ ↗ ↓ ← ✕).
 */

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function Icon({ size = 16, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return <svg width={size} height={size} {...base} {...props} />;
}

export function ArrowRight(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon {...props}>
      <path d="M5 12h13" />
      <path d="M13 6l6 6-6 6" />
    </Icon>
  );
}

export function ArrowUpRight(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Icon>
  );
}

export function ChevronDown(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon {...props}>
      <path d="M6 9l6 6 6-6" />
    </Icon>
  );
}

export function ChevronLeft(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon {...props}>
      <path d="M15 6l-6 6 6 6" />
    </Icon>
  );
}

export function ChevronRight(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon {...props}>
      <path d="M9 6l6 6-6 6" />
    </Icon>
  );
}

export function ArrowLeft(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon {...props}>
      <path d="M19 12H6" />
      <path d="M11 6l-6 6 6 6" />
    </Icon>
  );
}

export function Close(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </Icon>
  );
}

export function Menu(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </Icon>
  );
}
