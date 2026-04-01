import { defineType, defineField } from "sanity";
import { seoFields } from "./helpers/seoFields";

export default defineType({
  name: "product",
  title: "Pages services",
  type: "document",
  groups: [
    { name: "general", title: "Général", default: true },
    { name: "why", title: "Pourquoi changer" },
    { name: "advantages", title: "Atouts" },
    { name: "types", title: "Types & options" },
    { name: "didYouKnow", title: "Le saviez-vous" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // General
    defineField({ name: "name", title: "Nom du produit", type: "string", group: "general", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "general",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "heroImage", title: "Image hero", type: "image", group: "general", options: { hotspot: true } }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3, group: "general" }),
    defineField({
      name: "materials",
      title: "Matériaux (pills hero)",
      type: "array",
      of: [{ type: "string" }],
      group: "general",
      options: { layout: "tags" },
    }),

    // Why
    defineField({ name: "whyTitle", title: "Titre", type: "string", group: "why" }),
    defineField({ name: "whyText", title: "Texte", type: "text", rows: 5, group: "why" }),
    defineField({ name: "whyImage", title: "Image", type: "image", group: "why", options: { hotspot: true } }),

    // Advantages
    defineField({ name: "advantagesImage", title: "Image de fond", type: "image", group: "advantages", options: { hotspot: true } }),
    defineField({
      name: "advantages",
      title: "Liste des atouts",
      type: "array",
      of: [{ type: "string" }],
      group: "advantages",
    }),

    // Types & options
    defineField({ name: "typesLabel", title: "Label types (ex: Matériaux)", type: "string", group: "types" }),
    defineField({ name: "typesVertical", title: "Affichage vertical (cartes horizontales)", type: "boolean", group: "types", initialValue: false }),
    defineField({
      name: "types",
      title: "Types",
      type: "array",
      group: "types",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nom", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
          ],
          preview: {
            select: { title: "name", media: "image" },
          },
        },
      ],
    }),
    defineField({ name: "personalisationLabel", title: "Label personnalisation (ex: Vitrages)", type: "string", group: "types" }),
    defineField({
      name: "personalisation",
      title: "Options de personnalisation (cartes images)",
      type: "array",
      group: "types",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nom", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
          ],
          preview: {
            select: { title: "name", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "personalisationOptions",
      title: "Options de personnalisation (pills/icônes)",
      type: "array",
      group: "types",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Type d'icône", type: "string", description: "formes, couleurs, motifs, configuration, materiaux, vitrages, variantes, applications, personnalisation" },
            { name: "label", title: "Label (ex: Formes)", type: "string" },
            {
              name: "values",
              title: "Valeurs (pills texte)",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            },
            {
              name: "items",
              title: "Éléments avec icône",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "name", title: "Nom", type: "string" },
                    { name: "image", title: "Icône", type: "image" },
                  ],
                  preview: {
                    select: { title: "name", media: "image" },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: "label" },
          },
        },
      ],
    }),

    // Did you know
    defineField({ name: "didYouKnow", title: "Le saviez-vous ?", type: "text", rows: 5, group: "didYouKnow" }),

    // FAQ
    defineField({
      name: "faq",
      title: "Questions fréquentes",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Réponse", type: "text", rows: 4 },
          ],
        },
      ],
    }),

    // SEO
    ...seoFields,
  ],
  preview: {
    select: { title: "name", media: "heroImage" },
  },
  orderings: [
    { title: "Nom", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
});
