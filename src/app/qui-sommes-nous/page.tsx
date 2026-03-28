import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "Qui sommes-nous – ISO Tradition",
  description:
    "Découvrez Iso Tradition : plus de 35 ans d'expertise en fenêtres, portes et volets en Suisse romande. Nos valeurs, notre équipe et notre processus intégré.",
};

export default function QuiSommesNous() {
  return <AboutPage />;
}
