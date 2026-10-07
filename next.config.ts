import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    inlineCss: true,
  },
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
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
        "/nos-realisations",
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
      // Films solaires is temporarily hidden: temporary redirect (not permanent) so the page can return later
      { source: "/nos-solutions/films-solaires", destination: "/nos-solutions", permanent: false },
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
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
      {
        // Report-only: logs would-be violations in the browser console without blocking anything
        source: "/((?!studio).*)",
        headers: [{ key: "Content-Security-Policy-Report-Only", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://embed.typeform.com https://connect.facebook.net https://analytics.tiktok.com https://snap.licdn.com https://sc-static.net https://s.pinimg.com; style-src 'self' 'unsafe-inline' https://embed.typeform.com; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.sanity.io https://*.typeform.com https://*.facebook.com https://*.tiktok.com https://*.linkedin.com https://*.snapchat.com https://*.pinterest.com; frame-src https://www.google.com https://*.typeform.com https://www.googletagmanager.com https://www.facebook.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://*.typeform.com; object-src 'none'" }],
      },
    ];
  },
};

export default nextConfig;
