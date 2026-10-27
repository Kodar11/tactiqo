import { ArrowDown, Compass, Lightbulb, Repeat2, Swords, Users } from "lucide-react";

import { GamesScreen, LessonScreen, PhoneFrame, PracticeScreen } from "@/components/home/app-screens";
import { InteractiveDemo } from "@/components/home/interactive-demo";
import { DownloadCTA } from "@/components/download-cta";
import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { appFacts, site } from "@/lib/site-config";

/* ------------------------------------------------------------------------------------------------------------------
 * C — Interactive demo
 * ---------------------------------------------------------------------------------------------------------------- */

export function DemoSection() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="relative py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <Container>
        <SectionHeading id="demo-title" eyebrow="Try it now" title="See how a decision becomes a strategy.">
          A simple choice can reveal a surprisingly difficult problem. Try one yourself.
        </SectionHeading>
        <Reveal className="mt-12">
          <InteractiveDemo />
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------------------------------
 * D — The learning loop
 * ---------------------------------------------------------------------------------------------------------------- */

const LOOP = [
  { n: "01", title: "Decide", body: "Make a choice in a strategic situation.", color: "text-blue-text", dot: "bg-blue" },
  {
    n: "02",
    title: "Discover",
    body: "See the outcome and how your decision compares with the alternatives.",
    color: "text-orange-text",
    dot: "bg-orange",
  },
  {
    n: "03",
    title: "Understand",
    body: "Explore the incentives, trade-offs, and reasoning behind the result.",
    color: "text-amber",
    dot: "bg-amber",
  },
  {
    n: "04",
    title: "Practise",
    body: "Apply the idea to another scenario and build familiarity through experience.",
    color: "text-cyan",
    dot: "bg-cyan",
  },
];

