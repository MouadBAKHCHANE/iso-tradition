import { defineType, defineField } from "sanity";
import { UsersIcon } from '@sanity/icons';
import { seoFields } from "./helpers/seoFields";

export default defineType({
  name: "aboutPage",
  title: "Page Qui sommes-nous",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "gallery", title: "Galerie" },
    { name: "mission", title: "Mission" },
    { name: "stats", title: "Chiffres clés" },
    { name: "values", title: "Valeurs & Atouts" },
    { name: "process", title: "Processus" },
    { name: "zones", title: "Zones d'intervention" },
    { name: "cta", title: "CTA" },
    { name: "sections", title: "Sections" },
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

    // Nos valeurs (3 cards)
    defineField({ name: "valeursTitle", title: "Titre", type: "string", group: "values", initialValue: "Nos" }),
    defineField({ name: "valeursTitleAccent", title: "Mot accentué", type: "string", group: "values", initialValue: "valeurs" }),
    defineField({
      name: "valeurs",
      title: "Cartes valeurs (3 max)",
      type: "array",
      group: "values",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Titre", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
            { name: "variant", title: "Style", type: "string", options: { list: [
              { title: "Orange (accent)", value: "accent" },
              { title: "Bleu foncé (dark)", value: "dark" },
              { title: "Clair (light)", value: "light" },
            ]}},
          ],
          preview: { select: { title: "title" } },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // Nos atouts (list)
    defineField({ name: "valuesOverline", title: "Surtitre", type: "string", group: "values" }),
    defineField({ name: "valuesTitle", title: "Titre atouts", type: "string", group: "values" }),
    defineField({ name: "valuesTitleAccent", title: "Mot accentué", type: "string", group: "values" }),
    defineField({
      name: "values",
      title: "Liste des atouts",
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

    // Sections — drag to reorder, toggle to show/hide
    defineField({
      name: "sections",
      title: "Ordre et visibilité des sections",
      description: "Glissez-déposez pour réordonner. Décochez « Visible » pour masquer une section.",
      type: "array",
      group: "sections",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "Section", type: "string", readOnly: true },
            { name: "label", title: "Nom", type: "string", readOnly: true },
            { name: "visible", title: "Visible", type: "boolean", initialValue: true },
          ],
          preview: {
            select: { title: "label", visible: "visible" },
            prepare(value: Record<string, unknown>) {
              const title = value.title as string;
              const visible = value.visible as boolean;
              return { title: `${visible === false ? "🔴" : "🟢"} ${title}` };
            },
          },
        },
      ],
    }),

    // SEO
    ...seoFields,
  ],
  preview: {
    prepare() {
      return { title: "Page Qui sommes-nous" };
    },
  },
});
