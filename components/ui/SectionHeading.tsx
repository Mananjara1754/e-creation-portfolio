import type { ReactNode } from "react";

interface SectionHeadingProps {
  label: string;
  id?: string;
  children: ReactNode;
}

export function SectionHeading({ label, id, children }: SectionHeadingProps) {
  return (
    <>
      <p className="label">{label}</p>
      <h2 className="h2" id={id}>
        {children}
      </h2>
    </>
  );
}
