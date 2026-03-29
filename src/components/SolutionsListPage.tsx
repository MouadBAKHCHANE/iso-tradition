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

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Nos solutions", href: "/nos-solutions" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

const solutions = [
  { name: "Fenêtres", slug: "/nos-solutions/fenetres", image: "/images/sol-fenetres.jpg", tags: ["PVC", "Bois", "Aluminium"] },
  { name: "Baies coulissantes", slug: "/nos-solutions/baies-coulissantes", image: "/images/sol-baies.jpg", tags: ["PVC", "Aluminium"] },
  { name: "Portes d'entrée", slug: "/nos-solutions/portes-entree", image: "/images/sol-portes.jpg", tags: ["PVC", "Bois", "Aluminium"] },
  { name: "Volets", slug: "/nos-solutions/volets", image: "/images/sol-volets.jpg", tags: ["PVC", "Aluminium", "Bois"] },
  { name: "Portes de garage", slug: "/nos-solutions/portes-garage", image: "/images/sol-garage.jpg", tags: ["Aluminium", "Acier"] },
  { name: "Stores bannes", slug: "/nos-solutions/stores-bannes", image: "/images/sol-stores.jpg", tags: ["Aluminium"] },
  { name: "Films solaires", slug: "/nos-solutions/films-solaires", image: "/images/sol-film.png", tags: ["Anti-UV", "Anti-chaleur"] },
  { name: "Carports & Pergolas", slug: "/nos-solutions/carports-pergolas", image: "/images/sol-carport.jpg", tags: ["Aluminium", "Bois"] },
];

const materials = ["Tous", "PVC", "Bois", "Aluminium", "Acier", "Anti-UV"];

