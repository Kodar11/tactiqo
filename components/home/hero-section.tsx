import { ArrowDown } from "lucide-react";

import { LearnScreen, PhoneFrame } from "@/components/home/app-screens";
import { DownloadCTA } from "@/components/download-cta";
import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28 lg:pt-20">
        <div className="max-w-xl">
          <p className="animate-rise font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-blue-text" style={delay(0)}>
            Strategic thinking, practised
          </p>
          <h1
            id="hero-title"
            className="mt-5 animate-rise text-balance text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.04em] text-bright sm:text-6xl lg:text-[4.4rem]"
            style={delay(80)}
          >
            Think beyond your <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-orange">next move.</span>
          </h1>
          <p className="mt-6 max-w-[34rem] animate-rise text-pretty text-lg leading-relaxed text-slate sm:text-xl" style={delay(160)}>
            Every decision changes what happens next. Learn to anticipate choices, understand incentives, and think strategically
            through interactive games and real-world scenarios.
          </p>
          <div className="mt-9 flex animate-rise flex-col gap-3 sm:flex-row" style={delay(240)}>
            <a href="#demo" className={buttonClass("primary", "lg")}>
              Try the interactive demo
              <ArrowDown className="size-4" aria-hidden />
            </a>
            <DownloadCTA previewLabel="Explore the app" />
          </div>
          <p className="mt-5 animate-rise text-sm text-faint" style={delay(320)}>
            No game theory background required.
          </p>
        </div>

        <HeroComposition />
      </Container>
    </section>
  );
}

/** The app's Learn screen, with a decision unfolding behind it. */
function HeroComposition() {
  return (
    <div className="relative mx-auto flex w-full max-w-[520px] justify-center lg:justify-end">
      {/* Decision tree: one choice, two responses, four outcomes */}
      <svg
        aria-hidden
        viewBox="0 0 520 560"
        className="absolute inset-0 h-full w-full animate-fade"
        style={delay(300)}
        fill="none"
      >
        <defs>
          <linearGradient id="hero-blue" x1="0" x2="1">
            <stop offset="0" stopColor="#2563EB" stopOpacity="0" />
            <stop offset="1" stopColor="#2563EB" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="hero-orange" x1="0" x2="1">
            <stop offset="0" stopColor="#F97316" stopOpacity="0.7" />
            <stop offset="1" stopColor="#F97316" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 280 C 90 280, 110 170, 190 170" stroke="url(#hero-blue)" strokeWidth="1.5" />
        <path d="M0 280 C 90 280, 110 390, 190 390" stroke="url(#hero-blue)" strokeWidth="1.5" />
        <path d="M330 130 C 410 130, 430 70, 520 70" stroke="url(#hero-orange)" strokeWidth="1.5" />
        <path d="M330 210 C 410 210, 430 240, 520 240" stroke="url(#hero-orange)" strokeWidth="1.5" />
        <path d="M330 350 C 410 350, 430 320, 520 320" stroke="url(#hero-orange)" strokeWidth="1.5" />
        <path d="M330 430 C 410 430, 430 490, 520 490" stroke="url(#hero-orange)" strokeWidth="1.5" />
        {[
          [190, 170, "#2563EB"],
          [190, 390, "#2563EB"],
          [520, 70, "#F97316"],
          [520, 240, "#F97316"],
          [520, 320, "#F97316"],
          [520, 490, "#F97316"],
        ].map(([cx, cy, c]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill={c as string} opacity="0.8" />
        ))}
      </svg>
      <div aria-hidden className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/20 blur-[100px]" />

      <div className="relative animate-rise" style={delay(200)}>
        <PhoneFrame label="The Tactiqo app's Learn screen: a 'Start here' card for lesson 1, The Cooperation Trap, practice scenarios, the daily challenge, and Module 1's lessons.">
          <LearnScreen />
        </PhoneFrame>

        <div
          aria-hidden
          className="absolute -left-8 bottom-28 w-[200px] animate-rise rounded-2xl border border-line-strong bg-ink-raised/95 p-3.5 shadow-2xl shadow-black/60 backdrop-blur sm:-left-24"
          style={delay(520)}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate">Your move</p>
          <div className="mt-2 flex gap-1.5">
            <span className="rounded-lg bg-blue px-2.5 py-1 text-[11px] font-medium text-white">Split</span>
            <span className="rounded-lg border border-line-strong px-2.5 py-1 text-[11px] text-slate">Steal</span>
          </div>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-slate">Their best reply?</p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-navy-high">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-orange to-amber" />
          </div>
        </div>

        <div
          aria-hidden
          className="absolute -right-4 top-[46%] hidden animate-rise rounded-2xl border border-amber/30 bg-ink-raised/95 px-3.5 py-3 shadow-2xl shadow-black/60 sm:block lg:-right-10"
          style={delay(680)}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-amber">Why?</p>
          <p className="mt-1 max-w-[150px] text-[11px] leading-snug text-light">See the reasoning behind every outcome.</p>
        </div>
      </div>
    </div>
  );
}
