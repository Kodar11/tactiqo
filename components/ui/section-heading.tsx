import { cn } from "@/lib/cn";

/** Eyebrow + heading + supporting copy, the rhythm every homepage section starts with. */
export function SectionHeading({
  eyebrow,
  title,
  children,
  id,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-blue-text">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-bright sm:text-[2.75rem]">
        {title}
      </h2>
      {children ? <div className="mt-5 text-pretty text-lg leading-relaxed text-slate">{children}</div> : null}
    </div>
  );
}
