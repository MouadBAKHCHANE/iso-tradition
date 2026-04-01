import { defineType, defineField } from "sanity";
import { HomeIcon } from '@sanity/icons';
import { seoFields } from "./helpers/seoFields";

export default defineType({
  name: "homepage",
  title: "Page d'accueil",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "Qui sommes-nous (aperçu)" },
    { name: "solutions", title: "Nos solutions" },
    { name: "whyReplace", title: "Pourquoi remplacer" },
    { name: "strengths", title: "Nos forces" },
    { name: "cta", title: "CTA projet" },
    { name: "blog", title: "Blog" },
    { name: "serviceArea", title: "Zone d'intervention" },
    { name: "faq", title: "FAQ" },
    { name: "sections", title: "Sections" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroOverline", title: "Surtitre", type: "string", group: "hero", initialValue: "Fenêtres & Portes Suisses" }),
    defineField({ name: "heroTitle", title: "Titre principal", type: "string", group: "hero" }),
    defineField({ name: "heroTitleAccent", title: "Mot accentué (orange)", type: "string", group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Sous-titre", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroImage", title: "Image de fond", type: "image", group: "hero", options: { hotspot: true } }),
    defineField({ name: "heroCtaText", title: "Texte CTA hero", type: "string", group: "hero", initialValue: "Nos solutions" }),
    defineField({ name: "heroCtaLink", title: "Lien CTA hero", type: "string", group: "hero", initialValue: "/nos-solutions" }),

    // About preview
    defineField({ name: "aboutImage", title: "Image", type: "image", group: "about", options: { hotspot: true } }),
    defineField({ name: "aboutStatNumber", title: "Chiffre clé (ex: +35)", type: "string", group: "about" }),
    defineField({ name: "aboutStatLabel", title: "Label chiffre (ex: années d'expérience)", type: "string", group: "about" }),
    defineField({ name: "aboutTitle", title: "Titre", type: "string", group: "about" }),
    defineField({ name: "aboutTitleAccent", title: "Mot accentué", type: "string", group: "about" }),
    defineField({ name: "aboutText", title: "Texte descriptif", type: "text", rows: 5, group: "about" }),
    defineField({ name: "aboutRating", title: "Note avis (ex: 4.9/5)", type: "string", group: "about" }),
    defineField({ name: "aboutRatingLabel", title: "Label avis", type: "string", group: "about", initialValue: "avis clients" }),

    // Solutions
    defineField({ name: "solutionsOverline", title: "Surtitre", type: "string", group: "solutions", initialValue: "Nos solutions" }),
    defineField({ name: "solutionsTitle", title: "Titre", type: "string", group: "solutions" }),
    defineField({ name: "solutionsTitleAccent", title: "Mot accentué", type: "string", group: "solutions" }),

    // Why replace
    defineField({ name: "whyReplaceTitle", title: "Titre", type: "string", group: "whyReplace" }),
    defineField({ name: "whyReplaceTitleAccent", title: "Mot accentué", type: "string", group: "whyReplace" }),
    defineField({ name: "whyReplaceSubtitle", title: "Sous-titre", type: "text", rows: 3, group: "whyReplace" }),
    defineField({ name: "whyReplaceImage", title: "Image", type: "image", group: "whyReplace", options: { hotspot: true } }),
    defineField({
      name: "whyReplaceReasons",
      title: "Raisons de remplacer",
      type: "array",
      group: "whyReplace",
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

    // Strengths
    defineField({ name: "strengthsOverline", title: "Surtitre", type: "string", group: "strengths" }),
    defineField({ name: "strengthsTitle", title: "Titre", type: "string", group: "strengths" }),
    defineField({ name: "strengthsTitleAccent", title: "Mot accentué", type: "string", group: "strengths" }),
    defineField({
      name: "strengths",
      title: "Forces",
      type: "array",
      group: "strengths",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Titre", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
          ],
        },
      ],
    }),

    // CTA
    defineField({ name: "ctaTitle", title: "Titre CTA", type: "string", group: "cta" }),
    defineField({ name: "ctaTitleAccent", title: "Mot accentué", type: "string", group: "cta" }),
    defineField({ name: "ctaSubtitle", title: "Sous-titre", type: "text", rows: 2, group: "cta" }),

    // Service area
    defineField({ name: "serviceAreaTitle", title: "Titre", type: "string", group: "serviceArea" }),
    defineField({ name: "serviceAreaTitleAccent", title: "Mot accentué", type: "string", group: "serviceArea" }),
    defineField({ name: "serviceAreaImage", title: "Image fond", type: "image", group: "serviceArea", options: { hotspot: true } }),
    defineField({
      name: "serviceAreaZones",
      title: "Zones",
      type: "array",
      group: "serviceArea",
      of: [{ type: "string" }],
    }),

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
      return { title: "Page d'accueil" };
    },
  },
});
