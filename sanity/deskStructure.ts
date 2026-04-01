import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      // Singletons
      S.listItem()
        .title("Paramètres du site")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Marketing & Analytics")
        .id("marketingSettings")
        .child(S.document().schemaType("marketingSettings").documentId("marketingSettings")),
      S.divider(),

      // Pages
      S.listItem()
        .title("Page d'accueil")
        .id("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("Page Qui sommes-nous")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Page Nos solutions")
        .id("solutionsPage")
        .child(S.document().schemaType("solutionsPage").documentId("solutionsPage")),
      S.listItem()
        .title("Page Contact")
        .id("contactPage")
        .child(S.document().schemaType("contactPage").documentId("contactPage")),
      S.divider(),

      // Collections
      S.listItem()
        .title("Services (produits)")
        .schemaType("product")
        .child(S.documentTypeList("product").title("Services")),
      S.listItem()
        .title("Articles de blog")
        .schemaType("blogPost")
        .child(S.documentTypeList("blogPost").title("Articles")),
      S.listItem()
        .title("Pages légales")
        .schemaType("legalPage")
        .child(S.documentTypeList("legalPage").title("Pages légales")),
    ]);
