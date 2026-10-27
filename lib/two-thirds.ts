/**
 * The Two-Thirds Guessing Game, as played in the website demo. Pure and deterministic: the same picks always give the
 * same result, so every claim the demo makes can be tested.
 *
 * Rules (the same core rules as the app's Two-Thirds Guess):
 * - Everyone picks a whole number from 0 to 100.
 * - Target = ⅔ × the average of all nine picks, the visitor's included.
 * - Closest to the target wins. Distances are compared exactly as |27·pick − 2·sum| (= 27·|pick − target|), an
 *   integer, so no rounding can change a result. Displayed numbers are rounded to two decimals.
 * - Exact ties share the win.
 *
 * The simulated group (disclosed on the page): eight fixed reasoning rules, no randomness, no real people.
 * Each player picks round(anchor × (⅔)^depth) + offset, clamped to 0–100. The anchor is 50 (the midpoint) in round 1,
 * and the previous round's average afterwards, so the group adapts between rounds only through that anchor.
 */

export const MIN_PICK = 0;
export const MAX_PICK = 100;
export const MAX_ROUNDS = 5;
export const FIRST_ANCHOR = 50;

export interface SimulatedPlayer {
  id: string;
  /** How many times the player applies "⅔ of what I expect". */
  depth: number;
  /** A fixed personal nudge, so players with the same depth don't pick the same number. */
  offset: number;
}

export const SIMULATED_PLAYERS: readonly SimulatedPlayer[] = [
  { id: "S1", depth: 0, offset: 12 },
  { id: "S2", depth: 0, offset: -5 },
  { id: "S3", depth: 1, offset: 4 },
  { id: "S4", depth: 1, offset: 0 },
  { id: "S5", depth: 1, offset: -3 },
  { id: "S6", depth: 2, offset: 2 },
  { id: "S7", depth: 2, offset: -2 },
  { id: "S8", depth: 3, offset: 0 },
];

export const PLAYERS = SIMULATED_PLAYERS.length + 1;

export const DEPTH_LABELS = ["Anchors on the expected average", "One step ahead", "Two steps ahead", "Three steps ahead"];

/** Half-up rounding that is exact for the values used here (no float drift at .5). */
export function roundHalfUp(x: number): number {
  return Math.floor(x + 0.5 + 1e-9);
}

const clamp = (n: number) => Math.min(MAX_PICK, Math.max(MIN_PICK, n));

export function isValidPick(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= MIN_PICK && value <= MAX_PICK;
}

/** Parses what a visitor typed. Returns null for anything that isn't a whole number in range. */
export function parsePick(raw: string): number | null {
  const trimmed = raw.trim();
  if (!/^\d{1,3}$/.test(trimmed)) return null;
  const n = Number(trimmed);
  return isValidPick(n) ? n : null;
}

export function simulatedPick(player: SimulatedPlayer, anchor: number): number {
  return clamp(roundHalfUp(anchor * (2 / 3) ** player.depth) + player.offset);
}

export function simulatedPicks(anchor: number): number[] {
  return SIMULATED_PLAYERS.map((p) => simulatedPick(p, anchor));
}

export interface RoundResult {
  round: number;
  anchor: number;
  pick: number;
  /** In SIMULATED_PLAYERS order. */
  others: number[];
  sum: number;
  average: number;
  target: number;
  /** 27·|pick − target| for the visitor, exact. */
  scaledDistance: number;
  /** |pick − target|, for display. */
  distance: number;
  /** Indexes of the winning picks: 0 = the visitor, 1–8 = simulated players S1–S8. */
  winners: number[];
  outcome: "won" | "shared" | "lost";
  /** The closest simulated pick when the visitor didn't win alone. */
  closestOther: number;
}

/** 3n·|pick − target| as an integer. With n = 9 this is |27·pick − 2·sum|. */
export const scaledDistanceOf = (pick: number, sum: number) => Math.abs(3 * PLAYERS * pick - 2 * sum);

export function playRound(pick: number, round = 1, anchor = FIRST_ANCHOR): RoundResult {
  if (!isValidPick(pick)) throw new RangeError(`pick must be a whole number from ${MIN_PICK} to ${MAX_PICK}`);
  const others = simulatedPicks(anchor);
  const all = [pick, ...others];
  const sum = all.reduce((s, x) => s + x, 0);
  const distances = all.map((x) => scaledDistanceOf(x, sum));
  const best = Math.min(...distances);
  const winners = distances.flatMap((d, i) => (d === best ? [i] : []));
  const youWon = winners.includes(0);
  const closestOtherIndex = distances.slice(1).reduce((bi, d, i, arr) => (d < arr[bi] ? i : bi), 0);
  return {
    round,
    anchor,
    pick,
    others,
    sum,
    average: sum / PLAYERS,
    target: (2 * sum) / (3 * PLAYERS),
    scaledDistance: distances[0],
    distance: distances[0] / (3 * PLAYERS),
    winners,
    outcome: youWon ? (winners.length === 1 ? "won" : "shared") : "lost",
    closestOther: others[closestOtherIndex],
  };
}

/** The anchor the simulated group uses after `previous`: that round's average. */
export const nextAnchor = (previous: RoundResult) => previous.average;

/** Plays a sequence of visitor picks as consecutive rounds. */
export function playRounds(picks: number[]): RoundResult[] {
  const results: RoundResult[] = [];
  for (const [i, pick] of picks.entries()) {
    const anchor = i === 0 ? FIRST_ANCHOR : nextAnchor(results[i - 1]);
    results.push(playRound(pick, i + 1, anchor));
  }
  return results;
}

/** The largest target any round can produce (everyone picks 100). */
export const MAX_TARGET = (2 / 3) * MAX_PICK;

/**
 * Roughly how many "⅔ of what others pick" steps a pick corresponds to, starting from 50.
 * null when the pick is above 50 (not a level of this chain) or 0 (the end of the chain).
 */
export function reasoningSteps(pick: number): number | null {
  if (pick <= 0 || pick > FIRST_ANCHOR) return null;
  return Math.max(0, Math.round(Math.log(pick / FIRST_ANCHOR) / Math.log(2 / 3)));
}

export const formatNumber = (x: number) => (Number.isInteger(x) ? String(x) : x.toFixed(2));
