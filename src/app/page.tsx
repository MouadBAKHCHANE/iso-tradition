import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import Solutions from "@/components/Solutions";
import WhyReplace from "@/components/WhyReplace";
import Strengths from "@/components/Strengths";
import ProjectCTA from "@/components/ProjectCTA";
import Blog from "@/components/Blog";
import ServiceArea from "@/components/ServiceArea";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { getHomepage, getAllBlogPosts } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage();

  if (!page) return {};

  return {
    title: page.seoTitle || undefined,
    description: page.seoDescription || undefined,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "fr_CH",
      url: "https://www.isotradition.ch",
      siteName: "ISO Tradition",
      title: page.seoTitle || undefined,
      description: page.seoDescription || undefined,
      images: page.ogImage?.asset?.url
        ? [{ url: page.ogImage.asset.url }]
        : [
            {
              url: "/images/hero-terrace.webp",
              width: 2000,
              height: 1334,
              alt: "ISO Tradition – Fenêtres et portes suisses",
            },
          ],
    },
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default async function Home() {
  const blogPosts = await getAllBlogPosts();

  const latestPosts =
    blogPosts && blogPosts.length > 0
      ? blogPosts
          .slice(0, 3)
          .filter((p: any) => p.slug && p.title)
          .map((p: any) => ({
            slug: p.slug,
            tag: p.category || "Article",
            title: p.title,
            date: formatDate(p.date),
            image: p.image?.asset
              ? urlForImage(p.image).width(800).height(600).url()
              : "/images/blog-1.webp",
          }))
      : undefined;

  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutPreview />
        <Solutions />
        <WhyReplace />
        <Strengths />
        <ProjectCTA />
        <Blog posts={latestPosts && latestPosts.length > 0 ? latestPosts : undefined} />
        <ServiceArea />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