export function LearningLoop() {
  return (
    <section id="how-it-works" aria-labelledby="loop-title" className="scroll-mt-16 py-20 sm:py-28">
      <Container>
        <SectionHeading id="loop-title" eyebrow="How it works" title="Don't just learn the theory. Try it.">
          Make a choice. See what follows. Understand the reasoning. Then try again with a different perspective.
        </SectionHeading>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-blue via-amber to-cyan opacity-50 md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r" />
          {LOOP.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.12} className="relative pl-9 md:pl-0 md:pt-10">
              <span aria-hidden className={cn("absolute left-0 top-0 flex size-[15px] items-center justify-center rounded-full ring-4 ring-ink", s.dot)} />
              <p className={cn("font-mono text-xs", s.color)}>{s.n}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-bright">{s.title}</h3>
              <p className="mt-2 max-w-[17rem] leading-relaxed text-slate">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14">
          <p className="flex items-center gap-3 text-sm text-slate">
            <Repeat2 className="size-4 text-faint" aria-hidden />
            In the app, every scenario follows this rhythm: your prediction first, then the outcome, then the explanation.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------------------------------
 * E — The real product
 * ---------------------------------------------------------------------------------------------------------------- */

const SHOWCASE = [
  {
    key: "learn",
    title: "Learn",
    body: `Explore strategic concepts through ${appFacts.lessons} guided lessons across ${appFacts.modules} modules, from the Prisoner's Dilemma to auctions, signalling and voting.`,
    detail: "Every scenario asks for your prediction before it explains.",
    screen: <LessonScreen />,
    label:
      "A Tactiqo lesson screen: the scenario 'Two suspects, two rooms' with a payoff table, the question 'What will the other suspect do?', three answers and an explanation.",
  },
  {
    key: "practise",
    title: "Practise",
    body: `Apply ideas to new situations in ${appFacts.scenarios} playable scenarios and ${appFacts.practiceChallenges} practice challenges, and examine the reasoning behind your choices.`,
    detail: "Your answers build a Thinking Profile that shows what you're exploring.",
    screen: <PracticeScreen />,
    label:
      "A Tactiqo practice challenge, 'The Discount War', about two bakeries deciding whether to discount, with the correct answer marked and a takeaway.",
  },
  {
    key: "play",
    title: "Play",
    body: "Experience strategic interactions in five games against bots, where decisions, incentives and other players' choices matter.",
    detail: "Plus a weekly Game of the Week and friend challenges.",
    screen: <GamesScreen />,
    label:
      "The Tactiqo Games screen: the Game of the Week card and five games — Split or Steal, Rock Paper Scissors, Two-Thirds Guess, The Ultimatum and Stag Hunt.",
  },
];

export function ProductShowcase() {
  return (
    <section id="app" aria-labelledby="app-title" className="scroll-mt-16 overflow-hidden py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="app-title" eyebrow="The app" title="A place to practise thinking strategically.">
            Explore guided lessons, test your reasoning in different situations, and play games that make strategic ideas
            tangible.
          </SectionHeading>
          <dl className="grid shrink-0 grid-cols-4 gap-6 border-l border-line pl-6 lg:mb-2">
            {[
              [appFacts.lessons, "lessons"],
              [appFacts.scenarios, "scenarios"],
              [appFacts.practiceChallenges, "challenges"],
              [appFacts.games.length, "games"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-mono text-2xl text-bright sm:text-3xl">{n}</dd>
                <dd className="mt-1 text-xs text-slate" aria-hidden>
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 grid gap-16 md:grid-cols-3 md:gap-6 lg:gap-10">
          {SHOWCASE.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.1} className="flex flex-col">
              <div className="relative flex justify-center overflow-hidden rounded-[28px] border border-line bg-gradient-to-b from-navy/70 to-ink-raised/30 px-4 pt-8">
                <div aria-hidden className="absolute inset-0 grid-lines opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
                <PhoneFrame label={s.label} className="relative -mb-24 origin-top scale-[0.92] lg:scale-100">
                  {s.screen}
                </PhoneFrame>
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-tight text-bright">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-slate">{s.body}</p>
              <p className="mt-3 text-sm text-faint">{s.detail}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 text-xs text-faint">
          Screens recreated from the current app&apos;s interface and content. The app is in development and details may change.
        </p>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------------------------------
 * F — Who it is for
 * ---------------------------------------------------------------------------------------------------------------- */

const AUDIENCE = [
  {
    icon: Compass,
    title: "Curious minds",
    body: "Explore why seemingly simple decisions become interesting when other people are involved.",
  },
  {
    icon: Swords,
    title: "Strategy enthusiasts",
    body: "Go beyond choosing a move. Think about incentives, expectations, and possible responses.",
  },
  {
    icon: Users,
    title: "Everyday decision-makers",
    body: "Explore the reasoning behind cooperation, competition, negotiation, and conflicting interests.",
  },
];

export function AudienceSection() {
  return (
    <section aria-labelledby="audience-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="audience-title" eyebrow="Who it's for" title="For people who want to understand the thinking behind the choice." />
        <div className="mt-14 grid border-y border-line md:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <Reveal
              key={a.title}
              delay={i * 0.1}
              className={cn("py-8 md:px-8 md:py-10", i > 0 && "border-t border-line md:border-l md:border-t-0", i === 0 && "md:pl-0")}
            >
              <a.icon className="size-5 text-blue-text" aria-hidden />
              <h3 className="mt-5 text-lg font-semibold text-bright">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-slate">{a.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------------------------------
 * G — Philosophy
 * ---------------------------------------------------------------------------------------------------------------- */

export function PhilosophySection() {
  return (
    <section aria-labelledby="philosophy-title" className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-navy/80 via-ink-raised to-ink p-8 sm:p-14">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Lightbulb className="size-5 text-amber" aria-hidden />
              <h2 id="philosophy-title" className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-bright sm:text-[2.75rem]">
                Better questions lead to <span className="font-serif font-normal italic text-amber">better thinking.</span>
              </h2>
              <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-slate">
                <p>
                  Strategic thinking isn&apos;t about predicting everything. It&apos;s about noticing what matters, questioning your
                  assumptions, and considering how decisions shape one another.
                </p>
                <p>
                  {site.name} offers simplified models of real situations so you can explore ideas, test your reasoning, and discover
                  different ways to approach a problem.
                </p>
              </div>
            </div>
            <DecisionWeb />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Interconnected decisions: every node's choice is linked to others'. Gently pulses once, then rests. */
function DecisionWeb() {
  const nodes: [number, number, string][] = [
    [60, 70, "#2563EB"],
    [200, 40, "#94A3B8"],
    [330, 90, "#F97316"],
    [120, 190, "#94A3B8"],
    [260, 200, "#FDBA74"],
    [60, 300, "#94A3B8"],
    [190, 320, "#22D3EE"],
    [330, 290, "#94A3B8"],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 4], [3, 5], [3, 6], [4, 6], [4, 7], [6, 7], [5, 6],
  ];
  return (
    <svg viewBox="0 0 390 370" className="mx-auto w-full max-w-[380px]" role="img" aria-label="A web of connected decisions: each choice links to several others.">
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#94A3B8"
          strokeOpacity={a === 4 || b === 4 ? 0.5 : 0.18}
          strokeWidth="1.25"
        />
      ))}
      {nodes.map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 4 ? 22 : 14} fill={c} fillOpacity="0.12" />
          <circle cx={x} cy={y} r={i === 4 ? 7 : 5} fill={c} />
        </g>
      ))}
      <text x="260" y="244" textAnchor="middle" className="fill-amber font-mono text-[11px]">
        your choice
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------------------------------------------------------
 * H — Final call to action
 * ---------------------------------------------------------------------------------------------------------------- */

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[380px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10 blur-[120px]" />
      <Container className="relative text-center">
        <h2 id="cta-title" className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-bright sm:text-6xl">
          Your next move starts with a decision.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate">
          Try a strategic challenge, discover the reasoning behind the outcome, and explore {site.name}.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#demo" className={buttonClass("primary", "lg")}>
            Try the demo
            <ArrowDown className="size-4" aria-hidden />
          </a>
          <DownloadCTA previewLabel="See inside the app" />
        </div>
        {!site.playStoreUrl ? <p className="mt-5 text-sm text-faint">{site.name} isn&apos;t available to download yet.</p> : null}
      </Container>
    </section>
  );
}
