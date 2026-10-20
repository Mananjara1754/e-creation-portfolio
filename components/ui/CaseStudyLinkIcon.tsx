"use client";

import { useLinkStatus } from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";

/**
 * Doit être un enfant direct d'un <Link> : useLinkStatus lit l'état de
 * navigation de ce lien précis pendant que la page de destination charge.
 */
export function CaseStudyLinkIcon() {
  const { pending } = useLinkStatus();
  return pending ? (
    <Loader2 size={15} aria-hidden="true" className="spin" />
  ) : (
    <ArrowUpRight size={15} aria-hidden="true" />
  );
}
