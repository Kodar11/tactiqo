/**
 * Event boundary for future, privacy-conscious analytics. Nothing is collected today: this function does nothing,
 * and no analytics service is installed. If measurement is ever added, wire it here (and update the Privacy Policy,
 * plus consent where required) instead of scattering calls through components.
 *
 * Links carry the same names as `data-event` attributes (download_click, app_preview_click).
 */
export type SiteEvent = "demo_submit" | "demo_next_round" | "demo_restart";

export function trackEvent(name: SiteEvent, props?: Record<string, string | number>): void {
  void name;
  void props;
}
