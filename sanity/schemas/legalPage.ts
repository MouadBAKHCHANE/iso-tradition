import { defineType, defineField } from "sanity";
import { DocumentIcon } from '@sanity/icons';
import { seoFields } from "./helpers/seoFields";

export default defineType({
  name: "legalPage",
  title: "Pages légales",
  type: "document",
  icon: DocumentIcon,
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
    defineField({ name: "body", title: "Contenu", type: "blockContent", group: "content" }),

    ...seoFields,
  ],
  preview: {
    select: { title: "title" },
  },
});
