import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

export const revalidate = 86400;

const base = "https://www.isotradition.ch";

// Solutions temporarily hidden from the site
const hiddenProducts = ["films-solaires"];

const productSlugs = [
  "fenetres",
  "baies-coulissantes",
  "portes-entree",
  "volets",
  "portes-garage",
  "stores-bannes",
  "carports-pergolas",
];

type SanityDoc = { _type: "product" | "blogPost"; slug: string; _updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Real modification dates from Sanity; static pages simply omit lastModified
  let docs: SanityDoc[] = [];
  try {
    docs = await client.fetch(
      `*[_type in ["product", "blogPost"] && defined(slug.current)]{ _type, "slug": slug.current, _updatedAt }`
    );
  } catch {
    docs = [];
  }
  const updated = (type: SanityDoc["_type"], slug: string) =>
    docs.find((d) => d._type === type && d.slug === slug)?._updatedAt;

  const products = [...new Set([...productSlugs, ...docs.filter((d) => d._type === "product").map((d) => d.slug)])].filter(
    (slug) => !hiddenProducts.includes(slug)
  );
  const posts = docs.filter((d) => d._type === "blogPost");

  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/nos-solutions`, changeFrequency: "monthly", priority: 0.9 },
    ...products.map((slug) => ({
      url: `${base}/nos-solutions/${slug}`,
      lastModified: updated("product", slug),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/qui-sommes-nous`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/nos-partenaires`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/actualites`, changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((p) => ({
      url: `${base}/actualites/${p.slug}`,
      lastModified: p._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cgu`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cgv`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cg-entretien`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
