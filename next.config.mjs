/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique dans out/ pour Cloudflare Pages ; /api/contact est une Pages Function (functions/).
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
