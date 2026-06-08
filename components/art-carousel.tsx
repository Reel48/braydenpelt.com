import { Carousel } from "@/components/ui/carousel";
import { LightboxImage } from "@/components/lightbox-image";

type ArtSlide = { title: string; artist?: string; image: string };

/** Home-page art gallery: swipe, click the arrows, or tap a painting to zoom. */
export function ArtCarousel({ items }: { items: ArtSlide[] }) {
  if (!items.length) return null;

  return (
    <Carousel title="Art" viewAllHref="/interests/art">
      {items.map((piece, i) => (
        <figure
          key={`${piece.title}-${i}`}
          className="w-[clamp(260px,78vw,400px)] shrink-0 snap-start"
        >
          <div className="group/art overflow-hidden rounded-[10px] shadow-art">
            <LightboxImage
              src={piece.image}
              alt={piece.title}
              className="h-[clamp(240px,42vh,340px)] w-full object-cover transition-transform duration-500 ease-out group-hover/art:scale-[1.03]"
            />
          </div>
          <figcaption className="mt-3 leading-snug">
            <span className="font-serif italic text-[1.05rem] text-ink">
              {piece.title}
            </span>
            {piece.artist ? (
              <span className="font-sans text-sm text-muted"> · {piece.artist}</span>
            ) : null}
          </figcaption>
        </figure>
      ))}
    </Carousel>
  );
}
