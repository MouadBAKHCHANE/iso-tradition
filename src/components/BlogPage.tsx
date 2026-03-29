"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import BrandIcon from "./BrandIcon";
import { FadeIn } from "./Motion";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const articles = [
  {
    slug: "subventions-2026-suisse",
    tag: "Subventions",
    title: "Les subventions 2026 en Suisse pour la rénovation énergétique",
    date: "15 mars 2026",
    image: "/images/blog-1.jpg",
  },
  {
    slug: "triple-ou-double-vitrage",
    tag: "Conseils",
    title: "Triple vitrage ou double vitrage ? Le guide complet",
    date: "10 mars 2026",
    image: "/images/blog-2.jpg",
  },
  {
    slug: "normes-uw",
    tag: "Réglementation",
    title: "Les normes Uw : qu'est-ce que c'est et pourquoi c'est important ?",
    date: "5 mars 2026",
    image: "/images/blog-3.jpg",
  },
  {
    slug: "choisir-materiau-fenetres",
    tag: "Matériaux",
    title: "Choisir le bon matériau pour vos nouvelles fenêtres",
    date: "28 février 2026",
    image: "/images/blog-4.jpg",
  },
  {
    slug: "entretien-fenetres-bois",
    tag: "Entretien",
    title: "Comment entretenir vos fenêtres en bois pour qu'elles durent",
    date: "20 février 2026",
    image: "/images/blog-5.jpg",
  },
  {
    slug: "deperditions-thermiques",
    tag: "Énergie",
    title: "Identifier et réduire les déperditions thermiques de votre habitat",
    date: "14 février 2026",
    image: "/images/blog-6.jpg",
  },
];

const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const tags = ["Tous", ...Array.from(new Set(articles.map(a => a.tag)))];
  const filteredArticles = activeFilter === "Tous" ? articles : articles.filter(a => a.tag === activeFilter);
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header forceVisible />

      {/* ── Heading ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-8 lg:pb-12">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-bold text-primary text-center leading-tight mb-8 lg:mb-10">
              Actualités
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setActiveFilter(tag); setCurrentPage(1); }}
                  className={`px-4 lg:px-5 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                    activeFilter === tag
                      ? "bg-primary text-white"
                      : "bg-secondary text-primary/60 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className="pb-14 lg:pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginatedArticles.map((article, i) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [...ease] }}
                viewport={{ once: true, amount: 0.2 }}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="relative rounded-[20px] overflow-hidden mb-4">
                  {/* Tag badge */}
                  <span className="absolute top-4 left-4 z-10 bg-white text-primary text-[12px] font-semibold px-3 py-1 rounded-full shadow-md">
                    {article.tag}
                  </span>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                {/* Text */}
                <h2 className="text-lg lg:text-xl font-bold text-primary leading-snug mb-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h2>
                <p className="text-primary/50 text-sm">{article.date}</p>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-12 lg:mt-16">
            <p className="text-primary/40 text-sm">
              {currentPage} / {totalPages}
            </p>
            <div className="flex gap-3">
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="inline-flex items-center gap-2 border border-primary/20 hover:border-primary/40 text-primary font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  Précédent
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-6 py-2.5 rounded-full text-sm transition-colors"
                >
                  Suivant
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
        <BrandIcon className="absolute -right-16 bottom-[-80px] w-[400px] h-[400px] text-primary opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary leading-tight mb-4">
              Obtenez un <span className="text-accent">devis gratuit</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-primary/60 text-[15px] leading-relaxed max-w-2xl mx-auto mb-8">
              Nos experts se déplacent gratuitement pour évaluer votre projet et vous proposer
              une solution sur mesure.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://form.typeform.com/to/astTYipT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-8 py-3.5 rounded-full text-[15px] transition-colors group"
              >
                Demander une offre gratuite
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>
              <a
                href="tel:0216245300"
                className="inline-flex items-center gap-2 border border-primary/20 hover:border-primary/40 text-primary font-semibold px-8 py-3.5 rounded-full text-[15px] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                021 624 53 00
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
