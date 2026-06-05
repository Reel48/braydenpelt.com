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
  {
    title: "The Battle of Alexander at Issus",
    artist: "Albrecht Altdorfer, German",
    medium: "Oil on panel",
    year: "1529",
    image: "/images/art/battle-of-issus.jpg",
    url: "https://en.wikipedia.org/wiki/The_Battle_of_Alexander_at_Issus",
    note: "Altdorfer's masterpiece depicts Alexander the Great's 333 BC victory over Darius III of Persia as a vast 'world landscape,' with thousands of tiny soldiers swirling beneath a cosmic sky. Commissioned by Duke William IV of Bavaria, it dresses the armies in 16th-century and Ottoman garb, drawing a deliberate parallel between Alexander's campaign and the contemporary European conflict with the Turks.",
  },
  {
    title: "Nighthawks",
    artist: "Edward Hopper, American",
    medium: "Oil on canvas",
    year: "1942",
    image: "/images/art/nighthawks.jpg",
    url: "https://www.artic.edu/artworks/111628/nighthawks",
    note: "Inside a fluorescent-lit all-night diner, three customers and a server sit absorbed in their own thoughts, framed by a sweep of plate glass and an empty street. With spare geometry and no visible door to the outside, Hopper distilled what he called 'the loneliness of a large city' — though it was loosely inspired by a restaurant on Greenwich Avenue in New York.",
  },
  {
    title: "Café Terrace at Night",
    artist: "Vincent van Gogh, Dutch",
    medium: "Oil on canvas",
    year: "1888",
    image: "/images/art/cafe-terrace-at-night.jpg",
    url: "https://krollermuller.nl/en/vincent-van-gogh-terrace-of-a-cafe-at-night-place-du-forum-1",
    note: "Painted on the Place du Forum in Arles in September 1888, this is the first of Van Gogh's starry-night scenes — a café terrace glowing warm yellow and orange against a deep blue, star-filled sky. Famously, he rendered the entire night without using any black paint, and the constellations overhead appear as they actually did on the night he worked.",
  },
];
