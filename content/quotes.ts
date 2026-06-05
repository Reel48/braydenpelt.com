import type { Quote } from "@/lib/types";

/**
 * Your favorite quotes. Add objects of the shape:
 *   { text: "…", author: "…", source?: "…", note?: "why it resonates" }
 */
export const quotes: Quote[] = [
  {
    text: "It is amazing what you can accomplish if you do not care who gets the credit.",
    author: "Harry S. Truman",
  },
  {
    text: "Whenever you find yourself on the side of the majority, it is time to reform.",
    author: "Mark Twain",
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas A. Edison",
  },
  {
    text: "Of course it is happening inside your head, Harry, but why on earth should that mean that it is not real?",
    author: "J.K. Rowling",
    source: "Harry Potter and the Deathly Hallows",
  },
  {
    text: "Anyone who has never made a mistake has never tried anything new.",
    author: "Albert Einstein",
  },
  {
    text: "It's no use going back to yesterday, because I was a different person then.",
    author: "Lewis Carroll",
  },
  {
    text: "He's more myself than I am. Whatever our souls are made of, his and mine are the same.",
    author: "Emily Brontë",
    source: "Wuthering Heights",
  },
];
