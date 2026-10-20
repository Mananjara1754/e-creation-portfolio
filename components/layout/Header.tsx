"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close(true);
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = [
        buttonRef.current,
        ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
      ].filter((el): el is HTMLElement => el !== null);
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (!firstEl || !lastEl) return;
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo />

        <nav className="header__nav" aria-label="Navigation principale">
          {site.nav.map((link) => (
            <a key={link.href} className="navlink" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--accent header__cta" href="#contact">
          Discutons de votre projet
        </a>

        <button
          ref={buttonRef}
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <div id="menu-mobile" ref={menuRef} className="mobile-menu" data-open={open} hidden={!open}>
        <nav className="container mobile-menu__inner" aria-label="Navigation mobile">
          {site.nav.map((link) => (
            <a
              key={link.href}
              className="mobile-menu__link"
              href={link.href}
              onClick={() => close(false)}
            >
              {link.label}
            </a>
          ))}
          <a className="btn btn--accent" href="#contact" onClick={() => close(false)}>
            Discutons de votre projet
          </a>
        </nav>
      </div>
    </header>
  );
}
