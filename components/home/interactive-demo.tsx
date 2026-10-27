"use client";

import { ArrowRight, Info, Lock, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";

import { groupReading, lesson, outcomeHeadline, pickReading } from "@/components/home/demo-copy";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/events";
import {
  DEPTH_LABELS,
  FIRST_ANCHOR,
  MAX_PICK,
  MAX_ROUNDS,
  MIN_PICK,
  PLAYERS,
  type RoundResult,
  SIMULATED_PLAYERS,
  formatNumber,
  nextAnchor,
  parsePick,
  playRound,
} from "@/lib/two-thirds";

const EASE = [0.2, 0.7, 0.2, 1] as const;

export function InteractiveDemo() {
  const [history, setHistory] = useState<RoundResult[]>([]);
  const [phase, setPhase] = useState<"decide" | "result">("decide");
  const [raw, setRaw] = useState("50");
  const [touched, setTouched] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // After a phase change the new panel starts at the top of the card; bring it back if the visitor scrolled past it.
  const bringIntoView = () => {
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) rootRef.current?.scrollIntoView({ block: "start" });
  };

  const pick = parsePick(raw);
  const current = history[history.length - 1];
  const roundNumber = phase === "result" ? history.length : history.length + 1;
  const finished = phase === "result" && history.length >= MAX_ROUNDS;

  const submit = () => {
    setTouched(true);
    if (pick === null) return;
    const anchor = current ? nextAnchor(current) : FIRST_ANCHOR;
    const result = playRound(pick, history.length + 1, anchor);
    setHistory([...history, result]);
    setPhase("result");
    trackEvent("demo_submit", { round: result.round });
    requestAnimationFrame(() => {
      bringIntoView();
      resultRef.current?.focus({ preventScroll: true });
    });
  };

  const nextRound = () => {
    setPhase("decide");
    setTouched(false);
    bringIntoView();
    trackEvent("demo_next_round");
  };

  const restart = () => {
    setHistory([]);
    setPhase("decide");
    setRaw("50");
    setTouched(false);
    bringIntoView();
    trackEvent("demo_restart");
  };

  return (
    <div ref={rootRef} className="relative scroll-mt-20 overflow-hidden rounded-[28px] border border-line-strong bg-ink-raised/90 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      {/* Title bar */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan">Two-Thirds Guess</span>
          <span className="h-3 w-px bg-line-strong" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">
            Round {roundNumber} of {MAX_ROUNDS}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <RoundDots total={MAX_ROUNDS} played={history.length} />
          {history.length > 0 ? (
            <button type="button" onClick={restart} className={buttonClass("ghost", "md", "h-8 px-3 text-xs")}>
              <RotateCcw className="size-3.5" aria-hidden />
              Start over
            </button>
          ) : null}
        </div>
      </div>

      <div className="relative grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Left: the challenge and the rules */}
        <div className="border-b border-line p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <h3 className="text-xl font-semibold tracking-tight text-bright">Guess two-thirds of the average</h3>
          <p className="mt-3 leading-relaxed text-slate">
            You and eight other players each choose a number. Whoever lands closest to two-thirds of the group&apos;s average wins.
            Simple to state. Harder to get right, because everyone else is thinking about it too.
          </p>
          <ol className="mt-6 space-y-3 text-[15px] text-light">
            {[
              <>Pick a whole number from <Num>0</Num> to <Num>100</Num>.</>,
              <>The target is <Num>⅔</Num> × the average of all nine picks, yours included.</>,
              <>Closest to the target wins. Exact ties share the win.</>,
            ].map((rule, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 font-mono text-xs text-blue-text">0{i + 1}</span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex gap-2 rounded-xl border border-line bg-navy/30 p-3 text-sm leading-relaxed text-slate">
            <Info className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden />
            <span>
              The other eight players are <strong className="font-medium text-light">simulated</strong>, with fixed rules you can read below.
              You are not playing against real people.
            </span>
          </p>
          <GroupRules />
        </div>

        {/* Right: decide, then see the outcome */}
        <div className="relative min-h-[520px] p-5 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {phase === "decide" ? (
              <motion.div
                key={`decide-${history.length}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <DecisionPanel
                  raw={raw}
                  setRaw={(v) => {
                    setRaw(v);
                    setTouched(true);
                  }}
                  pick={pick}
                  showError={touched && pick === null}
                  onSubmit={submit}
                  previous={current}
                />
              </motion.div>
            ) : current ? (
              <motion.div
                key={`result-${current.round}`}
                ref={resultRef}
                tabIndex={-1}
                className="outline-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <ResultPanel result={current} history={history} />
                <div className="mt-8 flex flex-wrap gap-3">
                  {finished ? (
                    <button type="button" onClick={restart} className={buttonClass("primary", "lg")}>
                      <RotateCcw className="size-4" aria-hidden />
                      Play again from round 1
                    </button>
                  ) : (
                    <button type="button" onClick={nextRound} className={buttonClass("primary", "lg")}>
                      Play round {history.length + 1}
                      <ArrowRight className="size-4" aria-hidden />
                    </button>
                  )}
                  {!finished ? (
                    <button type="button" onClick={restart} className={buttonClass("secondary", "lg")}>
                      Start over
                    </button>
                  ) : null}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Num({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-bright">{children}</span>;
}

function RoundDots({ total, played }: { total: number; played: number }) {
  return (
    <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={cn("h-1.5 w-5 rounded-full transition-colors duration-500", i < played ? "bg-blue" : "bg-line-strong")} />
      ))}
    </div>
  );
}

function DecisionPanel({
  raw,
  setRaw,
  pick,
  showError,
  onSubmit,
  previous,
}: {
  raw: string;
  setRaw: (v: string) => void;
  pick: number | null;
  showError: boolean;
  onSubmit: () => void;
  previous?: RoundResult;
}) {
  const inputId = useId();
  const errorId = useId();
  const sliderValue = pick ?? 50;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      noValidate
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">Your decision</p>
      {previous ? (
        <p className="mt-2 text-sm text-slate">
          Last round&apos;s target was <span className="font-mono text-amber">{formatNumber(previous.target)}</span>. The simulated players have seen it too.
        </p>
      ) : (
        <p className="mt-2 text-sm text-slate">What number will you choose?</p>
      )}

      <div className="mt-8 flex items-end gap-4">
        <label htmlFor={inputId} className="sr-only">
          Your number, from {MIN_PICK} to {MAX_PICK}
        </label>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          maxLength={3}
          value={raw}
          onChange={(e) => setRaw(e.target.value.replace(/[^\d]/g, ""))}
          aria-invalid={showError}
          aria-describedby={showError ? errorId : undefined}
          className={cn(
            "w-[3.2ch] rounded-2xl border bg-transparent px-1 font-mono text-7xl font-medium tracking-tight text-bright tabular-nums transition-colors sm:text-8xl",
            "border-transparent hover:border-line focus:border-blue focus:outline-none",
            showError && "border-orange/70",
          )}
        />
        <div className="pb-4 text-sm text-faint">
          <span className="block">out of</span>
          <span className="font-mono text-slate">0–100</span>
        </div>
      </div>
      <p id={errorId} role="alert" className={cn("mt-2 min-h-5 text-sm text-orange-text", !showError && "invisible")}>
        {showError ? "Enter a whole number from 0 to 100." : ""}
      </p>

      <input
        type="range"
        min={MIN_PICK}
        max={MAX_PICK}
        step={1}
        value={sliderValue}
        onChange={(e) => setRaw(e.target.value)}
        aria-label="Choose your number"
        className="tq-range mt-4"
        style={{ ["--fill" as string]: `${sliderValue}%` }}
      />
      <div className="mt-1 flex justify-between font-mono text-[11px] text-faint" aria-hidden>
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>

      <button type="submit" disabled={pick === null} className={buttonClass("primary", "lg", "mt-10 w-full sm:w-auto")}>
        <Lock className="size-4" aria-hidden />
        Lock in {pick ?? "your number"}
      </button>
      <p className="mt-3 text-xs text-faint">Your pick stays in this browser tab. Nothing is sent or stored.</p>
    </form>
  );
}

function ResultPanel({ result: r, history }: { result: RoundResult; history: RoundResult[] }) {
  const reduce = useReducedMotion();
  const stagger = reduce ? 0 : 1;
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">Round {r.round} result</p>
      <motion.p
        role="status"
        className={cn("mt-2 text-2xl font-semibold tracking-tight sm:text-[1.75rem]", r.outcome === "lost" ? "text-bright" : "text-amber")}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 * stagger, duration: 0.4, ease: EASE }}
      >
        {outcomeHeadline(r)}
      </motion.p>

      <NumberLine result={r} />

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
        <Stat label="Your pick" value={String(r.pick)} tone="blue" />
        <Stat label="Average of 9" value={formatNumber(r.average)} />
        <Stat label="Target (⅔)" value={formatNumber(r.target)} tone="amber" />
        <Stat label="Your distance" value={formatNumber(r.distance)} />
      </dl>

      <motion.div
        className="mt-6 rounded-2xl border border-line bg-navy/30 p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 * stagger, duration: 0.45, ease: EASE }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan">Why it happened</p>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-light">
          <p>{pickReading(r.pick)}</p>
          <p>{groupReading(r)}</p>
          <p className="text-bright">{lesson(r)}</p>
        </div>
      </motion.div>

      <GroupPicks result={r} />
      {history.length > 1 ? <TargetTrail history={history} /> : null}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "blue" | "amber" }) {
  return (
    <div className="bg-ink-raised px-4 py-3">
      <dt className="text-xs text-slate">{label}</dt>
      <dd className={cn("mt-1 font-mono text-xl tabular-nums", tone === "blue" ? "text-blue-text" : tone === "amber" ? "text-amber" : "text-bright")}>
        {value}
      </dd>
    </div>
  );
}

/** 0–100 axis: the eight simulated picks, yours, the average and the target. Markers travel from 50 to their values. */
function NumberLine({ result: r }: { result: RoundResult }) {
  const reduce = useReducedMotion();
  const winners = new Set(r.winners);
  // Stack picks that share a value so none hide another.
  const seen = new Map<number, number>();
  const level = (v: number) => {
    const n = seen.get(v) ?? 0;
    seen.set(v, n + 1);
    return n;
  };
  const youLevel = level(r.pick);
  const others = r.others.map((v, i) => ({ v, i: i + 1, lvl: level(v) }));
  const move = (delay: number) => ({ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : delay, ease: EASE });

  return (
    <figure className="mt-8" aria-label={`Number line from 0 to 100. Your pick ${r.pick}, average ${formatNumber(r.average)}, target ${formatNumber(r.target)}. Simulated picks: ${r.others.join(", ")}.`}>
      <div className="relative h-36 select-none" aria-hidden>
        {/* Axis */}
        <div className="absolute inset-x-0 bottom-8 h-px bg-line-strong" />
        {[0, 25, 50, 75, 100].map((t) => (
          <div key={t} className="absolute bottom-0 -translate-x-1/2 text-center" style={{ left: `${t}%` }}>
            <div className="mx-auto mb-1.5 h-2 w-px bg-line-strong" />
            <span className="font-mono text-[10px] text-faint">{t}</span>
          </div>
        ))}

        {/* Target zone and markers */}
        <motion.div
          className="absolute bottom-8 top-1 w-px bg-amber"
          initial={{ left: "50%", opacity: 0 }}
          animate={{ left: `${r.target}%`, opacity: 1 }}
          transition={move(0.55)}
        >
          <span className="absolute -top-1 left-1.5 whitespace-nowrap rounded-md bg-amber/15 px-1.5 py-0.5 font-mono text-[10px] text-amber">
            target {formatNumber(r.target)}
          </span>
        </motion.div>
        <motion.div
          className="absolute bottom-8 top-9 w-px border-l border-dashed border-slate/70"
          initial={{ left: "50%", opacity: 0 }}
          animate={{ left: `${r.average}%`, opacity: 1 }}
          transition={move(0.35)}
        >
          <span className="absolute top-0 left-1.5 whitespace-nowrap font-mono text-[10px] text-slate">avg {formatNumber(r.average)}</span>
        </motion.div>

        {others.map((o) => (
          <motion.span
            key={o.i}
            className={cn(
              "absolute size-3 -translate-x-1/2 rounded-full border-2",
              winners.has(o.i) ? "border-amber bg-orange" : "border-orange/70 bg-ink-raised",
            )}
            style={{ bottom: `calc(2rem - 6px + ${o.lvl * 14}px)` }}
            initial={{ left: "50%", opacity: 0 }}
            animate={{ left: `${o.v}%`, opacity: 1 }}
            transition={move(0.05 * o.i)}
          />
        ))}
        <motion.span
          className={cn(
            "absolute z-10 flex size-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-blue shadow-[0_0_0_4px_rgb(37_99_235/0.25)]",
            winners.has(0) && "shadow-[0_0_0_5px_rgb(253_186_116/0.45)]",
          )}
          style={{ bottom: `calc(2rem - 10px + ${youLevel * 14}px)` }}
          initial={{ left: "50%", opacity: 0, scale: 0.6 }}
          animate={{ left: `${r.pick}%`, opacity: 1, scale: 1 }}
          transition={move(0.1)}
        >
          <span className="absolute -top-6 whitespace-nowrap rounded-md bg-blue px-1.5 py-0.5 text-[10px] font-semibold text-white">You</span>
        </motion.span>
      </div>
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate">
        <Legend className="size-2.5 rounded-full border-2 border-white bg-blue">Your pick</Legend>
        <Legend className="size-2.5 rounded-full border-2 border-orange/70">Simulated picks</Legend>
        <Legend className="h-3 w-px bg-amber">Target</Legend>
        <Legend className="h-3 w-px border-l border-dashed border-slate">Average</Legend>
      </figcaption>
    </figure>
  );
}

function Legend({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className={cn("inline-block", className)} />
      {children}
    </span>
  );
}

function GroupPicks({ result: r }: { result: RoundResult }) {
  const winners = new Set(r.winners);
  return (
    <div className="mt-6">
      <p className="text-xs text-slate">All nine picks this round</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        <li className={cn("rounded-lg border px-2.5 py-1 font-mono text-xs", winners.has(0) ? "border-amber/60 bg-amber/10 text-amber" : "border-blue/50 bg-blue/10 text-blue-text")}>
          You · {r.pick}
        </li>
        {r.others.map((v, i) => (
          <li
            key={SIMULATED_PLAYERS[i].id}
            className={cn("rounded-lg border px-2.5 py-1 font-mono text-xs", winners.has(i + 1) ? "border-amber/60 bg-amber/10 text-amber" : "border-line text-slate")}
          >
            {SIMULATED_PLAYERS[i].id} · {v}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-faint">Highlighted: closest to the target.</p>
    </div>
  );
}

function TargetTrail({ history }: { history: RoundResult[] }) {
  return (
    <div className="mt-6">
      <p className="text-xs text-slate">Target by round</p>
      <ol className="mt-2 flex flex-wrap items-center gap-2 font-mono text-sm">
        {history.map((h, i) => (
          <li key={h.round} className="flex items-center gap-2">
            {i > 0 ? <ArrowRight className="size-3 text-faint" aria-hidden /> : null}
            <span className={i === history.length - 1 ? "text-amber" : "text-slate"}>
              <span className="sr-only">Round {h.round}: </span>
              {formatNumber(h.target)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Full disclosure of the simulated group. */
function GroupRules() {
  return (
    <details className="group mt-4 rounded-xl border border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2.5 text-sm text-light [&::-webkit-details-marker]:hidden">
        How the simulated players choose
        <span className="text-faint transition-transform group-open:rotate-45" aria-hidden>
          +
        </span>
      </summary>
      <div className="border-t border-line px-3 pb-3 pt-2 text-sm leading-relaxed text-slate">
        <p>
          Each player starts from an anchor: <Num>50</Num> in round 1, then the previous round&apos;s average of all {PLAYERS} picks.
          They multiply the anchor by ⅔ as many times as their depth, round to the nearest whole number, then add a fixed
          personal offset. No randomness: the same picks always give the same result.
        </p>
        <table className="mt-3 w-full text-left font-mono text-xs">
          <caption className="sr-only">Simulated players</caption>
          <thead className="text-faint">
            <tr>
              <th scope="col" className="py-1 font-normal">Player</th>
              <th scope="col" className="py-1 font-normal">Reasoning</th>
              <th scope="col" className="py-1 text-right font-normal">Offset</th>
            </tr>
          </thead>
          <tbody>
            {SIMULATED_PLAYERS.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <td className="py-1.5 text-light">{p.id}</td>
                <td className="py-1.5 font-sans">{DEPTH_LABELS[p.depth]}</td>
                <td className="py-1.5 text-right">{p.offset > 0 ? `+${p.offset}` : p.offset}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3">
          Distances are compared exactly. Numbers on screen are rounded to two decimals. Five rounds per game.
        </p>
      </div>
    </details>
  );
}
