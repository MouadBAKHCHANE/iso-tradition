import type { Metadata } from "next";
import PartnersPage from "@/components/PartnersPage";

export const metadata: Metadata = {
  title: "Nos partenaires",
  description:
    "Aluplast, Fenêtréa, Marquises, Schüco et Veka : nos fabricants partenaires suisses et européens pour des fenêtres et portes fiables et durables.",
  alternates: { canonical: "/nos-partenaires" },
};

export default function Page() {
  return <PartnersPage />;
}
