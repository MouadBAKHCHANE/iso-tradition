import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import { getAboutPage } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();

  if (!page) {
    return {
      title: "Qui sommes-nous – ISO Tradition",
      description:
        "Découvrez Iso Tradition : plus de 35 ans d'expertise en fenêtres, portes et volets en Suisse romande. Nos valeurs, notre équipe et notre processus intégré.",
    };
  }

  return {
    title: page.seoTitle || "Qui sommes-nous – ISO Tradition",
    description:
      page.seoDescription ||
      "Découvrez Iso Tradition : plus de 35 ans d'expertise en fenêtres, portes et volets en Suisse romande. Nos valeurs, notre équipe et notre processus intégré.",
    openGraph: {
      title: page.seoTitle || "Qui sommes-nous – ISO Tradition",
      description:
        page.seoDescription ||
        "Découvrez Iso Tradition : plus de 35 ans d'expertise en fenêtres, portes et volets en Suisse romande.",
      ...(page.ogImage?.asset?.url && {
        images: [{ url: page.ogImage.asset.url }],
      }),
    },
  };
}

export default async function QuiSommesNous() {
  return <AboutPage />;
}
