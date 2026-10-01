import type { Metadata } from "next";
import SolutionsListPage from "@/components/SolutionsListPage";
import { getSolutionsPage } from "@/lib/queries";
import { pageTitle } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSolutionsPage();

  if (!page) {
    return {
      title: "Nos solutions",
      description:
        "Découvrez nos solutions de fenêtres, portes, volets et plus. Iso Tradition, votre expert en menuiserie en Suisse romande.",
    };
  }

  return {
    alternates: { canonical: "/nos-solutions" },
    title: pageTitle(page.seoTitle) || "Nos solutions",
    description:
      page.seoDescription ||
      "Découvrez nos solutions de fenêtres, portes, volets et plus. Iso Tradition, votre expert en menuiserie en Suisse romande.",
    openGraph: {
      title: page.seoTitle || "Nos Solutions – ISO Tradition",
      description:
        page.seoDescription ||
        "Découvrez nos solutions de fenêtres, portes, volets et plus. Iso Tradition, votre expert en menuiserie en Suisse romande.",
      ...(page.ogImage?.asset?.url && {
        images: [{ url: page.ogImage.asset.url }],
      }),
    },
  };
}

export default async function NosSolutions() {
  return <SolutionsListPage />;
}
