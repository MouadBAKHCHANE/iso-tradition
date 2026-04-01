"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import BrandIcon from "./BrandIcon";
import { FadeIn } from "./Motion";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const allSolutions = [
  { label: "Fenêtres", href: "/nos-solutions/fenetres" },
  { label: "Baies coulissantes", href: "/nos-solutions/baies-coulissantes" },
  { label: "Portes d'entrée", href: "/nos-solutions/portes-entree" },
  { label: "Volets", href: "/nos-solutions/volets" },
  { label: "Portes de garage", href: "/nos-solutions/portes-garage" },
  { label: "Stores bannes", href: "/nos-solutions/stores-bannes" },
  { label: "Films solaires", href: "/nos-solutions/films-solaires" },
  { label: "Carports & Pergolas", href: "/nos-solutions/carports-pergolas" },
];

interface ProductData {
  name: string;
  heroImage: string;
  intro: string;
  materials?: string[];
  options?: { label: string; values: string[] }[];
  whyTitle: string;
  whyText: string;
  whyImage?: string;
  advantages: string[];
  advantagesImage?: string;
  typesLabel?: string;
  types?: { name: string; description: string; image?: string }[];
  personalisationLabel?: string;
  personalisation?: { name: string; description: string; image?: string }[];
  personalisationOptions?: { icon: string; label: string; values?: string[]; items?: { name: string; image?: string }[] }[];
  didYouKnow?: string;
  faq: { question: string; answer: string }[];
  sections?: { id: string; visible: boolean }[];
}

function PersonalisationIcon({ type }: { type: string }) {
  const cls = "w-5 h-5 text-accent";
  const icons: Record<string, React.ReactNode> = {
    // Other icons...
    variantes: <img src="/images/icons/variantes.webp" alt="Variantes" className="w-5 h-5 object-contain" />,
    applications: <img src="/images/icons/applications.webp" alt="Applications" className="w-5 h-5 object-contain" />,
  };
  
  if (type === "variantes") return icons.variantes;
  if (type === "applications") return icons.applications;

  const defaultIcons: Record<string, React.ReactNode> = {
    formes: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1" /><circle cx="17.5" cy="6.5" r="3.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 21l4.5-7.5L12 18l3-4.5 4.5 7.5H3z" />
      </svg>
    ),
    couleurs: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c.693 0 1.25-.557 1.25-1.25a1.25 1.25 0 00-.362-.884c-.347-.347-.563-.809-.563-1.366 0-1.036.84-1.875 1.875-1.875H16a4 4 0 000-8 6 6 0 00-4-1z" /><circle cx="8" cy="10" r="1" fill="currentColor" /><circle cx="12" cy="7" r="1" fill="currentColor" /><circle cx="16" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
    motifs: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    configuration: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
    materiaux: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    vitrages: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    personnalisation: (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  };
  return <>{defaultIcons[type] ?? defaultIcons.configuration}</>;
}

function isSectionVisible(sections: { id: string; visible: boolean }[] | undefined, id: string): boolean {
  if (!sections || sections.length === 0) return true;
  const section = sections.find((s) => s.id === id);
  return section ? section.visible !== false : true;
}

