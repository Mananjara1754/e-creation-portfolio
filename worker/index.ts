// Worker Cloudflare : le site statique (out/) est servi directement par les assets ;
// seules les requêtes /api/* arrivent ici (run_worker_first dans wrangler.jsonc).
import { handleContact, type ContactEnv } from "./contact";

interface Env extends ContactEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response(null, { status: 405, headers: { Allow: "POST" } });
      }
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
