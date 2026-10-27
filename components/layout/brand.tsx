import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { site } from "@/lib/site-config";

export function BrandMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/tactiqo-icon.webp"
      alt=""
      width={size}
      height={size}
      className={cn("rounded-[22%]", className)}
      priority
    />
  );
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5 rounded-lg", className)} aria-label={`${site.name} home`}>
      <BrandMark size={30} className="transition-transform duration-300 group-hover:rotate-[-4deg]" />
      <span className="text-[17px] font-semibold tracking-[-0.02em] text-bright">{site.name}</span>
    </Link>
  );
}
