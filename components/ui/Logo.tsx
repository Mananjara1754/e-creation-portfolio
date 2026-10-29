import Link from "next/link";
import { site } from "@/config/site";

export function Logo() {
  return (
    <Link href="/#accueil" className="logo" aria-label={`${site.companyName}, retour à l'accueil`}>
      <span className="logo__mark" aria-hidden="true">
        <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
          <polygon
            points="31.1,3 33.3,7.6 34.2,12.3 34.7,13.5 32.4,14.5 31.5,22.5 29.9,27.5 28.3,32.1 26.7,37.2 24.3,44.2 18.8,46 14.8,41.5 14.3,38.9 13.6,33.9 16.3,29.3 16.6,26 15.4,22.2 16.6,16.4 22.2,14.8 25.5,11.3 27.9,7.6 30.3,4.4"
            fill="var(--color-accent)"
          />
          <ellipse
            cx="34.6"
            cy="18.6"
            rx="0.8"
            ry="2.6"
            transform="rotate(12 34.6 18.6)"
            fill="var(--color-accent)"
          />
          <circle cx="26.4" cy="7.4" r="1.1" fill="var(--color-accent)" />
          <polygon
            points="31.1,3 33.3,7.6 34.2,12.3 34.7,13.5 32.4,14.5 28,12.5"
            fill="var(--color-accent)"
          />
          <polygon
            points="25.5,11.3 27.9,7.6 30.3,4.4 31.1,3 28,12.5"
            fill="var(--color-accent-dim)"
          />
          <polygon
            points="16.6,16.4 22.2,14.8 25.5,11.3 28,12.5 25,26"
            fill="var(--color-accent)"
          />
          <polygon
            points="28,12.5 32.4,14.5 31.5,22.5 25,26"
            fill="var(--color-accent-dim)"
          />
          <polygon
            points="16.3,29.3 16.6,26 15.4,22.2 16.6,16.4 25,26"
            fill="var(--color-accent-dim)"
          />
          <polygon
            points="25,26 31.5,22.5 29.9,27.5 28.3,32.1 26.7,37.2 21.5,38"
            fill="var(--color-accent)"
          />
          <polygon
            points="16.3,29.3 25,26 21.5,38 14.3,38.9 13.6,33.9"
            fill="var(--color-accent)"
          />
          <polygon
            points="21.5,38 26.7,37.2 24.3,44.2 18.8,46 14.8,41.5 14.3,38.9"
            fill="var(--color-accent-dim)"
          />
          <circle
            cx="26"
            cy="25"
            r="5.2"
            fill="none"
            stroke="var(--color-accent-2)"
            strokeWidth="1.4"
          />
          <circle cx="26" cy="25" r="2.4" fill="var(--color-accent-2)" />
        </svg>
      </span>
      <span>{site.companyName}</span>
    </Link>
  );
}
