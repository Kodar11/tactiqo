import type { Metadata } from "next";
import Link from "next/link";
import { Bug, Mail, MessageCircleQuestion, Sparkles, TriangleAlert } from "lucide-react";

import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Support",
  description: "Report a problem, ask a question or send feedback about Tactiqo.",
  alternates: site.url ? { canonical: "/contact" } : undefined,
};

const REASONS = [
  {
    icon: Bug,
    title: "Report a problem",
    body: "Tell us what you were doing, what you expected and what happened instead. Your phone model, Android version and the app version (from the store listing) help a lot.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Ask a question",
    body: "About a lesson, a game's rules, your data, or anything in the Privacy Policy or Terms.",
  },
  {
    icon: Sparkles,
    title: "Share feedback",
    body: "A scenario that confused you, an explanation that clicked, or an idea you'd like to explore.",
  },
];

export default function ContactPage() {
  return (
    <Container className="py-14 sm:py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-text">Support</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-bright sm:text-5xl">How can we help?</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate">Questions, problems and feedback all go to the same place.</p>
      </div>

      <div className="mt-10 max-w-2xl">
        {site.supportEmail ? (
          <div className="rounded-3xl border border-line-strong bg-ink-raised p-6 sm:p-8">
            <Mail className="size-5 text-blue-text" aria-hidden />
            <p className="mt-4 text-sm text-slate">Email</p>
            <a href={`mailto:${site.supportEmail}`} className="mt-1 block break-all text-2xl font-semibold text-bright hover:text-blue-text">
              {site.supportEmail}
            </a>
            <a href={`mailto:${site.supportEmail}?subject=Tactiqo%20support`} className={buttonClass("primary", "lg", "mt-6")}>
              Write to us
            </a>
          </div>
        ) : (
          <div role="note" className="flex gap-3 rounded-3xl border border-amber/30 bg-amber/[0.06] p-6 text-light">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber" aria-hidden />
            <div>
              <p className="font-semibold text-amber">No support channel is set up yet.</p>
              <p className="mt-2 text-sm leading-relaxed">
                No support email has been published yet, so there is currently no way to reach us through this website. We would
                rather say so than offer a form that goes nowhere.
              </p>
            </div>
          </div>
        )}
      </div>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {REASONS.map((r) => (
          <li key={r.title} className="bg-ink p-6 sm:p-8">
            <r.icon className="size-5 text-blue-text" aria-hidden />
            <h2 className="mt-4 text-lg font-semibold text-bright">{r.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate">{r.body}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-slate">
        Looking for how your data is handled? See the <Link href="/privacy" className="text-blue-text underline underline-offset-4">Privacy Policy</Link>.
        You can export or reset your learning data yourself in the app under Settings.
      </p>
    </Container>
  );
}
