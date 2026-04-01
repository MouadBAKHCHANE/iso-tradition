import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from '@sanity/icons';
import { seoFields } from "./helpers/seoFields";

export default defineType({
  name: "blogPost",
  title: "Articles de blog",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", group: "content", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "excerpt", title: "Extrait", type: "text", rows: 3, group: "content" }),
    defineField({ name: "image", title: "Image principale", type: "image", group: "content", options: { hotspot: true } }),
    defineField({ name: "category", title: "Catégorie", type: "string", group: "content", options: {
      list: [
        { title: "Actualités", value: "actualites" },
        { title: "Conseils", value: "conseils" },
        { title: "Projets", value: "projets" },
        { title: "Subventions", value: "subventions" },
      ],
    }}),
    defineField({ name: "date", title: "Date de publication", type: "date", group: "content" }),
    defineField({ name: "body", title: "Contenu", type: "blockContent", group: "content" }),

    ...seoFields,
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
  orderings: [
    { title: "Date (récent)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
});
