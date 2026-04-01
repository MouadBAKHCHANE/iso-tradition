import type { StructureResolver } from "sanity/structure";
import { CogIcon, BarChartIcon, HomeIcon, UsersIcon, ComponentIcon, EnvelopeIcon, TagIcon, DocumentTextIcon, DocumentIcon } from '@sanity/icons';

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      // Singletons
      S.listItem()
        .title("Paramètres du site")
        .id("siteSettings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Marketing & Analytics")
        .id("marketingSettings")
        .icon(BarChartIcon)
        .child(S.document().schemaType("marketingSettings").documentId("marketingSettings")),
      S.divider(),

      // Pages
      S.listItem()
        .title("Page d'accueil")
        .id("homepage")
        .icon(HomeIcon)
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("Page Qui sommes-nous")
        .id("aboutPage")
        .icon(UsersIcon)
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Page Nos solutions")
        .id("solutionsPage")
        .icon(ComponentIcon)
        .child(S.document().schemaType("solutionsPage").documentId("solutionsPage")),
      S.listItem()
        .title("Page Contact")
        .id("contactPage")
        .icon(EnvelopeIcon)
        .child(S.document().schemaType("contactPage").documentId("contactPage")),
      S.divider(),

      // Collections
      S.listItem()
        .title("Services (produits)")
        .schemaType("product")
        .icon(TagIcon)
        .child(S.documentTypeList("product").title("Services")),
      S.listItem()
        .title("Articles de blog")
        .schemaType("blogPost")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("blogPost").title("Articles")),
      S.listItem()
        .title("Pages légales")
        .schemaType("legalPage")
        .icon(DocumentIcon)
        .child(S.documentTypeList("legalPage").title("Pages légales")),
    ]);
