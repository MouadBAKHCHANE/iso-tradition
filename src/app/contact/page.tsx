import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { getContactPage } from "@/lib/queries";
import { pageTitle } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();

  if (!page) {
    return {
      title: "Contact",
      description:
        "Contactez Iso Tradition pour vos projets de fenêtres, portes et volets en Suisse romande. Demandez un devis gratuit.",
    };
  }

  return {
    alternates: { canonical: "/contact" },
    title: pageTitle(page.seoTitle) || "Contact",
    description:
      page.seoDescription ||
      "Contactez Iso Tradition pour vos projets de fenêtres, portes et volets en Suisse romande. Demandez un devis gratuit.",
    openGraph: {
      title: page.seoTitle || "Contact – ISO Tradition",
      description:
        page.seoDescription ||
        "Contactez Iso Tradition pour vos projets de fenêtres, portes et volets en Suisse romande. Demandez un devis gratuit.",
      ...(page.ogImage?.asset?.url && {
        images: [{ url: page.ogImage.asset.url }],
      }),
    },
  };
}

export default async function Contact() {
  return <ContactPage />;
}
