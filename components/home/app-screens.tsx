import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  Clock,
  Gamepad2,
  Play,
  Target,
  Trophy,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * Recreations of real Tactiqo app screens, built from the app's own layout, tokens and published content
 * (lesson titles, scenario text, game rules). They are illustrations of the current app, not live UI.
 */

export function PhoneFrame({ children, className, label }: { children: React.ReactNode; className?: string; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative w-[272px] shrink-0 rounded-[2.6rem] border border-white/10 bg-[#050b15] p-2.5 shadow-[0_50px_100px_-30px_rgb(0_0_0/0.9),inset_0_0_0_1px_rgb(255_255_255/0.04)]",
        className,
      )}
    >
      <div className="relative h-[560px] overflow-hidden rounded-[2.05rem] bg-ink">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(28rem_18rem_at_0%_0%,rgb(15_42_68/0.9),transparent_70%)]" />
        <div className="relative flex h-6 items-center justify-center">
          <span className="h-[18px] w-[72px] rounded-full bg-black" />
        </div>
        <div className="relative h-[calc(100%-1.5rem)]" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

function TabBar({ active }: { active: "Learn" | "Games" | "Profile" }) {
  const tabs: [string, LucideIcon][] = [
    ["Learn", BookOpen],
    ["Games", Gamepad2],
    ["Profile", UserRound],
  ];
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-line bg-ink-raised/95 px-4 pb-4 pt-2">
      {tabs.map(([name, Icon]) => (
        <div key={name} className={cn("flex flex-col items-center gap-0.5 text-[9px]", name === active ? "text-blue-text" : "text-faint")}>
          <Icon className="size-4" />
          {name}
        </div>
      ))}
    </div>
  );
}

const Overline = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("text-[8px] font-semibold uppercase tracking-[0.14em]", className)}>{children}</p>
);

/** The Learn tab: hero, "Start here", practice, daily challenge, first module. */
export function LearnScreen() {
  return (
    <div className="h-full px-4 pt-2 text-left">
      <div className="flex items-center gap-1.5">
        <span className="flex h-3.5 w-3.5 overflow-hidden rounded-[4px]">
          <span className="w-1/2 bg-blue" />
          <span className="w-1/2 bg-orange" />
        </span>
        <Overline className="text-bright">Tactiqo</Overline>
      </div>
      <Overline className="mt-5 text-blue-text">A game that teaches you to think strategically</Overline>
      <p className="mt-1.5 text-[22px] font-bold leading-tight tracking-[-0.03em] text-bright">Think in Strategies.</p>
      <p className="mt-1 text-[11px] leading-snug text-slate">Make decisions, see what happens, and discover why.</p>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-blue p-3.5">
        <div>
          <p className="text-[9px] text-[#DBEAFE]">Start here</p>
          <p className="mt-0.5 text-[13px] font-semibold text-white">1. The Cooperation Trap</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-blue">
          <Play className="size-2.5 fill-blue" /> Start
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-line bg-navy/70 p-2.5">
          <Target className="size-3.5 text-cyan" />
          <p className="mt-1.5 text-[10px] font-semibold leading-tight text-bright">Practice in new situations</p>
          <p className="mt-0.5 text-[8px] text-slate">0 of 66 scenarios played</p>
        </div>
        <div className="rounded-xl border border-line bg-navy/70 p-2.5">
          <CalendarDays className="size-3.5 text-amber" />
          <p className="mt-1.5 text-[10px] font-semibold leading-tight text-bright">Daily challenge</p>
          <p className="mt-0.5 text-[8px] text-amber">Today&apos;s is open</p>
        </div>
      </div>

      <Overline className="mt-5 text-blue-text">Module 1</Overline>
      <p className="mt-0.5 text-[12px] font-semibold text-bright">Foundations: How to Think Strategically</p>
      <div className="mt-2 space-y-1.5">
        {[
          ["1", "The Cooperation Trap", "9"],
          ["2", "Strategy Detective", "8"],
          ["3", "Finding the Best Move", "8"],
        ].map(([n, t, m]) => (
          <div key={n} className="flex items-center gap-2.5 rounded-xl border border-line bg-navy/50 px-2.5 py-2">
            <span className="flex size-5 items-center justify-center rounded-md bg-blue/20 font-mono text-[9px] text-blue-text">{n}</span>
            <span className="flex-1 text-[10px] font-medium text-light">{t}</span>
            <span className="flex items-center gap-0.5 text-[8px] text-faint">
              <Clock className="size-2.5" />
              {m} min
            </span>
          </div>
        ))}
      </div>
      <TabBar active="Learn" />
    </div>
  );
}