export default function SolutionsListPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState("Tous");

  const filtered = filter === "Tous"
    ? solutions
    : solutions.filter(s => s.tags.includes(filter));

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

        {/* Hero */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 pb-8 lg:pb-10">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-bold text-primary text-center leading-tight mb-4">
              Nos <span className="text-accent">solutions</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-primary/60 text-base text-center max-w-2xl mx-auto mb-8">
              Des menuiseries 100% personnalisables pour tous les besoins et tous les styles d&apos;habitat. Matériaux, vitrage, couleurs, finitions : à l&apos;infini !
            </p>
          </FadeIn>
          {/* Material filter pills */}
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
              {materials.map((m) => (
                <button key={m} onClick={() => setFilter(m)}
                  className={`px-4 lg:px-5 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                    filter === m ? "bg-primary text-white" : "bg-secondary text-primary/60 hover:bg-primary/10 hover:text-primary"
                  }`}
                >{m}</button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="pb-14 lg:pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {filtered.map((sol, i) => (
              <motion.div
                key={sol.slug}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [...ease] }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link href={sol.slug} className="group block relative rounded-[24px] overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[3/4]">
                    <Image src={sol.image} alt={sol.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    {/* Overlay — darkens on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent group-hover:from-accent/40 transition-all duration-500" />
                  </div>
                  {/* Title inside image */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 pb-16">
                    <h3 className="text-white font-bold text-lg lg:text-xl leading-snug drop-shadow-md">
                      {sol.name}
                    </h3>
                  </div>
                  {/* Arrow button — bottom left */}
                  <div className="absolute bottom-0 left-0">
                    <div className="relative">
                      <div className="w-12 h-12 bg-white group-hover:bg-accent flex items-center justify-center rounded-tr-[16px] transition-colors duration-300">
                        <svg className="w-5 h-5 text-primary group-hover:text-primary-dark transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <FadeIn delay={0.2}>
            <div className="mt-12 lg:mt-16 text-center">
              <p className="text-primary/40 text-lg lg:text-xl italic max-w-xl mx-auto leading-relaxed">
                &ldquo;Chaque jour, nous installons des portes et fenêtres conçues pour durer.&rdquo;
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Header />

      {/* Why Replace Section */}
      <section className="py-14 lg:py-20 bg-primary relative overflow-hidden">
        <BrandIcon className="absolute -right-16 -bottom-16 w-[400px] h-[400px] text-white opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white leading-tight mb-6 uppercase tracking-wider">
              Pourquoi remplacer <span className="text-accent">vos portes <br className="hidden lg:block"/>&amp; fenêtres</span>
              <span className="block mt-4 w-16 h-1.5 bg-white"></span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="text-xl sm:text-2xl font-bold text-white/90 mb-4">
              Plus de <span className="text-accent">confort</span> et plus d&apos;<span className="text-accent">économies</span> —
            </h3>
            <p className="text-white/80 text-[15px] sm:text-base leading-relaxed max-w-4xl mb-12 font-medium tracking-wide">
              Le remplacement des fenêtres et des portes d&apos;entrée est bien plus qu&apos;un simple changement esthétique. Il s&apos;agit d&apos;un investissement durable qui améliore le confort, la performance énergétique et la valeur du logement, tout en répondant aux exigences actuelles en matière d&apos;habitat.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 relative z-10">
            {[
              {
                titleLine1: "Confort",
                titleLine2: "de vie optimal",
                items: ["une température intérieure plus stable", "un confort optimal été comme hiver", "une meilleure luminosité"],
                image: "/images/icons/confort.png"
              },
              {
                titleLine1: "Réduction",
                titleLine2: "des factures",
                items: ["limite les déperditions de chaleur", "réduit les besoins en chauffage", "conserve l'énergie produite"],
                image: "/images/icons/reductions.png"
              },
              {
                titleLine1: "Impact",
                titleLine2: "écologique",
                items: ["réduction des émissions de CO₂", "utilisation responsable des ressources", "démarche durable d'avenir"],
                image: "/images/icons/impact.png"
              },
              {
                titleLine1: "Isolation",
                titleLine2: "acoustique",
                items: ["circulation routière", "voisinage", "environnement urbain ou périurbain"],
                image: "/images/icons/isolation.png"
              },
              {
                titleLine1: "Sécurité",
                titleLine2: "renforcée",
                items: ["ferrures renforcées", "vitrages de sécurité", "systèmes de fermeture multipoints"],
                image: "/images/icons/securite.png"
              },
              {
                titleLine1: "Plus-value",
                titleLine2: "du bien",
                items: ["étiquette verte", "matériaux robustes et durables", "finitions personnalisables et élégantes"],
                image: "/images/icons/plusvalue.png"
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [...ease] }}
                viewport={{ once: true, amount: 0.3 }}
                className="group border border-white/10 rounded-2xl p-6 lg:p-7 flex flex-col gap-6 relative overflow-hidden bg-white/10 shadow-xl"
              >
                {/* Background icon */}
                <div className="absolute -right-6 -top-6 w-[140px] h-[140px] opacity-20 pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-70 group-hover:-rotate-6">
                  <Image src={card.image} alt="" fill className="object-contain" />
                </div>

                <div className="flex items-start relative z-10">
                  {/* Pill Titles */}
                  <div className="flex flex-col items-start gap-1.5 text-left w-full mt-1">
                    <span className="bg-white/20 group-hover:bg-accent text-white group-hover:text-primary-dark font-bold px-3 py-1 flex items-center justify-center rounded-[6px] shadow-sm text-[13px] sm:text-[14px] lg:text-[15px] tracking-wide uppercase inline-flex whitespace-nowrap transition-colors duration-300">
                      {card.titleLine1}
                    </span>
                    <span className="bg-white/20 text-white font-bold px-3 py-1 flex items-center justify-center rounded-[6px] shadow-sm text-[13px] sm:text-[14px] lg:text-[15px] tracking-wide uppercase inline-flex whitespace-nowrap">
                      {card.titleLine2}
                    </span>
                  </div>
                </div>

                {/* Bottom: Left aligned items array */}
                <ul className="space-y-2.5 mt-2 ml-1 relative z-10">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-white/80 font-medium text-[14px] sm:text-[15px] leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p className="text-white font-bold text-xl lg:text-2xl text-center mt-12 lg:mt-16 mx-auto max-w-3xl leading-snug drop-shadow-md">
              &ldquo;Jusqu&apos;à <span className="text-accent">70%</span> d&apos;économies sur vos factures <br className="hidden sm:block"/> dans le cadre d&apos;une rénovation globale&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Regulations & Subsidies */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-primary/40" />
              <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">Contexte réglementaire</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary leading-tight mb-6">
              Normes, réglementations &amp; <span className="text-accent">subventions</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-primary/70 text-[15px] leading-relaxed max-w-4xl mb-10">
              En Suisse, le remplacement des fenêtres et des portes est encadré par des exigences énergétiques élevées. Les solutions que nous proposons y répondent sans exception. Les subventions sont possibles uniquement dans le cadre d&apos;une rénovation énergétique globale, et les travaux sont encore fiscalement déductibles, jusqu&apos;en 2028.
            </p>
          </FadeIn>
          <div className="flex flex-col gap-6">
            {/* Aides financières */}
            <FadeIn delay={0.2}>
              <div className="bg-secondary rounded-[20px] overflow-hidden flex flex-col lg:flex-row">
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-5"><span className="inline-block bg-accent text-primary-dark font-bold text-[13px] px-4 py-1.5 rounded-full">Aides financières &amp; subventions</span></div>
                  <p className="text-primary/70 text-[15px] leading-relaxed mb-4">
                    Le Programme Bâtiments est le principal outil fédéral et cantonal d&apos;aide aux rénovations énergétiques. Il peut financer jusqu&apos;à environ <span className="text-accent font-bold">30%</span> des coûts d&apos;investissement d&apos;une rénovation.
                  </p>
                  <p className="text-primary font-bold text-lg italic mb-4">
                    &ldquo;Des aides allant jusqu&apos;à <span className="text-accent">30%</span> du coût d&apos;investissement&rdquo;
                  </p>
                  <p className="text-primary/60 text-[14px] leading-relaxed">
                    Pour en bénéficier, le projet doit s&apos;inscrire dans un projet global de rénovation énergétique. La plupart des cantons exigent un diagnostic énergétique (certificat CECB/CECB Plus) ou une labellisation (Minergie).
                  </p>
                </div>
                <div className="relative w-full lg:w-1/3 h-48 lg:h-auto flex-shrink-0">
                  <Image src="/images/programme-batiments.png" alt="Le Programme Bâtiments" fill className="object-contain object-center scale-125" />
                </div>
              </div>
            </FadeIn>
            {/* Normes */}
            <FadeIn delay={0.3}>
              <div className="bg-primary rounded-[20px] overflow-hidden flex flex-col lg:flex-row">
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-5"><span className="inline-block bg-accent text-primary-dark font-bold text-[13px] px-4 py-1.5 rounded-full">Normes &amp; performances</span></div>
                  <p className="text-white/80 text-[15px] leading-relaxed mb-5">
                    Les nouvelles menuiseries doivent respecter des valeurs &ldquo;U&rdquo; minimales (performance thermique) fixées par :
                  </p>
                  <ul className="space-y-2 mb-6">
                    {["Les lois cantonales sur l'énergie", "Le modèle intercantonal MoPEC", "La norme technique SIA 380/1"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-white/70 text-[14px]">
                        <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white/10 rounded-xl p-5 mb-4">
                    <p className="text-white font-semibold text-sm mb-2">En résumé :</p>
                    <p className="text-accent font-bold text-[15px]">Uw ≤ 1.0 W/m²K → GE, VD, NE, FR</p>
                    <p className="text-accent font-bold text-[15px]">Uw ≤ 1.3 W/m²K → cas valaisan</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-5">
                    <p className="text-white font-bold text-[15px]">Le triple vitrage n&apos;est pas obligatoire, mais devient la solution de référence.</p>
                  </div>
                </div>
                <div className="relative w-full lg:w-1/2 h-56 lg:h-auto flex-shrink-0">
                  <Image src="/images/scandinavian-window.jpg" alt="Wooden Window" fill className="object-cover object-center" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-secondary/50 relative overflow-hidden">
        <BrandIcon className="absolute -left-16 bottom-[-60px] w-[350px] h-[350px] text-primary opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary leading-tight mb-4">
              Prêt à lancer votre <span className="text-accent">projet</span> ?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-primary/60 text-[15px] leading-relaxed max-w-2xl mx-auto mb-8">
              Nos experts se déplacent gratuitement pour évaluer votre projet et vous proposer une solution sur mesure.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://form.typeform.com/to/astTYipT" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-8 py-3.5 rounded-full text-[15px] transition-colors group"
              >
                Demander une offre gratuite
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </span>
              </a>
              <a href="tel:0216245300" className="inline-flex items-center gap-2 border border-primary/20 hover:border-primary/40 text-primary font-semibold px-8 py-3.5 rounded-full text-[15px] transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
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
