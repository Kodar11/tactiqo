import { TriangleAlert } from "lucide-react";

import { Container } from "@/components/ui/container";
import { formatDate, legalReady } from "@/lib/site-config";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

/** A fact the owner still has to supply. Shown plainly so a draft can never pass for a final document. */
export function Missing({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-dashed border-amber/60 bg-amber/10 px-1.5 py-0.5 font-mono text-[0.85em] text-amber">
      [{children}]
    </span>
  );
}

export function LegalLayout({
  title,
  intro,
  effectiveDate,
  sections,
}: {
  title: string;
  intro: React.ReactNode;
  effectiveDate: string | null;
  sections: LegalSection[];
}) {
  const ready = legalReady() && effectiveDate !== null;
  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-text">Legal</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-bright sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-slate">
          {effectiveDate ? <>Effective {formatDate(effectiveDate)}</> : <Missing>effective date to be set by the owner</Missing>}
        </p>
        {!ready ? (
          <div role="note" className="mt-6 flex gap-3 rounded-2xl border border-amber/30 bg-amber/[0.06] p-4 text-sm leading-relaxed text-light">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />
            <p>
              <strong className="font-semibold text-amber">Draft.</strong> This document describes how Tactiqo works today, but it is
              not final: items in brackets must be confirmed by the owner, and it has not been reviewed by a lawyer. It is not
              listed in search engines until it is complete.
            </p>
          </div>
        ) : null}
        <div className="mt-6 text-lg leading-relaxed text-slate">{intro}</div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Contents" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-faint">Contents</p>
          <ol className="mt-3 space-y-2 border-l border-line text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-slate transition-colors hover:border-blue hover:text-bright">
                  <span className="mr-2 font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose-tq max-w-[68ch]">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24">
              <h2 id={`${s.id}-h`} className={i === 0 ? "!mt-0" : undefined}>
                <span className="mr-3 font-mono text-sm font-normal text-faint">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </article>
      </div>
    </Container>
  );
}
