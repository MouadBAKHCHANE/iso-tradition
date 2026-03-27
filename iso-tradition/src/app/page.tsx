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

export default function Home() {
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
