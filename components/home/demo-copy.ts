import { MAX_TARGET, type RoundResult, formatNumber, reasoningSteps } from "@/lib/two-thirds";

/**
 * The words the demo shows after a round. Every sentence is derived from the round's actual numbers, so the
 * explanation always matches the arithmetic on screen.
 */

export function outcomeHeadline(r: RoundResult): string {
  if (r.outcome === "won") return "You were closest. You win this round.";
  if (r.outcome === "shared") return `You tied for closest and share the win with ${r.winners.length - 1} simulated ${r.winners.length - 1 === 1 ? "player" : "players"}.`;
  return `The closest pick was ${r.closestOther}. You were ${formatNumber(r.distance)} away.`;
}

const STEP_WORDS = ["zero", "one", "two", "three", "four", "five", "six"];
const stepsPhrase = (k: number) => `${STEP_WORDS[k] ?? k} ${k === 1 ? "step" : "steps"}`;

/** What the visitor's own pick implies about how they reasoned. */
export function pickReading(pick: number): string {
  if (pick > Math.ceil(MAX_TARGET)) {
    return `The target can never be higher than ${formatNumber(MAX_TARGET)}, even if everyone picks 100. Whatever the others pick, ${pick} always leaves you further from the target than 67 would.`;
  }
  if (pick === 0) {
    return "0 is where perfect reasoning ends up: if everyone expects everyone else to keep cutting by a third, every pick is pulled down to 0. It is the game's only equilibrium.";
  }
  const k = reasoningSteps(pick);
  if (k === null) {
    return `A pick above 50 bets that the group will aim high. The ⅔ rule pulls the target below the average, so high picks rarely win.`;
  }
  if (k === 0) return "A pick near 50 treats the others as picking at random. The ⅔ rule then pulls the target well below that.";
  return `Your pick sits about ${stepsPhrase(k)} down the chain 50 → 33 → 22 → 15: each step is “⅔ of what I expect the others to pick”.`;
}

/** What the group's result says, compared with the visitor's reasoning. */
export function groupReading(r: RoundResult): string {
  const k = reasoningSteps(Math.max(1, Math.round(r.target)));
  const where = k === null ? "" : `, about where ${stepsPhrase(k)} of reasoning from 50 would land`;
  if (r.pick === 0 && r.outcome === "lost") {
    return `But this group didn't reason all the way down. The target was ${formatNumber(r.target)}${where}, so 0 was too low to win here.`;
  }
  return `This group's average was ${formatNumber(r.average)}, so the target was ${formatNumber(r.target)}${where}.`;
}

export function lesson(r: RoundResult): string {
  if (r.round === 1) {
    return "That is the strategic part: the best number depends on how far ahead you expect the others to think, not on the arithmetic alone.";
  }
  return `The group adjusted: each simulated player now started from last round's average (${formatNumber(r.anchor)}). In this model, repeated play pulls the whole group toward 0.`;
}
