import { defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "blockContent",
  title: "Contenu riche",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Citation", value: "blockquote" },
      ],
      lists: [
        { title: "Puce", value: "bullet" },
        { title: "Numéro", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Gras", value: "strong" },
          { title: "Italique", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Lien",
            fields: [
              { name: "href", type: "url", title: "URL" },
              { name: "blank", type: "boolean", title: "Ouvrir dans un nouvel onglet", initialValue: true },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
    }),
  ],
});
