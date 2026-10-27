import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiGoogleplay } from "react-icons/si";

import { buttonClass } from "@/components/ui/button";
import { APP_PREVIEW_HREF } from "@/lib/nav";
import { site } from "@/lib/site-config";

/**
 * The single place that decides what "get the app" means. With a verified Google Play URL it links to the listing;
 * without one it never claims a download exists and points to the app preview instead.
 */
export function DownloadCTA({
  variant = "secondary",
  size = "lg",
  previewLabel = "Explore the app",
  className,
}: {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  previewLabel?: string;
  className?: string;
}) {
  if (site.playStoreUrl) {
    return (
      <a
        href={site.playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass(variant, size, className)}
        data-event="download_click"
      >
        <SiGoogleplay aria-hidden className="size-4" />
        Get it on Google Play
      </a>
    );
  }
  return (
    <Link href={APP_PREVIEW_HREF} className={buttonClass(variant, size, className)} data-event="app_preview_click">
      {previewLabel}
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  );
}
