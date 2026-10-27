# Before launch

Every launch-dependent value lives in `lib/site-config.ts`. While a value is `null`, the site shows an honest fallback
instead of inventing one. Fill these in, then rebuild.

## Required

| Setting | What changes when it is set | Today |
|---|---|---|
| `site.url` | Canonical URLs, `metadataBase` for social images, `robots.txt` allows crawling, `sitemap.xml` lists pages | Unset: robots disallow everything, sitemap is empty, build warns about `metadataBase` |
| `site.playStoreUrl` | Header, hero, About and final CTA link to Google Play ("Get it on Google Play") | Unset: those buttons point to the app preview (`/#app`), and the final CTA says the app isn't available to download yet |
| `site.supportEmail` | Contact page shows the address; legal pages link to it | Unset: Contact page says no support channel exists yet |
| `site.owner.name` | Copyright line, legal pages | Unset: copyright reads "Tactiqo"; legal pages show a bracketed placeholder |
| `site.owner.jurisdiction` | Terms: governing law, liability section | Placeholder |
| `site.legal.privacyEffectiveDate`, `site.legal.termsEffectiveDate` | Shown on the legal pages | Placeholder |
| `site.legal.minimumAge` | Privacy (children) and Terms (eligibility) | Placeholder |

The Privacy Policy and Terms are marked **Draft**, carry `noindex`, and stay out of the sitemap until `owner.name` and both
effective dates are set (`legalReady()`).

## Facts the Privacy Policy still needs (shown in brackets on the page)

- `site.owner.address`, if you choose or are required to publish one (Google Play may require it).
- Website hosting provider and how long it keeps server logs.
- The Supabase project's region (where app data is stored).
- How long app data is kept for an anonymous account.
- **A deletion route.** The app has no way to delete everything stored for an account, and support can't identify an
  anonymous user unless the app shows them an ID to quote. Google Play requires apps that create accounts (anonymous ones
  included) to offer account and data deletion. Decide on a mechanism and update the policy.

## Have a lawyer review

The legal pages describe the app's actual behaviour (audited from the `strategic-game` repository, October 2026) but are
not legally validated. In particular: governing law, liability wording, children's privacy, and international transfers.

## App and brand consistency

- The mobile app's `app.json` still names the app "Strategic Game", and the Learn screen header reads "Strategic". The
  onboarding already says "Tactiqo". The website's app recreations use "Tactiqo".
- `assets/images/icon.png` in the app is still Expo's default icon. The Tactiqo icon used here is in
  `public/brand/tactiqo-icon-source.webp`.

## Product facts used in the copy

Counts come from the app's published content snapshot (`supabase/seed/content.json`) and are in `appFacts`
(`lib/site-config.ts`): 22 lessons in 6 modules, 66 scenarios, 15 practice challenges, 5 games (Rock, Paper, Scissors;
Two-Thirds Guess; Split or Steal; The Ultimatum; Stag Hunt). Update them if the content changes.
