# Before launch

Every launch-dependent value lives in `lib/site-config.ts`. While a value is `null`, the site shows an honest fallback
instead of inventing one. Fill these in, then rebuild.

## Required

| Setting | What changes when it is set | Today |
|---|---|---|
| `site.url` | Canonical URLs, `metadataBase` for social images, `robots.txt` allows crawling, `sitemap.xml` lists pages | Unset: robots disallow everything, sitemap is empty, build warns about `metadataBase` |
| `site.playStoreUrl` | Header, hero, About and final CTA link to Google Play ("Get it on Google Play") | Unset: those buttons point to the app preview (`/#app`), and the final CTA says the app isn't available to download yet |
| `site.supportEmail` | Contact page shows the address; legal pages and `/delete-account` link to it | Set to `tanmaychavan13@gmail.com` |
| `site.owner.name` | Copyright line only (legal pages use neutral wording) | Unset: copyright reads "Tactiqo" |
| `site.legal.privacyEffectiveDate`, `site.legal.termsEffectiveDate` | Shown on the legal pages | Set to 28 October 2026 |
| `site.legal.minimumAge` | Privacy (children) and Terms (eligibility) | Set to 13 |
| `site.legal.dataRegion` | Privacy: where app data is stored | Unset: bracketed placeholder |

The Privacy Policy and Terms are marked **Draft**, carry `noindex`, and stay out of the sitemap until both effective dates,
the minimum age and the data region are set (`legalReady()`). The Terms have no governing-law clause, by decision.

## Facts the Privacy Policy still needs

- **The Supabase project's region** (Project Settings → General in the Supabase dashboard). The repository doesn't record
  it. Set `site.legal.dataRegion`, e.g. "the EU (Frankfurt)".

## Account deletion, as described on `/delete-account` and in the Privacy Policy

Audited from the app's working tree (October 2026): Settings → Account → Delete account calls `delete_my_account()`
(migration `20261028140000_delete_account.sql`), which deletes the caller's `auth.users` row and, by cascade, every
player table. Its tests (`supabase/__tests__/account.test.ts`) pass locally. Before publishing, make sure that migration
is applied to the production Supabase project and the app build with the button is the one users have; until then the
button fails and deletes nothing. If the flow changes, update `/delete-account`, the Privacy Policy and the Terms.

There is no scheduled cleanup in the migrations, so the policy says data is kept until the account is deleted. If you add
a retention job (or one exists in the dashboard), update the "How long it is kept" section.

## Have a lawyer review

The legal pages describe the app's actual behaviour (audited from the `strategic-game` repository, October 2026) but are
not legally validated. In particular: liability wording, children's privacy, and international transfers.

## App and brand consistency

- The mobile app's `app.json` still names the app "Strategic Game", and the Learn screen header reads "Strategic". The
  onboarding already says "Tactiqo". The website's app recreations use "Tactiqo".
- `assets/images/icon.png` in the app is still Expo's default icon. The Tactiqo icon used here is in
  `public/brand/tactiqo-icon-source.webp`.

## Product facts used in the copy

Counts come from the app's published content snapshot (`supabase/seed/content.json`) and are in `appFacts`
(`lib/site-config.ts`): 22 lessons in 6 modules, 66 scenarios, 15 practice challenges, 5 games (Rock, Paper, Scissors;
Two-Thirds Guess; Split or Steal; The Ultimatum; Stag Hunt). Update them if the content changes.
