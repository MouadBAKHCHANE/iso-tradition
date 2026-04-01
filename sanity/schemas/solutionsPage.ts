import { defineType, defineField } from "sanity";
import { seoFields } from "./helpers/seoFields";

export default defineType({
  name: "solutionsPage",
  title: "Page Nos solutions (liste)",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "whyChoose", title: "Pourquoi nous choisir" },
    { name: "subventions", title: "Subventions" },
    { name: "cta", title: "CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Titre", type: "string", group: "hero" }),
    defineField({ name: "heroTitleAccent", title: "Mot accentué", type: "string", group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Sous-titre", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroImage", title: "Image de fond", type: "image", group: "hero", options: { hotspot: true } }),

    defineField({ name: "whyChooseTitle", title: "Titre", type: "string", group: "whyChoose" }),
    defineField({ name: "whyChooseTitleAccent", title: "Mot accentué", type: "string", group: "whyChoose" }),
    defineField({
      name: "whyChooseCards",
      title: "Cartes avantages",
      type: "array",
      group: "whyChoose",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Titre", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
            { name: "icon", title: "Icône (nom)", type: "string", description: "isolation, confort, securite, reductions, plusvalue, impact" },
          ],
        },
      ],
    }),

    defineField({ name: "subventionsTitle", title: "Titre subventions", type: "string", group: "subventions" }),
    defineField({ name: "subventionsTitleAccent", title: "Mot accentué", type: "string", group: "subventions" }),
    defineField({ name: "subventionsText", title: "Texte", type: "text", rows: 4, group: "subventions" }),
    defineField({ name: "subventionsImage", title: "Image", type: "image", group: "subventions", options: { hotspot: true } }),

    defineField({ name: "ctaTitle", title: "Titre CTA", type: "string", group: "cta" }),
    defineField({ name: "ctaTitleAccent", title: "Mot accentué", type: "string", group: "cta" }),
    defineField({ name: "ctaSubtitle", title: "Sous-titre", type: "text", rows: 2, group: "cta" }),

    ...seoFields,
  ],
  preview: {
    prepare() {
      return { title: "Page Nos solutions" };
    },
  },
});
