import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-ink shadow-[0_8px_30px_-10px_rgb(249_115_22/0.65)] hover:bg-[#fb8a3c] hover:shadow-[0_10px_34px_-10px_rgb(249_115_22/0.8)]",
  secondary: "border border-line-strong bg-navy/40 text-bright hover:border-slate/60 hover:bg-navy/80",
  ghost: "text-light hover:text-bright hover:bg-navy/60",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

/** Shared button styling for <a>, <Link> and <button>. */
export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
