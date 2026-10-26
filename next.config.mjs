/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique dans out/, servi par Cloudflare Workers ; /api/contact est géré par worker/.
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
