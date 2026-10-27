import Link from "next/link";

import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-sm text-orange-text">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-bright sm:text-5xl">That move leads nowhere.</h1>
      <p className="mt-4 max-w-md text-lg text-slate">The page you were looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className={buttonClass("primary", "lg", "mt-8")}>
        Back to the homepage
      </Link>
    </Container>
  );
}
