import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";
import { getSiteSettings, getAllBlogPosts } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    alternates: { canonical: "/actualites" },
    title: "Actualités – ISO Tradition",
    description:
      settings?.seoDescription ||
      "Conseils, guides et actualités sur les fenêtres, portes et rénovation énergétique en Suisse par Iso Tradition.",
  };
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("fr-CH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function Actualites() {
  const posts = await getAllBlogPosts();

  if (!posts || posts.length === 0) {
    return <BlogPage />;
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const articles = posts
    .filter((p: any) => p.slug && p.title)
    .map((p: any) => ({
      slug: p.slug,
      tag: p.category || "Article",
      title: p.title,
      date: formatDate(p.date),
      image: p.image?.asset
        ? urlForImage(p.image).width(800).height(600).url()
        : "/images/blog-1.webp",
    }));

  return <BlogPage articles={articles.length > 0 ? articles : undefined} />;
}
