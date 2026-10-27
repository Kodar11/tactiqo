"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiGoogleplay } from "react-icons/si";

import { Brand } from "@/components/layout/brand";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { APP_PREVIEW_HREF, NAV_LINKS } from "@/lib/nav";
import { site } from "@/lib/site-config";

function AppAction({ className, onClick }: { className?: string; onClick?: () => void }) {
  if (site.playStoreUrl) {
    return (
      <a href={site.playStoreUrl} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className} data-event="download_click">
        <SiGoogleplay aria-hidden className="size-3.5" />
        Get the app
      </a>
    );
  }
  return (
    <Link href={APP_PREVIEW_HREF} onClick={onClick} className={className} data-event="app_preview_click">
      See the app
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-[var(--header-h)] border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-line bg-ink/85 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-3.5 py-2 text-sm text-slate transition-colors hover:text-bright">
              {l.label}
            </Link>
          ))}
          <AppAction className={buttonClass("secondary", "md", "ml-3 h-9")} />
        </nav>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-bright md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-[18px]" aria-hidden />
          </Dialog.Trigger>
          <AnimatePresence>
            {open ? (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild forceMount aria-describedby={undefined}>
                  <motion.div
                    className="fixed inset-x-3 top-3 z-50 rounded-3xl border border-line-strong bg-ink-raised p-5 shadow-2xl shadow-black/60 md:hidden"
                    initial={{ opacity: 0, y: -12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="sr-only">Menu</Dialog.Title>
                      <span onClick={close}>
                        <Brand />
                      </span>
                      <Dialog.Close className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-bright" aria-label="Close menu">
                        <X className="size-[18px]" aria-hidden />
                      </Dialog.Close>
                    </div>
                    <nav aria-label="Mobile" className="mt-6 flex flex-col">
                      {NAV_LINKS.map((l, i) => (
                        <motion.div key={l.href} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i + 0.05 }}>
                          <Link href={l.href} onClick={close} className="block border-b border-line py-4 text-lg text-bright">
                            {l.label}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                    <AppAction onClick={close} className={buttonClass("primary", "lg", "mt-6 w-full")} />
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            ) : null}
          </AnimatePresence>
        </Dialog.Root>
      </div>
    </header>
  );
}