export default function ProductPage({ product }: { product: ProductData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const pathname = usePathname();

  return (
    <>
      <Header forceVisible />

      {/* Hero */}
      <section className="relative pt-24 lg:pt-28 pb-10 lg:pb-14 overflow-hidden">
        <img src={product.heroImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/55" />
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
              className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-accent text-white hover:text-accent font-bold px-6 py-3 rounded-full text-[15px] transition-colors group"
            >
              Demander un devis
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Sidebar + Content layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6 pb-10 lg:pb-12">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-start">

          {/* ── Sidebar ── */}
          <aside className="lg:sticky lg:top-28 space-y-5">

            {/* Services menu */}
            <div className="bg-secondary rounded-[20px] p-5">
              <h3 className="font-bold text-primary text-[13px] uppercase tracking-[0.15em] mb-4">Nos solutions</h3>
              <ul className="space-y-0.5">
                <li>
                  <Link href="/nos-solutions" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-primary hover:bg-white transition-colors">
                    <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                    Toutes les solutions
                  </Link>
                </li>
                {allSolutions.map((sol) => (
                  <li key={sol.href}>
                    <Link
                      href={sol.href}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                        pathname === sol.href
                          ? "border-2 border-accent text-accent font-bold"
                          : "text-primary/70 hover:text-primary hover:bg-white"
                      }`}
                    >
                      <svg className="w-3 h-3 text-accent/60 flex-shrink-0" fill="currentColor" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3"/></svg>
                      {sol.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Types & options sidebar card */}
            {(product.typesLabel || product.personalisationLabel || product.personalisationOptions?.length) && (
              <div className="bg-white border border-gray-100 rounded-[20px] p-5 space-y-2">
                <h3 className="font-bold text-primary text-[13px] uppercase tracking-[0.15em] mb-3">Types &amp; options</h3>

                <div className="flex flex-wrap gap-1.5">
                  {product.typesLabel && (
                    <span className="border border-accent text-accent text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full">{product.typesLabel}</span>
                  )}

                  {product.personalisationLabel && (
                    <span className="border border-accent text-accent text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full">{product.personalisationLabel}</span>
                  )}

                  {product.personalisationOptions?.map((opt) => (
                    <span key={opt.label} className="border border-accent text-accent text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full">{opt.label}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact card */}
            <div className="hidden lg:block bg-primary rounded-[20px] p-5">
              <h3 className="font-bold text-white text-[14px] mb-1">Besoin d&apos;un conseil ?</h3>
              <p className="text-white/60 text-[13px] mb-4 leading-snug">Nos experts se déplacent gratuitement.</p>
              <a href="https://form.typeform.com/to/astTYipT" target="_blank" rel="noopener noreferrer"
                className="block w-full text-center border-2 border-white/40 hover:border-accent text-white hover:text-accent font-bold px-4 py-2.5 rounded-full text-[13px] transition-colors mb-3"
              >
                Demander une offre
              </a>
              <a href="tel:0216245300" className="flex items-center justify-center gap-2 text-white/60 hover:text-accent text-[13px] transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                021 624 53 00
              </a>
            </div>

          </aside>

          {/* ── Main content ── */}
          <main className="space-y-6">

            {/* Why Replace */}
            {isSectionVisible(product.sections, "why") && product.whyTitle && <FadeIn>
              <div className="bg-white rounded-[20px] overflow-hidden">
                {product.whyImage ? (
                  <div className="flex flex-col lg:flex-row">
                    <div className="p-8 flex-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary leading-tight mb-4">{product.whyTitle}</h2>
                      <p className="text-primary/70 text-[15px] leading-relaxed">{product.whyText}</p>
                    </div>
                    <div className="relative w-full lg:w-64 h-52 lg:h-auto flex-shrink-0">
                      <img src={product.whyImage} alt={product.whyTitle} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                  </div>
                ) : (
                  <div className="p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary leading-tight mb-4">{product.whyTitle}</h2>
                    <p className="text-primary/70 text-[15px] leading-relaxed">{product.whyText}</p>
                  </div>
                )}
              </div>
            </FadeIn>}

            {/* Advantages */}
            {isSectionVisible(product.sections, "advantages") && product.advantages?.length > 0 && <FadeIn delay={0.05}>
              <div className="relative rounded-[20px] overflow-hidden">
                {/* Background image */}
                {product.advantagesImage && (
                  <>
                    <img src={product.advantagesImage} alt="Atouts" className="absolute inset-0 w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-primary/55" />
                  </>
                )}
                {!product.advantagesImage && <div className="absolute inset-0 bg-primary" />}

                {/* BrandIcon in bg */}
                <BrandIcon className="absolute -right-10 -bottom-10 w-[280px] h-[280px] text-white opacity-[0.05] pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6">
                    Les principaux <span className="text-accent">atouts</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.advantages.map((adv, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06, ease: [...ease] }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-[14px] p-4"
                      >
                        <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        <span className="text-white text-[14px] font-medium leading-snug">{adv}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>}

            {/* Types + Personalisation — combined section */}
            {isSectionVisible(product.sections, "types") && (product.types?.length || product.personalisation?.length || product.personalisationOptions?.length) ? (
              <FadeIn delay={0.05}>
                <div className="bg-white rounded-[20px] p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary leading-tight mb-6">
                    Types &amp; options de <span className="text-accent">personnalisation</span>
                  </h2>

                  {/* Image cards — types */}
                  {product.types && product.types.length > 0 && (
                    <div className={`${(product.personalisation?.length || product.personalisationOptions?.length) ? "mb-6" : ""}`}>
                      {product.typesLabel && (
                        <div className="mb-3">
                          <span className="border border-accent text-accent text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full">{product.typesLabel}</span>
                        </div>
                      )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {product.types.map((type, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.88, y: 20 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.55, delay: i * 0.1, ease: [...ease] }}
                          viewport={{ once: true, amount: 0.3 }}
                          className="group relative rounded-[16px] overflow-hidden cursor-default h-64"
                        >
                          {type.image ? (
                            <img src={type.image} alt={type.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/15 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/0 group-hover:from-black/30 to-transparent transition-colors duration-500" />
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                          <div className="absolute inset-x-0 bottom-0 p-5">
                            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-accent mb-1.5 opacity-80">{String(i + 1).padStart(2, "0")}</p>
                            <h3 className="text-white font-bold text-[15px] leading-tight">{type.name}</h3>
                            <div className="max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500 ease-out">
                              <p className="text-white/70 text-[12px] leading-relaxed mt-2">{type.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    </div>
                  )}

                  {/* Image cards — personalisation (vitrage etc.) */}
                  {product.personalisation && product.personalisation.length > 0 && (
                    <div className={`${product.personalisationOptions?.length ? "mb-6" : ""}`}>
                      {product.personalisationLabel && (
                        <div className="mb-3">
                          <span className="border border-accent text-accent text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full">{product.personalisationLabel}</span>
                        </div>
                      )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {product.personalisation.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.88, y: 20 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.55, delay: i * 0.1, ease: [...ease] }}
                          viewport={{ once: true, amount: 0.3 }}
                          className="group relative rounded-[16px] overflow-hidden cursor-default h-64"
                        >
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/15 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/0 group-hover:from-black/30 to-transparent transition-colors duration-500" />
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                          <div className="absolute inset-x-0 bottom-0 p-5">
                            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-accent mb-1.5 opacity-80">{String(i + 1).padStart(2, "0")}</p>
                            <h3 className="text-white font-bold text-[15px] leading-tight">{item.name}</h3>
                            <div className="max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500 ease-out">
                              <p className="text-white/70 text-[12px] leading-relaxed mt-2">{item.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    </div>
                  )}

                  {/* Icon option cards */}
                  {product.personalisationOptions && product.personalisationOptions.length > 0 && (
                    <div className="space-y-4">
                      {product.personalisationOptions.map((opt, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: i * 0.06, ease: [...ease] }}
                          viewport={{ once: true, amount: 0.3 }}
                        >
                          <div className="mb-3">
                            <span className="border border-accent text-accent text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full">{opt.label}</span>
                          </div>
                          
                          {opt.values && opt.values.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {opt.values.map((v, j) => (
                                <span key={j} className="text-[12px] font-medium text-primary/70 bg-secondary px-3 py-1 rounded-full">{v}</span>
                              ))}
                            </div>
                          )}

                          {opt.items && opt.items.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mt-1">
                              {opt.items.map((item, j) => (
                                <div key={j} className="flex flex-col items-center justify-center gap-3 bg-secondary/30 border border-gray-100/50 rounded-2xl p-4 text-center hover:bg-secondary/60 transition-colors">
                                  {item.image && (
                                    <div className="relative w-16 h-16 flex-shrink-0 drop-shadow-sm">
                                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>
                                  )}
                                  <span className="text-[13px] font-semibold text-primary leading-tight">{item.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            ) : null}

            {/* Did You Know */}
            {isSectionVisible(product.sections, "didYouKnow") && product.didYouKnow && (
              <FadeIn delay={0.05}>
                <div className="bg-accent/10 border border-accent/20 rounded-[20px] p-8 flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-2">Le saviez-vous ?</p>
                    <p className="text-primary/75 text-[14px] leading-relaxed whitespace-pre-line">{product.didYouKnow}</p>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* FAQ */}
            {isSectionVisible(product.sections, "faq") && product.faq?.length > 0 && <FadeIn delay={0.05}>
              <div className="bg-primary rounded-[20px] p-8 relative overflow-hidden">
                <BrandIcon className="absolute -right-10 -bottom-10 w-[250px] h-[250px] text-white opacity-[0.04]" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-6 relative z-10">
                  Questions <span className="text-accent">fréquentes</span>
                </h2>
                <div className="space-y-0 relative z-10">
                  {product.faq.map((item, i) => (
                    <div key={i} className="border-b border-white/10">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between py-5 text-left"
                      >
                        <span className={`text-[14px] font-semibold transition-colors pr-4 ${openFaq === i ? "text-accent" : "text-white"}`}>
                          {item.question}
                        </span>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? "border-2 border-accent bg-transparent" : "bg-white/10"}`}>
                          <svg className={`w-3.5 h-3.5 transition-transform ${openFaq === i ? "rotate-45 text-primary-dark" : "text-white"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                            <p className="text-white/60 text-[13px] leading-relaxed pb-5 pr-10">{item.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>}

          </main>
        </div>
      </div>

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
              className="inline-flex items-center gap-2 border-2 border-primary/30 hover:border-accent text-primary hover:text-accent font-bold px-8 py-3.5 rounded-full text-[15px] transition-colors group"
            >
              Demander un offre
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 transition-transform group-hover:translate-x-0.5">
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
