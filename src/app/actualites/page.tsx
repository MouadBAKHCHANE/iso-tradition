import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";

export const metadata: Metadata = {
  title: "Actualités – ISO Tradition",
  description:
    "Conseils, guides et actualités sur les fenêtres, portes et rénovation énergétique en Suisse par Iso Tradition.",
};

export default function Actualites() {
  return <BlogPage />;
}
