import Link from "next/link";

import { Missing } from "@/components/legal-layout";
import { site } from "@/lib/site-config";

/** Owner-supplied facts, rendered either as the confirmed value or as a visible placeholder. */

export const DataRegion = () => <>{site.legal.dataRegion ?? <Missing>Supabase project region</Missing>}</>;

export const MinimumAge = () =>
  site.legal.minimumAge !== null ? <>{site.legal.minimumAge}</> : <Missing>minimum age</Missing>;

export function SupportContact() {
  if (site.supportEmail) return <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>;
  return (
    <>
      <Missing>support email</Missing> (see the <Link href="/contact">Support</Link> page)
    </>
  );
}
