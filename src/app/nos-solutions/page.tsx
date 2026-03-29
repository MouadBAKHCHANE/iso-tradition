import type { Metadata } from "next";
import SolutionsListPage from "@/components/SolutionsListPage";

export const metadata: Metadata = {
  title: "Nos Solutions – ISO Tradition",
  description:
    "Découvrez nos solutions de fenêtres, portes, volets et plus. Iso Tradition, votre expert en menuiserie en Suisse romande.",
};

export default function NosSolutions() {
  return <SolutionsListPage />;
}
