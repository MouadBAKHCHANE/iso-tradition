import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";
import { getSiteSettings } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  // Blog/actualites doesn't have its own page type in Sanity,
  // so we fall back to hardcoded defaults with optional site-level overrides
  return {
    title: "Actualités – ISO Tradition",
    description:
      settings?.seoDescription ||
      "Conseils, guides et actualités sur les fenêtres, portes et rénovation énergétique en Suisse par Iso Tradition.",
  };
}

export default async function Actualites() {
  return <BlogPage />;
}
