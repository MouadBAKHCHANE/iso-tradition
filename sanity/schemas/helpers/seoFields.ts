import { defineField } from "sanity";

export const seoFields = [
  defineField({
    name: "seoTitle",
    title: "SEO — Titre (meta title)",
    type: "string",
    group: "seo",
    description: "Max 60 caractères. Remplace le titre dans les résultats Google.",
    validation: (Rule) =>
      Rule.max(60).warning("Garder sous 60 caractères pour un affichage optimal."),
  }),
  defineField({
    name: "seoDescription",
    title: "SEO — Description (meta description)",
    type: "text",
    rows: 3,
    group: "seo",
    description: "Max 160 caractères. Affiché dans les résultats Google.",
    validation: (Rule) =>
      Rule.max(160).warning("Garder sous 160 caractères."),
  }),
  defineField({
    name: "seoKeywords",
    title: "SEO — Mots-clés",
    type: "array",
    of: [{ type: "string" }],
    group: "seo",
    options: { layout: "tags" },
  }),
  defineField({
    name: "ogImage",
    title: "SEO — Image de partage social (OG Image)",
    type: "image",
    group: "seo",
    description: "Recommandé : 1200x630px. Utilisé sur Facebook, LinkedIn, WhatsApp.",
    options: { hotspot: true },
  }),
  defineField({
    name: "noIndex",
    title: "SEO — Masquer des moteurs de recherche",
    type: "boolean",
    group: "seo",
    initialValue: false,
  }),
];
