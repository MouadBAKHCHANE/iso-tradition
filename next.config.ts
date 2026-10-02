import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Old WordPress URLs (still known to Google) → closest current page
  async redirects() {
    const to = (destination: string, sources: string[]) =>
      sources.map((source) => ({ source, destination, permanent: true }));
    return [
      // Blog articles from the previous site (specific first, then any other dated post)
      ...to("/actualites/subventions-2026-suisse", [
        "/2025/05/16/quelles-sont-les-aides-et-les-subventions-disponibles-en-suisse-pour-des-travaux-disolation",
        "/2025/05/16/cecb-ou-cecb-plus-explications",
      ]),
      ...to("/actualites/deperditions-thermiques", [
        "/2025/05/16/pourquoi-realiser-lisolation-thermique-de-son-habitat",
      ]),
      ...to("/actualites", [
        "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug",
        "/blog",
        "/blog-2",
        "/category/:slug",
      ]),
      // Company pages
      ...to("/qui-sommes-nous", [
        "/a-propos-entreprise-isolation-suisse",
        "/nos-realisations-isolation-suisse",
        "/our-history",
        "/core-values",
        "/company-awards",
        "/company-career",
        "/projects",
      ]),
      // Solutions
      ...to("/nos-solutions/fenetres", ["/les-fenetres"]),
      ...to("/nos-solutions", [
        "/nos-solutions-isolation-suisse",
        "/isolation-de-la-toiture",
        "/lisolation-peripherique",
        "/our-solutions-iconbox",
        "/our-solutions-image",
        "/our-solutions-image/:slug",
      ]),
      ...to("/contact", ["/pricing-and-plans"]),
      // Theme demo / sample pages
      ...to("/", [
        "/home-:n(\\d+)",
        "/demo",
        "/demo2",
        "/landing-page",
        "/faq",
        "/sample-page",
        "/page-d-exemple",
        "/index.html",
      ]),
    ];
  },
  async headers() {
    return [
      {
        source: "/:all*(webp|avif|woff2|woff|ttf|png)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
