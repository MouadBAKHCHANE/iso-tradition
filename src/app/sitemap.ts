import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.isotradition.ch";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/nos-solutions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/nos-solutions/fenetres`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/nos-solutions/baies-coulissantes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/nos-solutions/portes-entree`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/nos-solutions/volets`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/nos-solutions/portes-garage`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/nos-solutions/stores-bannes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/nos-solutions/films-solaires`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/nos-solutions/carports-pergolas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/qui-sommes-nous`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/actualites`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cgu`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cgv`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cg-entretien`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/confidentialite`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
