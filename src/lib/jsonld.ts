const SITE_URL = "https://www.isotradition.ch";

export function localBusinessJsonLd(settings: {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: settings.name || "ISO Tradition",
    url: SITE_URL,
    telephone: settings.phone || "+41 21 624 53 00",
    email: settings.email || "contact@isotradition.ch",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address || "Route de Suisse 7A",
      addressLocality: settings.city || "Mies",
      postalCode: settings.postalCode || "1295",
      addressCountry: "CH",
    },
    areaServed: [
      { "@type": "State", name: "Canton de Vaud" },
      { "@type": "State", name: "Canton de Genève" },
      { "@type": "State", name: "Canton de Fribourg" },
      { "@type": "State", name: "Canton du Valais" },
      { "@type": "State", name: "Canton de Neuchâtel" },
    ],
  };
}

const AREA_SERVED = [
  { "@type": "State", name: "Canton de Vaud" },
  { "@type": "State", name: "Canton de Genève" },
  { "@type": "State", name: "Canton de Fribourg" },
  { "@type": "State", name: "Canton du Valais" },
  { "@type": "State", name: "Canton de Neuchâtel" },
];

const PUBLISHER = {
  "@type": "Organization",
  name: "ISO Tradition",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-couleur.webp` },
};

export function serviceJsonLd(service: { name: string; description: string; slug: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: `${SITE_URL}/nos-solutions/${service.slug}`,
    image: service.image,
    areaServed: AREA_SERVED,
    provider: { "@type": "HomeAndConstructionBusiness", name: "ISO Tradition", url: SITE_URL, telephone: "+41 21 624 53 00" },
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  updatedAt?: string;
  imageUrl?: string;
}) {
  const url = `${SITE_URL}/actualites/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    image: post.imageUrl,
    inLanguage: "fr-CH",
    author: { "@type": "Organization", name: "ISO Tradition", url: SITE_URL },
    publisher: PUBLISHER,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
