// Envoi du formulaire de contact (POST /api/contact), appelé par worker/index.ts.
// Chemin relatif : le Worker est empaqueté par Wrangler, sans l'alias "@/".
import { site } from "../config/site";

export interface ContactEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  /** Secret Turnstile : sans lui, pas de vérification anti-robot. */
  TURNSTILE_SECRET_KEY?: string;
  /** 3 envois par minute et par IP (wrangler.jsonc, `ratelimits`). */
  CONTACT_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
}

// Secours si la limite Cloudflare n'est pas disponible : compteur propre à chaque instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; resetAt: number }>();
const MAX_BODY_BYTES = 10_000;

async function tooManyRequests(ip: string, env: ContactEnv): Promise<boolean> {
  if (env.CONTACT_LIMITER) return !(await env.CONTACT_LIMITER.limit({ key: ip })).success;
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

interface Payload {
  name?: unknown;
  email?: unknown;
  type?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
  "cf-turnstile-response"?: unknown;
}

function validate(p: Payload) {
  const errors: Record<string, string> = {};
  // Caractères de contrôle retirés : le nom finit dans l'objet du mail.
  const name =
    typeof p.name === "string" ? p.name.replace(/[\u0000-\u001f\u007f]/g, " ").trim() : "";
  const email = typeof p.email === "string" ? p.email.trim() : "";
  const type = typeof p.type === "string" ? p.type : "";
  const message = typeof p.message === "string" ? p.message.trim() : "";

  if (name.length < 2 || name.length > 100)
    errors.name = "Indiquez votre nom (2 à 100 caractères).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
    errors.email = "Indiquez une adresse e-mail valide.";
  if (!site.contactTypes.includes(type)) errors.type = "Choisissez un type de projet.";
  if (message.length < 10 || message.length > 2000)
    errors.message = "Décrivez votre besoin (10 à 2000 caractères).";

  return { errors, values: { name, email, type, message } };
}

async function isHuman(token: unknown, secret: string, ip: string): Promise<boolean> {
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip !== "unknown") form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  if (!res.ok) return false;
  const result = (await res.json()) as { success?: boolean };
  return result.success === true;
}

export async function handleContact(request: Request, env: ContactEnv) {
  // Uniquement le formulaire du site lui-même (un navigateur envoie toujours Origin sur un POST).
  if (request.headers.get("Origin") !== new URL(request.url).origin) {
    return Response.json({ error: "forbidden", message: "Requête refusée." }, { status: 403 });
  }
  if (!request.headers.get("Content-Type")?.startsWith("application/json")) {
    return Response.json({ error: "invalid_type", message: "Requête invalide." }, { status: 415 });
  }
  if (Number(request.headers.get("Content-Length") ?? 0) > MAX_BODY_BYTES) {
    return Response.json({ error: "too_large", message: "Message trop long." }, { status: 413 });
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (await tooManyRequests(ip, env)) {
    return Response.json(
      { error: "rate_limited", message: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return Response.json({ error: "too_large", message: "Message trop long." }, { status: 413 });
    }
    body = JSON.parse(raw) as Payload;
  } catch {
    return Response.json({ error: "invalid_json", message: "Requête invalide." }, { status: 400 });
  }

  // Honeypot : un humain ne remplit jamais ce champ. On répond comme si tout allait bien.
  if (typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const { errors, values } = validate(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "validation", errors }, { status: 422 });
  }

  const secret = env.TURNSTILE_SECRET_KEY;
  if (secret && !(await isHuman(body["cf-turnstile-response"], secret, ip))) {
    return Response.json(
      { error: "captcha", message: "La vérification anti-robot a échoué. Réessayez." },
      { status: 403 },
    );
  }

  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL;
  const from = env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return Response.json(
      {
        error: "not_configured",
        message: "L'envoi du formulaire n'est pas encore configuré.",
      },
      { status: 501 },
    );
  }

  const text = [
    `Nom : ${values.name}`,
    `E-mail : ${values.email}`,
    `Type de projet : ${values.type}`,
    "",
    values.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: values.email,
      subject: `[${site.companyName}] Nouveau message de ${values.name}`,
      text,
    }),
  });

  if (!res.ok) {
    return Response.json(
      { error: "send_failed", message: "L'envoi a échoué. Réessayez plus tard." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
