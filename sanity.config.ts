import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { deskStructure } from "./sanity/deskStructure";

export default defineConfig({
  name: "iso-tradition",
  title: "ISO Tradition",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
