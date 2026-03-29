"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import BrandIcon from "./BrandIcon";
import { FadeIn } from "./Motion";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface ProductData {
  name: string;
  heroImage: string;
  intro: string;
  materials?: string[];
  options?: { label: string; values: string[] }[];
  whyTitle: string;
  whyText: string;
  advantages: string[];
  types?: { name: string; description: string }[];
  faq: { question: string; answer: string }[];
}

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Nos solutions", href: "/nos-solutions" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export default function ProductPage({ product }: { product: ProductData }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Nav */}
      <section className="bg-white">
        <div className="px-6 sm:px-10 lg:px-14 pt-6 pb-4">
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <Link href="/" className="shrink-0">
              <Image src="/images/logo-couleur.png" alt="ISO Tradition" width={160} height={50} className="h-10 lg:h-12 w-auto" priority />
            </Link>
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const Tag = link.href.startsWith("/") ? Link : "a";
                return (
                  <li key={link.label}>
                    <Tag href={link.href}
                      className={`font-medium text-[13px] xl:text-[14px] transition-colors relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-accent after:transition-all ${
                        link.label === "Nos solutions" ? "text-primary after:w-full" : "text-primary/60 hover:text-primary"
                      }`}
                    >{link.label}</Tag>
                  </li>
                );
              })}
            </ul>
            <a href="https://form.typeform.com/to/astTYipT" target="_blank" rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-5 py-2.5 rounded-full text-sm transition-colors group"
            >
              Demander une offre
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </span>
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-primary" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
              </svg>
            </button>
          </div>
          <AnimatePresence>
            {mobileOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="lg:hidden mt-3">
                <div className="bg-secondary rounded-[20px] px-6 py-5 space-y-1">
                  {navLinks.map((link) => {
                    const Tag = link.href.startsWith("/") ? Link : "a";
                    return <Tag key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-primary/80 hover:text-primary hover:bg-white rounded-xl font-medium text-[15px] transition-colors">{link.label}</Tag>;
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Header />

      {/* Hero */}
      <section className="relative py-14 lg:py-20 overflow-hidden">
        <Image src={product.heroImage} alt={product.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link href="/nos-solutions" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Toutes nos solutions
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-bold text-white leading-tight mb-6">
              {product.name}
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-white/70 text-[15px] lg:text-base leading-relaxed max-w-2xl mb-8">{product.intro}</p>
          </FadeIn>
          {/* Material + options pills */}
          {product.materials && (
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.materials.map(m => (
                  <span key={m} className="bg-white/15 text-white text-[12px] font-semibold px-3 py-1.5 rounded-full">{m}</span>
                ))}
              </div>
            </FadeIn>
          )}
          <FadeIn delay={0.25}>
            <a href="https://form.typeform.com/to/astTYipT" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-6 py-3 rounded-full text-[15px] transition-colors group"
            >
              Demander un devis
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Why Replace */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight mb-4">{product.whyTitle}</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-primary/70 text-[15px] leading-relaxed max-w-3xl mb-10">{product.whyText}</p>
          </FadeIn>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-14 lg:py-20 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight mb-10">
              Les principaux <span className="text-accent">atouts</span>
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.advantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [...ease] }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex items-start gap-3 bg-white rounded-[16px] p-5"
              >
                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                <span className="text-primary text-[14px] font-medium leading-snug">{adv}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Types (if available) */}
      {product.types && product.types.length > 0 && (
        <section className="py-14 lg:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight mb-10">
                Types &amp; <span className="text-accent">personnalisation</span>
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.types.map((type, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [...ease] }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`rounded-[20px] p-7 ${i === 0 ? "bg-accent" : i % 2 === 1 ? "bg-primary" : "bg-secondary"}`}
                >
                  <h3 className={`text-lg font-bold mb-3 ${i === 0 ? "text-primary-dark" : i % 2 === 1 ? "text-white" : "text-primary"}`}>{type.name}</h3>
                  <p className={`text-[14px] leading-relaxed ${i === 0 ? "text-primary-dark/70" : i % 2 === 1 ? "text-white/70" : "text-primary/60"}`}>{type.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-primary relative overflow-hidden">
        <BrandIcon className="absolute -right-16 -bottom-16 w-[350px] h-[350px] text-white opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-20">
            <FadeIn>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Questions <span className="text-accent">fréquentes</span>
                </h2>
              </div>
            </FadeIn>
            <div className="space-y-0">
              {product.faq.map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="border-b border-white/10">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between py-6 text-left"
                    >
                      <span className={`text-[15px] font-semibold transition-colors pr-4 ${openFaq === i ? "text-accent" : "text-white"}`}>
                        {item.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? "bg-accent" : "bg-white/10"}`}>
                        <svg className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-45 text-primary-dark" : "text-white"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [...ease] }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/60 text-[14px] leading-relaxed pb-6 pr-12">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-white text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary leading-tight mb-4">
              Prêt à transformer votre <span className="text-accent">habitat</span> ?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-primary/60 text-[15px] max-w-2xl mx-auto mb-8">Contactez-nous pour une visite technique gratuite et un devis personnalisé.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a href="https://form.typeform.com/to/astTYipT" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-8 py-3.5 rounded-full text-[15px] transition-colors group"
            >
              Demander une offre gratuite
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </span>
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
