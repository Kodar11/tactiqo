import type { Metadata } from "next";
import Link from "next/link";

import { DataRegion, MinimumAge, SupportContact } from "@/components/legal-facts";
import { LegalLayout, type LegalSection } from "@/components/legal-layout";
import { legalReady, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What the Tactiqo website and app collect, why, where it is stored, and the choices you have.",
  alternates: site.url ? { canonical: "/privacy" } : undefined,
  robots: legalReady() ? undefined : { index: false, follow: true },
};

const sections: LegalSection[] = [
  {
    id: "who",
    title: "Who is responsible",
    body: (
      <>
        <p>
          This policy covers Tactiqo: the website and the mobile app. For any question or request about the information
          described here, contact us at <SupportContact />.
        </p>
      </>
    ),
  },
  {
    id: "summary",
    title: "The short version",
    body: (
      <ul>
        <li>
          <strong>The website</strong> has no accounts, forms, analytics or cookies of its own. The demo runs entirely in your
          browser.
        </li>
        <li>
          <strong>The app</strong> doesn&apos;t ask for your name, email or phone number. It creates an anonymous ID on first launch
          and saves your learning progress and game results under that ID on the app&apos;s server.
        </li>
        <li>
          If you choose a <strong>nickname</strong>, it is public on leaderboards and friend challenges.
        </li>
        <li>We don&apos;t sell your information, show ads, or use advertising or analytics SDKs.</li>
      </ul>
    ),
  },
  {
    id: "website",
    title: "The website",
    body: (
      <>
        <p>
          <strong>Interactive demo.</strong> The numbers you pick in the Two-Thirds demo are processed in your browser only. They
          are not sent to us or stored.
        </p>
        <p>
          <strong>Cookies and tracking.</strong> The website sets no cookies and uses no analytics, advertising or tracking
          technologies. Fonts and images are served from the website itself.
        </p>
        <p>
          <strong>Server logs.</strong> Like any website, the server that delivers these pages receives technical information
          with each request, such as your IP address, browser type and the page requested, and may log it for security and
          reliability. The site is hosted by Vercel, which handles this information under its own privacy policy.
        </p>
        <p>
          <strong>Contact.</strong> If you email us, we receive your email address and whatever you write, and use them only to
          reply and to fix the problem you report.
        </p>
      </>
    ),
  },
  {
    id: "app",
    title: "What the app stores",
    body: (
      <>
        <h3>An anonymous account</h3>
        <p>
          On first launch the app signs in anonymously with our backend service. This creates a user ID with no name, email or
          password attached. The ID and its session token are kept on your device so the app can reconnect to your progress.
        </p>
        <h3>Learning progress (on our server, linked to that ID)</h3>
        <ul>
          <li>Lessons you have completed, and the step you reached in a lesson in progress.</li>
          <li>Scenarios you have played: your predictions, the choices you made and the result.</li>
          <li>Practice challenge answers and drafts, and checkpoint answers and scores.</li>
          <li>Each prediction or answer you give, with the confidence rating you choose and how it was evaluated.</li>
          <li>Your learning goal, if you pick one.</li>
          <li>Your official Daily Challenge answer for each day you take part.</li>
        </ul>
        <h3>Games (on our server, linked to that ID)</h3>
        <ul>
          <li>
            A history of the practice games you play: the game, opponent, difficulty, scores, outcome and when you played (and,
            in Rock, Paper, Scissors, your guess about the opponent).
          </li>
          <li>
            Game of the Week and friend-challenge matches, which are played on the server round by round, and the resulting
            leaderboard positions and weekly results.
          </li>
          <li>
            Friend challenges you create: a random link token, the game settings and an expiry date (30 days). Anyone with the
            link can open the challenge.
          </li>
        </ul>
        <h3>Your nickname (optional and public)</h3>
        <p>
          You can choose a nickname during setup or later in Settings, or skip it. If you set one, other players see it on
          leaderboards, in the Hall of Fame and on friend challenges. Without one you appear as &ldquo;Anonymous player&rdquo;.
          Please don&apos;t use your real name or anything that identifies you.
        </p>
        <h3>Your Thinking Profile</h3>
        <p>
          The profile is calculated on your device from your saved predictions and answers. It is not stored as a separate
          record.
        </p>
        <h3>On your device only</h3>
        <p>
          Your settings (reduce motion, haptics, whether you have finished the welcome screens), which games&apos; rules you have
          already read, the session token, and a short queue of changes that haven&apos;t reached the server yet.
        </p>
        <h3>What the app does not collect</h3>
        <p>
          The app does not ask for or access your location, contacts, photos, camera or microphone, and contains no advertising,
          analytics or crash-reporting SDKs.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "How the information is used",
    body: (
      <ul>
        <li>To save your progress and restore it when you open the app.</li>
        <li>To calculate your Thinking Profile and suggest what to try next.</li>
        <li>To run competitive and friend-challenge matches fairly, and to produce leaderboards and the Hall of Fame.</li>
        <li>
          To protect the service: for example, limiting how many challenges or practice logs one account can create per day, and
          rejecting tampered results.
        </li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "Who receives it",
    body: (
      <>
        <p>
          <strong>Our backend provider.</strong> App data is stored and processed by Supabase, which provides the database and
          anonymous sign-in on our behalf. Data is held in <DataRegion />.
        </p>
        <p>
          <strong>Website hosting.</strong> The website is hosted by Vercel, which receives the technical request information
          described above.
        </p>
        <p>
          <strong>Other players</strong> see your nickname (if any), scores and ranks on leaderboards, and your result on a
          friend challenge once both of you have played. They never see your user ID.
        </p>
        <p>
          <strong>When you share.</strong> Inviting a friend or exporting your learning data uses your device&apos;s share sheet.
          What you share, and with whom, is up to you.
        </p>
        <p>
          <strong>App stores.</strong> If you download the app from an app store, that store processes your download under its
          own privacy policy.
        </p>
        <p>We do not sell personal information or share it for advertising.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long it is kept",
    body: (
      <>
        <p>
          App data is kept until your account is deleted, either by you in the app or by us at your request. The app&apos;s
          backend does not delete it on a schedule. Results of finished Game of the Week competitions are kept as a record of
          each week while the players&apos; accounts exist.
        </p>
        <p>
          Because the account is anonymous, it lives on your device: if you reinstall the app, clear its data or switch devices,
          the app starts a new anonymous account and can no longer reach the old progress, which remains on the server. The
          in-app option can then only delete the new account; to delete the old one, contact us (see{" "}
          <Link href="/delete-account">Delete Your Account</Link>).
        </p>
      </>
    ),
  },
  {
    id: "choices",
    title: "Your choices and rights",
    body: (
      <>
        <ul>
          <li>
            <strong>Export:</strong> Settings → Learning data → <em>Export data</em> saves your predictions, answers and
            lesson progress as a JSON file.
          </li>
          <li>
            <strong>Reset:</strong> Settings → Progress → <em>Reset progress</em> clears completed lessons, lessons in progress,
            and your recorded predictions and challenge answers. Your goal and official Daily Challenge answers are kept.
          </li>
          <li>
            <strong>Nickname:</strong> skip it, or change it at any time in Settings.
          </li>
          <li>
            <strong>Delete account:</strong> Settings → Account → <em>Delete account</em>, then confirm. See below.
          </li>
        </ul>
        <h3>Deleting your account</h3>
        <p>
          After you confirm, the app asks our server to delete your anonymous account. The server deletes your anonymous sign-in
          record and, with it, everything stored under it: lesson progress, predictions and answers, scenario and checkpoint
          results, challenge drafts, your learning goal, Daily Challenge answers, your nickname (which becomes free for others),
          practice game history, Game of the Week results, and friend challenges you created together with the matches others
          played on them. The app reports success only once the server confirms. It then signs out on your device, clears the
          progress and pending changes held there, and starts again as a new anonymous player. Your device preferences (reduce
          motion, haptics) are kept.
        </p>
        <p>Some limits to be aware of:</p>
        <ul>
          <li>Deletion can&apos;t be undone. To keep a copy, use <em>Export data</em> first.</li>
          <li>Finished weekly rankings aren&apos;t recalculated, so other players keep the ranks they had.</li>
          <li>Files you exported or shared stay wherever you saved or sent them.</li>
          <li>
            Deletion removes the data from the live database. Our backend provider may keep backups of the database, and we
            can&apos;t confirm that copies in them are removed at the same time.
          </li>
          <li>
            If deletion fails (for example, with no connection), the app tells you and nothing is deleted. Try again, or close and
            reopen the app if it says your session couldn&apos;t be confirmed.
          </li>
        </ul>
        <p>
          If you can&apos;t delete your account in the app, email <SupportContact /> and include your nickname if you set one, as
          the app doesn&apos;t show an account ID. See <Link href="/delete-account">Delete Your Account</Link>.
        </p>
        <p>
          Depending on where you live, you may have rights to access, correct, delete or object to the processing of your
          personal information, and to complain to a data protection authority. Contact us to exercise them.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        Data is sent to the server over encrypted connections. Database access rules allow each anonymous account to read and
        change only its own progress, and scores in competitive matches are calculated by the server, not the app. No system is
        perfectly secure, so we can&apos;t guarantee absolute security, but we work to protect your information.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Tactiqo is intended for people aged <MinimumAge /> and over. Because nicknames are public, we ask younger players not to
        use names that identify them. If you believe a child has provided personal information, contact us and we will delete
        it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If we change how Tactiqo handles information, we will update this page and its effective date. For significant changes
        we will also give notice on this website or in the app before they take effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions or requests about privacy: <SupportContact />. You can also visit the <Link href="/contact">Support</Link> page.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      effectiveDate={site.legal.privacyEffectiveDate}
      intro={
        <p>
          This policy explains what information the Tactiqo website and the Tactiqo app handle, why, and what you can do about it.
          The website and the app work differently, so they are described separately.
        </p>
      }
      sections={sections}
    />
  );
}
