"use client";

/** Année courante calculée côté navigateur. */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
