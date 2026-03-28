import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact – ISO Tradition",
  description:
    "Contactez Iso Tradition pour vos projets de fenêtres, portes et volets en Suisse romande. Demandez un devis gratuit.",
};

export default function Contact() {
  return <ContactPage />;
}
