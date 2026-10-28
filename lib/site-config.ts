/**
 * Every launch-dependent fact the website shows lives here. A value of `null` means "not supplied yet": the site
 * then shows an honest fallback instead of inventing one. LAUNCH.md lists what to fill in before going live.
 */

export const site = {
  name: "Tactiqo",
  tagline: "Strategic thinking, practised.",
  description:
    "Tactiqo is a strategic-thinking app. Make decisions in interactive games and real-world scenarios, see what follows, and understand the reasoning behind the outcome.",

  /** Production origin without a trailing slash, e.g. "https://tactiqo.app". Unset: no canonical URLs, no sitemap, robots disallow. */
  url: null as string | null,

  /** The verified Google Play listing. Unset: no download buttons, CTAs point to the app preview instead. */
  playStoreUrl: null as string | null,

  /** A monitored support inbox. Unset: the contact page says no channel is configured yet. */
  supportEmail: "tanmaychavan13@gmail.com" as string | null,

  /** The person or business responsible for the app and site, as it should appear in the copyright line. */
  owner: {
    name: null as string | null,
  },

  legal: {
    /** ISO dates, e.g. "2026-11-01". Unset: the legal pages are marked as drafts and kept out of search indexes. */
    privacyEffectiveDate: "2026-10-28" as string | null,
    termsEffectiveDate: "2026-10-28" as string | null,
    /** Minimum age for using the app, once decided. */
    minimumAge: 13 as number | null,
    /** Where the app's Supabase project stores data, from the project's dashboard settings. Unset: the policy is a draft. */
    dataRegion: null as string | null,
  },

  /** Used in the copyright notice. Static on purpose: a prerendered page can't read the clock. */
  copyrightYear: 2026,
} as const;

/** The app's verified content counts (from the app's published content snapshot, October 2026). */
export const appFacts = {
  lessons: 22,
  modules: 6,
  scenarios: 66,
  practiceChallenges: 15,
  games: ["Rock, Paper, Scissors", "Two-Thirds Guess", "Split or Steal", "The Ultimatum", "Stag Hunt"],
} as const;

export const isDownloadAvailable = () => site.playStoreUrl !== null;

/** Legal pages are final only when their effective dates and every fact they state are confirmed. */
export const legalReady = () =>
  site.legal.privacyEffectiveDate !== null &&
  site.legal.termsEffectiveDate !== null &&
  site.legal.minimumAge !== null &&
  site.legal.dataRegion !== null;

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
