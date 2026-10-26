// Envoi du formulaire de contact (POST /api/contact), appelé par worker/index.ts.
// Chemin relatif : le Worker est empaqueté par Wrangler, sans l'alias "@/".
import { site } from "../config/site";

export interface ContactEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

// Limite indicative : la mémoire est propre à chaque instance Cloudflare.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function tooManyRequests(ip: string): boolean {
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
}

function validate(p: Payload) {
  const errors: Record<string, string> = {};
  const name = typeof p.name === "string" ? p.name.trim() : "";
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

export async function handleContact(request: Request, env: ContactEnv) {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (tooManyRequests(ip)) {
    return Response.json(
      { error: "rate_limited", message: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
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
