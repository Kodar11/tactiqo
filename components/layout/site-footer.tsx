import Link from "next/link";

import { Brand } from "@/components/layout/brand";
import { site } from "@/lib/site-config";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Support" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <Brand />
          <p className="mt-4 text-sm leading-relaxed text-slate">
            A strategic-thinking app. Make decisions in games and real-world scenarios, see what follows, and understand why.
          </p>
          {site.playStoreUrl ? (
            <a
              href={site.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-blue-text hover:text-bright"
              data-event="download_click"
            >
              Get Tactiqo on Google Play
            </a>
          ) : null}
        </div>
        <nav aria-label="Footer" className="md:justify-self-end">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-slate transition-colors hover:text-bright">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-6xl px-4 py-6 text-xs text-faint sm:px-6 lg:px-8">
          © {site.copyrightYear} {site.owner.name ?? site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
