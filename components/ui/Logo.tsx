import Link from "next/link";
import { site } from "@/config/site";

export function Logo() {
  return (
    <Link href="/#accueil" className="logo" aria-label={`${site.companyName}, retour à l'accueil`}>
      <span className="logo__mark" aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 5H7v14h11M7 12h9" />
        </svg>
      </span>
      <span>{site.companyName}</span>
    </Link>
  );
}
