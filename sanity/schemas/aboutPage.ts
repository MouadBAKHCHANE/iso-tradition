import { defineType, defineField } from "sanity";
import { seoFields } from "./helpers/seoFields";

export default defineType({
  name: "aboutPage",
  title: "Page Qui sommes-nous",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "gallery", title: "Galerie" },
    { name: "mission", title: "Mission" },
    { name: "stats", title: "Chiffres clés" },
    { name: "values", title: "Atouts" },
    { name: "process", title: "Processus" },
    { name: "zones", title: "Zones d'intervention" },
    { name: "cta", title: "CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroTitle", title: "Titre", type: "string", group: "hero" }),
    defineField({ name: "heroTitleAccent", title: "Mot accentué", type: "string", group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Sous-titre", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroImage", title: "Image de fond", type: "image", group: "hero", options: { hotspot: true } }),

    // Gallery
    defineField({
      name: "gallery",
      title: "Images galerie",
      type: "array",
      group: "gallery",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt", type: "string" }] }],
      validation: (Rule) => Rule.max(3),
    }),

    // Mission
    defineField({ name: "missionOverline", title: "Surtitre", type: "string", group: "mission" }),
    defineField({ name: "missionTitle", title: "Titre", type: "string", group: "mission" }),
    defineField({ name: "missionTitleAccent", title: "Mot accentué", type: "string", group: "mission" }),
    defineField({ name: "missionText", title: "Texte", type: "text", rows: 5, group: "mission" }),
    defineField({ name: "missionImage", title: "Image", type: "image", group: "mission", options: { hotspot: true } }),

    // Stats
    defineField({
      name: "stats",
      title: "Chiffres clés",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Chiffre", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    }),

    // Values / atouts
    defineField({ name: "valuesOverline", title: "Surtitre", type: "string", group: "values" }),
    defineField({ name: "valuesTitle", title: "Titre", type: "string", group: "values" }),
    defineField({ name: "valuesTitleAccent", title: "Mot accentué", type: "string", group: "values" }),
    defineField({
      name: "values",
      title: "Atouts",
      type: "array",
      group: "values",
      of: [{ type: "string" }],
    }),

    // Process
    defineField({ name: "processTitle", title: "Titre", type: "string", group: "process" }),
    defineField({ name: "processTitleAccent", title: "Mot accentué", type: "string", group: "process" }),
    defineField({
      name: "processSteps",
      title: "Étapes",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Titre", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
          ],
        },
      ],
    }),

    // Zones
    defineField({ name: "zonesTitle", title: "Titre", type: "string", group: "zones" }),
    defineField({ name: "zonesTitleAccent", title: "Mot accentué", type: "string", group: "zones" }),
    defineField({ name: "zonesImage", title: "Image de fond", type: "image", group: "zones", options: { hotspot: true } }),
    defineField({
      name: "zones",
      title: "Cantons",
      type: "array",
      group: "zones",
      of: [{ type: "string" }],
    }),

    // CTA
    defineField({ name: "ctaTitle", title: "Titre CTA", type: "string", group: "cta" }),
    defineField({ name: "ctaTitleAccent", title: "Mot accentué", type: "string", group: "cta" }),
    defineField({ name: "ctaSubtitle", title: "Sous-titre", type: "text", rows: 2, group: "cta" }),

    // SEO
    ...seoFields,
  ],
  preview: {
    prepare() {
      return { title: "Page Qui sommes-nous" };
    },
  },
});
