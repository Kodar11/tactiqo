# Tactiqo website

The marketing site for Tactiqo, a strategic-thinking learning app. Next.js (App Router, Cache Components), Tailwind CSS 4,
Motion. Every page is static; there is no backend, database, analytics or cookies.

```bash
npm run dev        # http://localhost:3000
npm test           # demo game logic (node:test)
npm run typecheck
npm run lint
npm run build
```

## Where things are

| | |
|---|---|
| `lib/site-config.ts` | Store URL, support email, owner, legal dates, verified app counts. **See LAUNCH.md.** |
| `lib/two-thirds.ts` | The demo's rules and simulated players (pure, tested in `lib/__tests__/`) |
| `components/home/` | Homepage sections, the interactive demo and its copy, recreated app screens |
| `components/download-cta.tsx` | The one place that decides whether "get the app" links to Google Play or the app preview |
| `components/legal-layout.tsx` | Legal page layout; `Missing` marks facts the owner must supply |
| `lib/events.ts` | No-op event boundary for any future, consented analytics |

## The Two-Thirds demo

- Pick a whole number 0–100. Eight simulated players pick too.
- Target = ⅔ × the average of all nine picks. Closest wins; exact ties share. Distances are compared exactly as
  `|27·pick − 2·sum|`; displayed values are rounded to two decimals.
- Each simulated player picks `round(anchor × (⅔)^depth) + offset`, clamped to 0–100. The anchor is 50 in round 1, then
  the previous round's average. Depths and offsets are listed on the page. No randomness.
- Five rounds, then start over. Round 1 picks: 62, 45, 37, 33, 30, 24, 20, 15.
