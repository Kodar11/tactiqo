import assert from "node:assert/strict";
import { test } from "node:test";

import {
  MAX_TARGET,
  parsePick,
  playRound,
  playRounds,
  reasoningSteps,
  roundHalfUp,
  scaledDistanceOf,
  simulatedPicks,
} from "../two-thirds.ts";

test("round 1 simulated picks are fixed and documented", () => {
  assert.deepEqual(simulatedPicks(50), [62, 45, 37, 33, 30, 24, 20, 15]);
});

test("average and target use all nine picks, the visitor's included", () => {
  const r = playRound(33);
  assert.equal(r.sum, 266 + 33);
  assert.equal(r.average, 299 / 9);
  assert.equal(r.target, (2 * 299) / 27);
  assert.equal(r.target.toFixed(2), "22.15");
});

test("a pick of 22 wins outright in round 1", () => {
  const r = playRound(22);
  assert.equal(r.target.toFixed(2), "21.33");
  assert.equal(r.outcome, "won");
  assert.deepEqual(r.winners, [0]);
});

test("a pick of 33 loses to the simulated 24", () => {
  const r = playRound(33);
  assert.equal(r.outcome, "lost");
  assert.deepEqual(r.winners, [6]); // S6 picked 24
  assert.equal(r.closestOther, 24);
});

test("the equilibrium pick of 0 does not win against this group", () => {
  const r = playRound(0);
  assert.equal(r.outcome, "lost");
  assert.equal(r.target.toFixed(2), "19.70");
  assert.equal(r.closestOther, 20);
});

test("exact ties share the win", () => {
  // Visitor 20 ties S7's 20 exactly: same pick, same distance.
  const r = playRound(20);
  assert.equal(r.outcome, "shared");
  assert.deepEqual(r.winners, [0, 7]);
});

test("distances are compared exactly, not after rounding", () => {
  for (let p = 0; p <= 100; p++) {
    const r = playRound(p);
    const exact = [p, ...r.others].map((x) => scaledDistanceOf(x, r.sum));
    const best = Math.min(...exact);
    assert.deepEqual(r.winners, exact.flatMap((d, i) => (d === best ? [i] : [])));
    assert.ok(Math.abs(r.distance - Math.abs(p - r.target)) < 1e-9);
  }
});

test("every pick from 0 to 100 resolves, and the target never exceeds 66.67", () => {
  for (let p = 0; p <= 100; p++) {
    const r = playRound(p);
    assert.ok(r.target <= MAX_TARGET);
    assert.ok(r.winners.length >= 1);
  }
});

test("later rounds anchor on the previous average, so the group moves down", () => {
  const [r1, r2, r3] = playRounds([33, 33, 33]);
  assert.equal(r2.anchor, r1.average);
  assert.equal(r3.anchor, r2.average);
  assert.ok(r2.target < r1.target);
  assert.ok(r3.target < r2.target);
});

test("rounds are reproducible", () => {
  assert.deepEqual(playRounds([10, 40, 0, 100, 7]), playRounds([10, 40, 0, 100, 7]));
});

test("simulated picks stay within 0–100 even when the anchor reaches 0", () => {
  for (const pick of simulatedPicks(0)) assert.ok(pick >= 0 && pick <= 100);
  for (const pick of simulatedPicks(100)) assert.ok(pick >= 0 && pick <= 100);
});

test("parsePick accepts whole numbers 0–100 only", () => {
  assert.equal(parsePick("0"), 0);
  assert.equal(parsePick(" 42 "), 42);
  assert.equal(parsePick("100"), 100);
  for (const bad of ["", "-1", "101", "4.5", "1e2", "abc", "0x10", "1000"]) assert.equal(parsePick(bad), null, bad);
});

test("playRound rejects invalid picks", () => {
  assert.throws(() => playRound(101));
  assert.throws(() => playRound(-1));
  assert.throws(() => playRound(2.5));
});

test("roundHalfUp rounds .5 up", () => {
  assert.equal(roundHalfUp(33.5), 34);
  assert.equal(roundHalfUp(33.49), 33);
  assert.equal(roundHalfUp(22.222), 22);
});

test("reasoningSteps maps the classic chain 50 → 33 → 22 → 15", () => {
  assert.equal(reasoningSteps(50), 0);
  assert.equal(reasoningSteps(33), 1);
  assert.equal(reasoningSteps(22), 2);
  assert.equal(reasoningSteps(15), 3);
  assert.equal(reasoningSteps(0), null);
  assert.equal(reasoningSteps(70), null);
});
