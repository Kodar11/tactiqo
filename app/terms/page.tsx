import type { Metadata } from "next";
import Link from "next/link";

import { MinimumAge, SupportContact } from "@/components/legal-facts";
import { LegalLayout, type LegalSection } from "@/components/legal-layout";
import { legalReady, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms for using the Tactiqo website and app.",
  alternates: site.url ? { canonical: "/terms" } : undefined,
  robots: legalReady() ? undefined : { index: false, follow: true },
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Accepting these terms",
    body: (
      <p>
        These terms apply to the Tactiqo website and the Tactiqo mobile app (together, &ldquo;Tactiqo&rdquo; or &ldquo;the
        service&rdquo;). By using Tactiqo you agree to them. If you don&apos;t agree, please don&apos;t use it.
      </p>
    ),
  },
  {
    id: "purpose",
    title: "What Tactiqo is for",
    body: (
      <>
        <p>
          Tactiqo is an educational tool. Its lessons, scenarios, games and Thinking Profile are designed to help you explore ideas
          from strategic reasoning and game theory.
        </p>
        <p>
          Tactiqo does not give financial, legal, business, negotiation, medical or other professional advice, and it doesn&apos;t
          promise any particular learning or real-world result.
        </p>
      </>
    ),
  },
  {
    id: "models",
    title: "Simplified models, not predictions",
    body: (
      <p>
        Scenarios and games use simplified models with stated rules, illustrative numbers and simulated or bot players. They show
        how reasoning works under those assumptions. They are not predictions of how real people, markets or situations will
        behave, and outcomes in Tactiqo say nothing definitive about your abilities.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "Who can use Tactiqo",
    body: (
      <p>
        You must be at least <MinimumAge /> years old, or have permission from a parent or guardian where the law requires it.
      </p>
    ),
  },
  {
    id: "account",
    title: "Your anonymous account",
    body: (
      <>
        <p>
          The app works without registration: it creates an anonymous account tied to your installation. Progress is saved to
          our server under that account. Reinstalling the app, clearing its data or changing devices starts a new account, and
          the previous progress can no longer be reached from the app. The <Link href="/privacy">Privacy Policy</Link> explains
          what is stored.
        </p>
        <p>
          You can stop using Tactiqo at any time, and you can delete your account in the app under Settings → Account →{" "}
          <em>Delete account</em>. Deleting is permanent: your progress, nickname and game records are removed and can&apos;t be
          restored. If you can&apos;t delete it in the app, email <SupportContact />.{" "}
          <Link href="/delete-account">Delete Your Account</Link> explains what is removed.
        </p>
      </>
    ),
  },
  {
    id: "conduct",
    title: "Nicknames and fair play",
    body: (
      <>
        <p>When you use Tactiqo, please don&apos;t:</p>
        <ul>
          <li>choose a nickname that is offensive, impersonates someone, or contains personal information;</li>
          <li>use automated tools, modified apps or multiple accounts to gain an advantage in the Game of the Week or leaderboards;</li>
          <li>exploit bugs, interfere with the service, or try to access data that isn&apos;t yours;</li>
          <li>use Tactiqo to break the law or to harm others.</li>
        </ul>
        <p>
          If these rules are broken we may remove a nickname, exclude results from leaderboards, or restrict access to competitive
          features.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        The Tactiqo name and icon, the lessons, scenarios, illustrations, games and software belong to Tactiqo or its
        licensors. You may use Tactiqo for your own personal, non-commercial learning. Please don&apos;t copy, resell or
        republish its content without permission. Sharing a friend-challenge link or your own exported data is fine.
      </p>
    ),
  },
  {
    id: "availability",
    title: "Availability and changes",
    body: (
      <p>
        The app needs an internet connection to load lessons and save progress. We work to keep Tactiqo available but can&apos;t
        promise it will always be uninterrupted or error-free. We may change, add or remove content and features, including
        competitions and leaderboards, and may suspend the service for maintenance.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services and links",
    body: (
      <p>
        Tactiqo relies on third-party services, such as its backend provider and the app store you download from, which have their
        own terms. Links to other websites are provided for convenience; we aren&apos;t responsible for their content.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers and liability",
    body: (
      <p>
        To the extent the law allows, Tactiqo is provided &ldquo;as is&rdquo; without warranties of any kind, and we are not
        liable for indirect or consequential losses, or for decisions you make based on what you explore in Tactiqo. Nothing in
        these terms limits rights you have under consumer law that cannot be excluded.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms. We will change the effective date above, and give notice on this website or in the app for
        significant changes. Continuing to use Tactiqo after changes take effect means you accept them.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms: <SupportContact />.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      effectiveDate={site.legal.termsEffectiveDate}
      intro={<p>The rules for using the Tactiqo website and app, written to be read.</p>}
      sections={sections}
    />
  );
}
