import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from '@sanity/icons';
import { seoFields } from "./helpers/seoFields";

export default defineType({
  name: "contactPage",
  title: "Page Contact",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "info", title: "Informations" },
    { name: "form", title: "Formulaire" },
    { name: "map", title: "Carte" },
    { name: "sections", title: "Sections" },
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

    ...seoFields,
  ],
  preview: {
    prepare() {
      return { title: "Page Contact" };
    },
  },
});
