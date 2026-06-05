import type { Profile } from "@/lib/types";

/**
 * Your identity. Only your name is filled in (factual).
 * The personal copy below is intentionally blank — write it in your own voice.
 * Empty fields render as nothing (or a gentle prompt on the home page).
 */
export const profile: Profile = {
  name: "Brayden Pelt",
  tagline: "", // TODO: one line that sounds like you
  descriptors: [], // TODO: hero kicker words, e.g. ["Researcher", "Builder", "Writer"]
  location: "", // TODO (optional)
  email: "", // TODO (optional)
  socials: [
    // TODO: { label: "GitHub", url: "https://github.com/you" },
    // TODO: { label: "LinkedIn", url: "https://linkedin.com/in/you" },
  ],
};