/** A lesson scenario: Prisoner's Dilemma payoff table and a prediction. */
export function LessonScreen() {
  const cells = [
    ["−1, −1", "−8, 0"],
    ["0, −8", "−5, −5"],
  ];
  return (
    <div className="h-full px-4 pt-2 text-left">
      <div className="h-1 overflow-hidden rounded-full bg-navy-high">
        <div className="h-full w-[38%] rounded-full bg-blue" />
      </div>
      <Overline className="mt-4 text-blue-text">Lesson 1 · The Cooperation Trap</Overline>
      <p className="mt-1 text-[16px] font-bold tracking-tight text-bright">Two suspects, two rooms</p>
      <p className="mt-1.5 text-[10px] leading-snug text-slate">
        Two suspects are questioned in separate rooms. Each can stay silent or confess. Neither hears what the other says before choosing.
      </p>

      <div className="mt-3 rounded-xl border border-line bg-navy/60 p-2.5">
        <p className="text-[8px] text-slate">Years in prison (you, other)</p>
        <div className="mt-1.5 grid grid-cols-[auto_1fr_1fr] gap-1 text-[9px]">
          <span />
          <span className="text-center text-orange-text">Other: silent</span>
          <span className="text-center text-orange-text">Other: confess</span>
          {cells.map((row, i) => (
            <div key={i} className="contents">
              <span className="self-center pr-1 text-blue-text">{i === 0 ? "You: silent" : "You: confess"}</span>
              {row.map((c, j) => (
                <span
                  key={j}
                  className={cn(
                    "rounded-md py-2 text-center font-mono text-light",
                    i === 1 && j === 1 ? "bg-amber/15 text-amber ring-1 ring-amber/40" : "bg-ink/70",
                  )}
                >
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[11px] font-semibold text-bright">What will the other suspect do?</p>
      <div className="mt-2 space-y-1.5">
        {["Confess", "Stay silent — 1 year each is better for both", "Whatever they expect me to do"].map((o, i) => (
          <div
            key={o}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-2.5 py-2 text-[9.5px]",
              i === 0 ? "border-blue bg-blue/15 text-bright" : "border-line bg-navy/40 text-light",
            )}
          >
            <span className={cn("size-3 rounded-full border", i === 0 ? "border-blue bg-blue" : "border-line-strong")} />
            {o}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-amber/25 bg-amber/[0.07] p-2.5">
        <p className="text-[9px] leading-snug text-light">
          <span className="font-semibold text-amber">From their seat: </span>
          if you stay silent, confessing gives 0 instead of 1 year; if you confess, 5 instead of 8.
        </p>
      </div>
    </div>
  );
}

/** A practice challenge with its options and the takeaway. */
export function PracticeScreen() {
  return (
    <div className="h-full px-4 pt-2 text-left">
      <Overline className="text-cyan">Practice challenge</Overline>
      <div className="mt-2 rounded-2xl border border-line bg-navy/60 p-3">
        <Overline className="text-slate">A choice that pays more whatever the other side does</Overline>
        <p className="mt-1 text-[13px] font-semibold text-bright">The Discount War</p>
        <p className="mt-1.5 text-[9.5px] leading-snug text-slate">
          Two bakeries on the same street each choose, without talking, whether to discount this weekend. If both keep normal
          prices, each makes 6. If only one discounts, it makes 8 and the other makes 2. If both discount, each makes 4.
        </p>
      </div>
      <p className="mt-3.5 text-[11px] font-semibold text-bright">What will each bakery most likely do?</p>
      <div className="mt-2 space-y-1.5">
        {[
          ["Both discount", true],
          ["Both keep normal prices — that’s better for both", false],
          ["Each will copy what it expects the other to do", false],
        ].map(([o, ok]) => (
          <div
            key={o as string}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-2.5 py-2 text-[9.5px]",
              ok ? "border-[#4ADE80]/50 bg-[#4ADE80]/10 text-bright" : "border-line bg-navy/40 text-slate",
            )}
          >
            {ok ? <Check className="size-3 text-[#4ADE80]" /> : <span className="size-3 rounded-full border border-line-strong" />}
            {o}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-navy-high/60 p-2.5">
        <Overline className="text-amber">Takeaway</Overline>
        <p className="mt-1 text-[9.5px] leading-snug text-light">
          Compare your payoffs against each of the other side’s choices, not against the outcome you would both prefer.
        </p>
      </div>
    </div>
  );
}

/** The Games tab: the five games against bots. */
export function GamesScreen() {
  const games: [string, string, string][] = [
    ["Split or Steal", "Trust, temptation and retaliation in a repeated relationship.", "bg-orange"],
    ["Rock, Paper, Scissors", "Patterns are exploitable. Being hard to predict is a strategy.", "bg-blue"],
    ["Two-Thirds Guess", "How many steps ahead is everyone else thinking?", "bg-cyan"],
    ["The Ultimatum", "Money versus fairness — and what a credible “no” is worth.", "bg-amber"],
    ["Stag Hunt", "Coordination under risk: the best outcome needs trust.", "bg-[#4ADE80]"],
  ];
  return (
    <div className="h-full px-4 pt-2 text-left">
      <p className="text-[18px] font-bold tracking-tight text-bright">Games</p>
      <div className="mt-3 rounded-2xl border border-amber/30 bg-gradient-to-br from-amber/[0.12] to-transparent p-3">
        <div className="flex items-center gap-1.5">
          <Trophy className="size-3 text-amber" />
          <Overline className="text-amber">Game of the Week</Overline>
        </div>
        <p className="mt-1 text-[12px] font-semibold text-bright">One game, one opponent, for everyone</p>
        <p className="mt-0.5 text-[9px] text-slate">Your best match of the week counts on the leaderboard.</p>
      </div>
      <Overline className="mt-4 text-slate">Play against bots</Overline>
      <div className="mt-2 space-y-1.5">
        {games.map(([t, d, dot]) => (
          <div key={t} className="flex items-center gap-2.5 rounded-xl border border-line bg-navy/50 px-2.5 py-2">
            <span className={cn("size-2 shrink-0 rounded-full", dot)} />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-bright">{t}</p>
              <p className="truncate text-[8.5px] text-slate">{d}</p>
            </div>
            <ArrowRight className="size-3 text-faint" />
          </div>
        ))}
      </div>
      <TabBar active="Games" />
    </div>
  );
}
