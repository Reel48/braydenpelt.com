import { Fragment, type ReactNode } from "react";

/**
 * Minimal inline formatter for author-written prose fields (notes, descriptions,
 * summaries, quote sources). Two passes, no dependency, no nesting:
 *
 *   1. Smart quotes — straight quotes/apostrophes become curly per CMOS.
 *   2. Emphasis — `*italic*` becomes <em>, used for titles of works in prose.
 *
 * This is deliberately NOT markdown: no bold, links, code, or block elements.
 */

/** Convert straight quotes and apostrophes to curly equivalents (CMOS). */
function smartQuotes(text: string): string {
  return (
    text
      // Apostrophe between letters/digits: it's, Rome's, 'em won't catch — handled below.
      .replace(/(\w)'(\w)/g, "$1’$2")
      // Opening single quote: start, or after whitespace / opening bracket.
      .replace(/(^|[\s([{<—–-])'/g, "$1‘")
      // Any remaining single quote is a closing quote or apostrophe.
      .replace(/'/g, "’")
      // Opening double quote: start, or after whitespace / opening bracket.
      .replace(/(^|[\s([{<—–-])"/g, "$1“")
      // Any remaining double quote is a closing quote.
      .replace(/"/g, "”")
  );
}

/**
 * Render a prose string with curly quotes and `*italic*` emphasis.
 * Returns a ReactNode safe to drop into any text container.
 */
export function renderInline(text?: string): ReactNode {
  if (!text) return text ?? null;
  const quoted = smartQuotes(text);

  // Split on *...* spans; odd-indexed segments are the emphasized content.
  const parts = quoted.split(/\*([^*]+)\*/g);
  if (parts.length === 1) return quoted;

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="italic">
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
