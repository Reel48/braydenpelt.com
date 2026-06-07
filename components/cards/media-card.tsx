import { cn } from "@/lib/cn";
import { renderInline } from "@/lib/inline";

/** Compact rating, e.g. ★★★★☆ for n out of 5. */
function Rating({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <span aria-label={`${value} out of 5`} className="text-highlight">
      {"★".repeat(full)}
      <span className="text-border-strong">{"★".repeat(Math.max(0, 5 - full))}</span>
    </span>
  );
}

/**
 * Generic media tile, reused for books / movies / shows / music.
 * The parent page maps each list's fields onto these slots.
 */
export function MediaCard({
  title,
  titleStyle = "italic",
  subtitle,
  meta,
  note,
  image,
  rating,
  href,
  className,
}: {
  title: string;
  /** How the title renders: italic (books, films, albums), "quoted" (songs), or plain (artists). */
  titleStyle?: "italic" | "quoted" | "plain";
  subtitle?: string;
  meta?: string;
  note?: string;
  image?: string;
  rating?: number;
  href?: string;
  className?: string;
}) {
  const inner = (
    <div
      className={cn(
        "flex h-full gap-4 rounded-[14px] border border-card-border bg-card p-4 shadow-soft transition-colors",
        href && "hover:border-accent",
        className,
      )}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={title}
          className="h-24 w-16 flex-none rounded-md object-cover"
        />
      ) : null}
      <div className="min-w-0">
        <h3 className="font-serif text-[1.1rem] leading-snug text-ink">
          {titleStyle === "italic" ? (
            <em className="italic">{title}</em>
          ) : titleStyle === "quoted" ? (
            <>&ldquo;{title}&rdquo;</>
          ) : (
            title
          )}
        </h3>
        {subtitle ? (
          <p className="font-sans text-sm text-muted">{subtitle}</p>
        ) : null}
        <div className="mt-1 flex items-center gap-2 font-sans text-xs text-faint">
          {rating != null ? <Rating value={rating} /> : null}
          {meta ? <span className="tnum">{meta}</span> : null}
        </div>
        {note ? (
          <p className="mt-2 font-serif text-[0.95rem] leading-[1.5] text-ink-soft">
            {renderInline(note)}
          </p>
        ) : null}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}
