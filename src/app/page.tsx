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
import { getHomepage } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage();

  if (!page) return {};

  return {
    title: page.seoTitle || undefined,
    description: page.seoDescription || undefined,
    openGraph: {
      title: page.seoTitle || undefined,
      description: page.seoDescription || undefined,
      ...(page.ogImage?.asset?.url && {
        images: [{ url: page.ogImage.asset.url }],
      }),
    },
  };
}

export default async function Home() {
  // Fetch homepage data from Sanity (used for metadata now; will be passed to components later)
  // const homepage = await getHomepage();

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
        <Blog />
        <ServiceArea />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
