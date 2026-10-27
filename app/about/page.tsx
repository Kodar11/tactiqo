import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DownloadCTA } from "@/components/download-cta";
import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { appFacts, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Tactiqo exists: strategic reasoning should be something you can practise, not only read about. How the app's learning approach works.",
  alternates: site.url ? { canonical: "/about" } : undefined,
};

const PARTS = [
  {
    n: "01",
    title: "The idea",
    lead: "Strategic reasoning should be something people can practise, not only read about.",
    body: [
      "Most explanations of game theory start with a definition and a table of numbers. That is useful once you already have an intuition for the problem, and hard going before you do.",
      "Tactiqo starts from the other end. You meet a situation first, make a call, and only then look at why it played out the way it did. The concept arrives when you already have a reason to care about it.",
    ],
  },
  {
    n: "02",
    title: "The approach",
    lead: "Explore a situation, make a decision, examine the outcome, and understand the reasoning.",
    body: [
      "Every scenario in the app asks for your prediction before revealing what happens. Then it shows the outcome, explains the reasoning behind it, and lets you compare alternatives. Lessons follow a deliberate order: a scenario that shows the mechanism, one that changes an assumption, and one that moves the idea somewhere new.",
      "Each scenario lists its rules on screen, and the outcome is calculated from exactly those rules, so the explanation always matches what you played.",
    ],
  },
  {
    n: "03",
    title: "The intention",
    lead: "Make ideas from game theory and strategic reasoning approachable to curious learners.",
    body: [
      "You don't need a mathematical background. The app covers ideas such as dominant strategies, Nash equilibrium, coordination, mixed strategies, credible threats, signalling, auctions and voting, but it introduces each one through a decision rather than a formula.",
      "The models are deliberately simple. They won't tell you what a real person will do next. They are a place to notice patterns, test assumptions and see how one decision shapes another.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <Container className="pb-10 pt-14 sm:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-text">About {site.name}</p>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-bright sm:text-6xl">
          Making strategic thinking <span className="font-serif font-normal italic text-orange">easier to explore.</span>
        </h1>
        <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-slate sm:text-xl">
          <p>
            Strategic thinking appears whenever decisions depend on what other people do. It shapes cooperation, competition,
            negotiation, and countless everyday situations.
          </p>
          <p>
            {site.name} makes these ideas easier to explore through interactive games, guided lessons, and scenarios that encourage
            you to think through your choices.
          </p>
        </div>
      </Container>

      <Container className="py-10">
        <div className="divide-y divide-line border-y border-line">
          {PARTS.map((p) => (
            <Reveal key={p.n} className="grid gap-6 py-12 md:grid-cols-[200px_1fr] md:gap-12 sm:py-16">
              <div>
                <p className="font-mono text-xs text-blue-text">{p.n}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-bright">{p.title}</h2>
              </div>
              <div className="max-w-2xl">
                <p className="text-xl leading-snug text-bright sm:text-2xl">{p.lead}</p>
                {p.body.map((para) => (
                  <p key={para.slice(0, 24)} className="mt-5 leading-relaxed text-slate">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal className="grid gap-6 py-12 md:grid-cols-[200px_1fr] md:gap-12 sm:py-16">
            <div>
              <p className="font-mono text-xs text-blue-text">04</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-bright">The product</h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-xl leading-snug text-bright sm:text-2xl">Start with one decision. Keep going if it makes you curious.</p>
              <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {[
                  [String(appFacts.lessons), `guided lessons in ${appFacts.modules} modules`],
                  [String(appFacts.scenarios), "playable scenarios"],
                  [String(appFacts.practiceChallenges), "practice challenges"],
                  [String(appFacts.games.length), "games against bots, plus a weekly competition"],
                ].map(([n, l]) => (
                  <li key={l} className="bg-ink-raised p-5">
                    <span className="font-mono text-3xl text-bright">{n}</span>
                    <span className="mt-1 block text-sm text-slate">{l}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 leading-relaxed text-slate">
                A Thinking Profile gathers your predictions and answers so you can see which kinds of reasoning you have explored,
                and a Daily Challenge adds a fresh situation to think through.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/#demo" className={buttonClass("primary", "lg")}>
                  Try the interactive demo
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <DownloadCTA previewLabel="See the app" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
      <div className="h-16" />
    </>
  );
}
