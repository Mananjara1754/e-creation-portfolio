"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/config/site";

type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "type" | "message", string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const type = String(data.get("type") ?? "");
  const message = String(data.get("message") ?? "").trim();

  if (name.length < 2) errors.name = "Indiquez votre nom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Indiquez une adresse e-mail valide.";
  if (!site.contactTypes.includes(type)) errors.type = "Choisissez un type de projet.";
  if (message.length < 10)
    errors.message = "Décrivez votre besoin en quelques mots (10 caractères minimum).";
  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [feedback, setFeedback] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    setFeedback("");
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      const firstKey = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const json = (await res.json().catch(() => ({}))) as {
        message?: string;
        errors?: Errors;
      };

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (res.status === 422 && json.errors) setErrors(json.errors);
      setFeedback(json.message ?? "L'envoi a échoué. Réessayez plus tard.");
      setStatus("error");
    } catch {
      setFeedback("Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form form--done" role="status">
        <h3 className="h3">Message envoyé</h3>
        <p className="muted">Merci pour votre message. Nous revenons vers vous rapidement.</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")}>
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const field = (name: keyof Errors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__pair">
        <div className="field">
          <label htmlFor="name">Nom</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Votre nom"
            required
            {...field("name")}
          />
          {errors.name && (
            <p className="field__error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">Adresse e-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.com"
            required
            {...field("email")}
          />
          {errors.email && (
            <p className="field__error" id="email-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="type">Type de projet</label>
        <select id="type" name="type" defaultValue={site.contactTypes[0]} {...field("type")}>
          {site.contactTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="field__error" id="type-error">
            {errors.type}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Parlez-nous de votre projet"
          required
          {...field("message")}
        />
        {errors.message && (
          <p className="field__error" id="message-error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot anti-spam : invisible pour les humains. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && feedback && (
        <p className="form__alert" role="alert">
          {feedback}
        </p>
      )}

      <button
        type="submit"
        className="btn btn--accent btn--lg form__submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
