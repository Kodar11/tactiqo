import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Smartphone } from "lucide-react";

import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: "How to delete your Tactiqo account and the data stored with it, in the app or by email.",
  alternates: site.url ? { canonical: "/delete-account" } : undefined,
};

/*
 * Describes the app's Settings → Account → Delete account (audited from the `strategic-game` repository, October 2026:
 * app/settings.tsx, src/data/session.ts and the delete_my_account migration). Update this page if that flow changes.
 */

const MAIL_SUBJECT = "Tactiqo account deletion request";

const STEPS = [
  <>Open the app and tap the gear icon to open Settings.</>,
  <>
    Under <strong className="font-semibold text-light">Account</strong>, tap <em>Delete account</em>.
  </>,
  <>
    Read what will be deleted, then tap <em>Delete account</em> again to confirm, or <em>Cancel</em> to keep your account.
  </>,
];

const DELETED = [
  "Your anonymous sign-in record",
  "Lesson progress, predictions and answers",
  "Scenario, practice challenge and checkpoint results",
  "Your learning goal and Daily Challenge answers",
  "Your nickname, which becomes free for others",
  "Practice game history and Game of the Week results",
  "Friend challenges you created, with the matches others played on them",
];

const LIMITS = [
  "Deletion can't be undone. To keep a copy, use Settings → Learning data → Export data first.",
  "Finished weekly rankings aren't recalculated, so other players keep the ranks they had.",
  "Files you exported or shared stay wherever you saved or sent them.",
  "Deletion removes your data from the live database. Our backend provider may keep database backups, and we can't confirm that copies in them are removed at the same time.",
];

export default function DeleteAccountPage() {
  const email = site.supportEmail;
  return (
    <Container className="py-14 sm:py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-text">Account</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-bright sm:text-5xl">Delete Your Account</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate">
          You can delete your Tactiqo account and the data stored with it, including the anonymous account the app creates on
          first launch, from the app&apos;s Settings. If that doesn&apos;t work for you, email us.
        </p>
      </div>

      <div className="mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        <section aria-labelledby="in-app-h" className="rounded-3xl border border-line-strong bg-ink-raised p-6 sm:p-8">
          <Smartphone className="size-5 text-blue-text" aria-hidden />
          <h2 id="in-app-h" className="mt-4 text-lg font-semibold text-bright">
            In the app
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate">
            {STEPS.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-slate">
            You need an internet connection. The app reports success only once our server confirms the deletion.
          </p>
        </section>

        <section aria-labelledby="email-h" className="rounded-3xl border border-line bg-ink p-6 sm:p-8">
          <Mail className="size-5 text-blue-text" aria-hidden />
          <h2 id="email-h" className="mt-4 text-lg font-semibold text-bright">
            By email
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            If you can&apos;t use the in-app option, for example because you reinstalled the app and want an older account
            deleted, write to
          </p>
          {email ? (
            <>
              <a href={`mailto:${email}`} className="mt-1 block break-all text-xl font-semibold text-bright hover:text-blue-text">
                {email}
              </a>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Include your nickname if you set one, as the app doesn&apos;t show an account ID. You don&apos;t need to send your
                real name or other personal details. Email requests are handled by hand, so they take longer.
              </p>
              <a
                href={`mailto:${email}?subject=${encodeURIComponent(MAIL_SUBJECT)}`}
                className={buttonClass("secondary", "md", "mt-5")}
              >
                Email a request
              </a>
            </>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-slate">
              the address on the <Link href="/contact" className="text-blue-text underline underline-offset-4">Support</Link> page.
            </p>
          )}
        </section>
      </div>

      <div className="mt-14 grid max-w-4xl gap-10 md:grid-cols-2">
        <section aria-labelledby="deleted-h">
          <h2 id="deleted-h" className="text-lg font-semibold text-bright">
            What is deleted
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate">
            {DELETED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            On your device, the app then signs out, clears the progress it held, and starts again as a new anonymous player.
            Your device preferences (reduce motion, haptics) are kept.
          </p>
        </section>

        <section aria-labelledby="limits-h">
          <h2 id="limits-h" className="text-lg font-semibold text-bright">
            Good to know
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate">
            {LIMITS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 id="fails-h" className="mt-8 text-lg font-semibold text-bright">
            If deletion fails
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            The app shows a message and nothing is deleted: your account still exists. Check your connection and try again. If
            it says your session couldn&apos;t be confirmed, close and reopen the app first. If it keeps failing, email us. More
            detail is in the <Link href="/privacy#choices" className="text-blue-text underline underline-offset-4">Privacy Policy</Link>.
          </p>
        </section>
      </div>
    </Container>
  );
}
