import { defineType, defineField } from "sanity";
import { seoFields } from "./helpers/seoFields";

export default defineType({
  name: "contactPage",
  title: "Page Contact",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "info", title: "Informations" },
    { name: "form", title: "Formulaire" },
    { name: "map", title: "Carte" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Titre", type: "string", group: "hero" }),
    defineField({ name: "heroTitleAccent", title: "Mot accentué", type: "string", group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Sous-titre", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroImage", title: "Image de fond", type: "image", group: "hero", options: { hotspot: true } }),

    defineField({ name: "infoTitle", title: "Titre section info", type: "string", group: "info" }),
    defineField({ name: "infoSubtitle", title: "Sous-titre", type: "text", rows: 2, group: "info" }),

    defineField({
      name: "formServices",
      title: "Services (dropdown du formulaire)",
      type: "array",
      group: "form",
      of: [{ type: "string" }],
    }),
    defineField({ name: "formImage", title: "Image à côté du formulaire", type: "image", group: "form", options: { hotspot: true } }),
    defineField({ name: "formSuccessMessage", title: "Message de succès", type: "text", rows: 2, group: "form" }),

    defineField({ name: "mapTitle", title: "Titre section carte", type: "string", group: "map" }),
    defineField({ name: "mapSubtitle", title: "Sous-titre", type: "text", rows: 2, group: "map" }),

    ...seoFields,
  ],
  preview: {
    prepare() {
      return { title: "Page Contact" };
    },
  },
});
