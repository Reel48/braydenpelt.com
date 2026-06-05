import type { ArtPiece } from "@/lib/types";

/**
 * Your art. Shape (image required — art is visual):
 *   { title, artist?, medium?, year?, note?, image, url? }
 * `image` is a path under /public, e.g. "/images/art/piece.jpg".
 */
export const art: ArtPiece[] = [
  {
    title: "Modern Rome",
    artist: "Giovanni Paolo Panini, Italian",
    medium: "Oil on canvas",
    year: "1757",
    image: "/images/art/modern-rome.jpg",
    url: "https://www.metmuseum.org/art/collection/search/437245",
    note: "A pendant to Panini's Ancient Rome, this monumental capriccio imagines a grand picture gallery whose walls are hung with views of Rome's most celebrated monuments from the two centuries before it was painted — among them Michelangelo's Moses and sculptures by Gian Lorenzo Bernini. An earlier version was commissioned by the comte de Stainville, later duc de Choiseul, the French ambassador to Rome, who is shown seated at the center.",
  },
];
