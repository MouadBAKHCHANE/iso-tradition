import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { getContactPage } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();

  if (!page) {
    return {
      title: "Contact – ISO Tradition",
      description:
        "Contactez Iso Tradition pour vos projets de fenêtres, portes et volets en Suisse romande. Demandez un devis gratuit.",
    };
  }

  return {
    title: page.seoTitle || "Contact – ISO Tradition",
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
