"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Bouton "revenir en haut", affiché après un peu de défilement.
 * Sans JavaScript, c'est un simple lien vers le haut, toujours visible (voir globals.css).
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault(); // pas de #haut dans l'URL
    // Le défilement doux (ou non, selon prefers-reduced-motion) vient du CSS de html.
    window.scrollTo({ top: 0 });
    // Clavier : reprendre la navigation depuis le haut de la page.
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
  }

  return (
    <a
      href="#haut"
      className={`to-top${visible ? " is-visible" : ""}`}
      onClick={handleClick}
      aria-label="Revenir en haut de la page"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </a>
  );
}
