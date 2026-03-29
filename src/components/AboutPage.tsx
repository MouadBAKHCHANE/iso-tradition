"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import BrandIcon from "./BrandIcon";
import { FadeIn } from "./Motion";
import { motion, useInView } from "framer-motion";

function CountUp({ target, decimals = 0, duration = 2000, format = false, prefix = "", suffix = "" }: {
  target: number; decimals?: number; duration?: number; format?: boolean; prefix?: string; suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.6, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  const displayed = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();
  const formatted = format ? displayed.replace(/\B(?=(\d{3})+(?!\d))/g, "'") : displayed;

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

const stats = [
  { target: 35, prefix: "+", suffix: "", label: "années d'expérience" },
  { target: 2500, prefix: "+", suffix: "", label: "projets réalisés", format: true },
  { target: 100, prefix: "", suffix: "%", label: "pose interne" },
  { target: 4.9, prefix: "", suffix: "/5", label: "avis clients", decimals: 1 },
];

const processSteps = [
  { num: "01", title: "Prise de contact", description: "Nos experts locaux vous recontactent pour une prise de RDV.", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" },
  { num: "02", title: "1ère rencontre", description: "L'un de nos experts se déplace chez vous pour évaluer votre besoin.", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
  { num: "03", title: "Visite technique", description: "Recueil des données techniques du projet et relevé des dimensions.", icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { num: "04", title: "Choix des solutions", description: "Nous vous proposons des solutions sur mesure (vitrage, matériau, finitions, couleurs).", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" },
  { num: "05", title: "Aides & subventions", description: "Notre service administratif se charge de la demande des subventions (le cas échéant).", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { num: "06", title: "Planification de la pose", description: "Nous fixons avec vous l'échéancier pour la dépose et la pose de vos nouvelles menuiseries.", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" },
  { num: "07", title: "Pose & dépose", description: "La pose des nouvelles portes et fenêtres est réalisée par nos experts qualifiés dans les règles de l'art.", icon: "M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 3v18" },
  { num: "08", title: "Contrôle du chantier", description: "Contrôle visuel et fonctionnel des nouvelles menuiseries puis réception de chantier finale.", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" },
  { num: "09", title: "Conseils d'utilisation", description: "Chaque client reçoit des conseils d'entretien pour préserver la longévité des menuiseries.", icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" },
];

const partners = [
  { name: "Internorm", description: "Leader européen des fenêtres et portes" },
  { name: "Schüco", description: "Systèmes aluminium haut de gamme" },
  { name: "VELUX", description: "Fenêtres de toit et solutions lumière" },
  { name: "Somfy", description: "Motorisation et domotique" },
  { name: "Griesser", description: "Stores et protections solaires suisses" },
  { name: "Minergie", description: "Label d'efficacité énergétique suisse" },
];

const zones = [
  "Canton de Vaud",
  "Canton de Genève",
  "Canton de Fribourg",
  "Canton du Valais",
  "Canton de Neuchâtel",
];

const ease = [0.25, 0.1, 0.25, 1] as const;

function AtoutItem({ atout, i }: { atout: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: i * 0.08, ease: [...ease] }}
      viewport={{ once: true, amount: 0.5 }}
      className="flex items-start gap-5 py-5 border-b border-primary/10 last:border-b-0 group"
    >
      <motion.span
        animate={{ color: isInView ? "var(--color-accent, #f59e0b)" : "rgba(33,94,132,0.15)" }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="text-3xl lg:text-4xl font-bold leading-none flex-shrink-0 w-10 lg:!text-primary/15 lg:group-hover:!text-accent"
      >
        {i + 1}
      </motion.span>
      <h3 className="text-[15px] lg:text-base font-bold text-primary uppercase tracking-wide leading-snug pt-1.5">
        {atout}
      </h3>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Header forceVisible />

      {/* ── Hero — Roofinger-style dark centered ── */}
      <section className="relative bg-white px-2 sm:px-4 pt-24 lg:pt-28 pb-16 lg:pb-20">
        <div className="absolute inset-x-2 sm:inset-x-4 top-2 bottom-[40%] sm:bottom-[35%] lg:bottom-[30%] bg-primary rounded-[20px]" />
        <div className="relative">
          {/* ====== CENTERED HEADING + SUBTITLE ====== */}
          <div className="relative z-10 pt-10 sm:pt-12 lg:pt-14 pb-6 lg:pb-8 text-center px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="text-2xl sm:text-3xl lg:text-5xl xl:text-[56px] font-bold text-white leading-[1.3] mb-4 mx-auto max-w-3xl"
            >
              L&apos;excellence suisse au service de votre habitat
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="text-sm lg:text-base text-white/70 leading-relaxed mx-auto max-w-[70%] sm:max-w-[55%]"
            >
              Chez <span className="text-accent font-semibold">Iso Tradition</span>, nous accompagnons
              les propriétaires en Suisse romande depuis plus de 35 ans avec des fenêtres, portes
              et volets d&apos;exception.
            </motion.p>
          </div>

          {/* ====== 3 STAGGERED IMAGES — overflow bottom ====== */}
          <div className="relative z-10 mx-auto max-w-[1400px] overflow-hidden">
            <div className="flex items-start justify-center gap-5 lg:gap-7 px-4 sm:px-6 lg:px-0">
              {/* Left image — clipped at left edge, lower */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [...ease] }}
                viewport={{ once: true, amount: 0.2 }}
                className="hidden md:block relative w-[30%] flex-shrink-0 -ml-6 lg:-ml-10 mt-10 lg:mt-14"
              >
                <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden">
                  <Image
                    src="/images/about-install.jpg"
                    alt="Technicien installant une fenêtre"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Center image — larger, elevated, overlaps bottom */}
              <motion.div
                initial={{ opacity: 0, y: 70, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [...ease] }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative w-[85%] sm:w-[60%] md:w-[36%] flex-shrink-0"
              >
                <div className="relative aspect-[5/4] rounded-[20px] overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about-family.jpg"
                    alt="Famille profitant du confort de son intérieur"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Right image — clipped at right edge, mid-height */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [...ease] }}
                viewport={{ once: true, amount: 0.2 }}
                className="hidden md:block relative w-[30%] flex-shrink-0 -mr-6 lg:-mr-10 mt-6 lg:mt-8"
              >
                <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden">
                  <Image
                    src="/images/about-gate.jpg"
                    alt="Installation portail par nos équipes"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Header />

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-3xl lg:text-4xl 2xl:text-5xl font-bold text-primary mb-1">
                    <CountUp target={stat.target} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals ?? 0} format={stat.format ?? false} />
                  </p>
                  <p className="text-primary/60 text-sm font-medium">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── À propos ── */}
      <section className="py-14 lg:py-20 bg-primary relative overflow-hidden">
        <BrandIcon className="absolute -right-16 -top-16 w-[400px] h-[400px] text-white opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Centered text */}
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
            <FadeIn>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-10 bg-white/40" />
                <span className="font-secondary text-white/60 font-medium text-sm uppercase tracking-[0.2em]">
                  À propos
                </span>
                <span className="h-px w-10 bg-white/40" />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-white leading-tight mb-6">
                Une entreprise <span className="text-accent">familiale</span> ancrée en Suisse romande
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-white/70 text-[15px] leading-relaxed mb-4">
                Basés à Mies, Route de Suisse 7A, Iso Tradition est née de la passion pour le travail bien fait
                et de la conviction que chaque habitat mérite des menuiseries d&apos;exception. Depuis notre création,
                nous avons accompagné des milliers de propriétaires dans leurs projets de rénovation et de construction neuve.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/70 text-[15px] leading-relaxed mb-8">
                Notre équipe de professionnels certifiés intervient dans toute la Suisse romande avec une exigence
                constante : allier le savoir-faire traditionnel suisse aux technologies les plus avancées pour garantir
                performance énergétique, confort acoustique et esthétique durable.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <a
                href="https://form.typeform.com/to/astTYipT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-6 py-3 rounded-full text-[15px] transition-colors group"
              >
                Demander une offre
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>
            </FadeIn>
          </div>

          {/* Map below */}
          <FadeIn delay={0.3}>
            <div className="relative mx-auto max-w-4xl">
              <Image
                src="/images/carte.png"
                alt="Carte de la Suisse — Bureaux à Mies (VD)"
                width={1200}
                height={700}
                className="w-full h-auto"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Nos Valeurs ── */}
      <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
        <BrandIcon className="absolute -left-16 -bottom-16 w-[350px] h-[350px] text-primary opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-primary leading-tight mb-12 lg:mb-16">
              Nos <span className="text-accent">valeurs</span>
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 3v18" />
                  </svg>
                ),
                title: "Qualité irréprochable",
                description: "Chaque produit est sélectionné pour sa durabilité et ses performances. Nous ne faisons aucun compromis sur la qualité des matériaux et de la pose.",
                variant: "accent" as const,
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                ),
                title: "Proximité & écoute",
                description: "Un interlocuteur unique vous accompagne de A à Z. Nous prenons le temps de comprendre vos besoins pour proposer des solutions vraiment adaptées.",
                variant: "dark" as const,
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ),
                title: "Innovation durable",
                description: "Nous intégrons les dernières technologies en matière d'isolation thermique et acoustique pour un confort optimal et des économies d'énergie.",
                variant: "light" as const,
              },
            ].map((card, i) => {
              const cardBg = card.variant === "accent"
                ? "bg-accent"
                : card.variant === "dark"
                ? "bg-primary"
                : "bg-secondary";
              const cardShadowColor = card.variant === "accent"
                ? "shadow-[0_0_0_6px_#f8ad0c]"
                : card.variant === "dark"
                ? "shadow-[0_0_0_6px_#215e84]"
                : "shadow-[0_0_0_6px_#ebe9e5]";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [...ease] }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative pt-7"
                >
                  {/* Floating icon with concave notch effect */}
                  <div className="absolute -top-0 left-5 z-10">
                    <div className={`relative w-14 h-14 rounded-full flex items-center justify-center ${cardShadowColor} ${
                      card.variant === "accent"
                        ? "bg-white text-primary-dark"
                        : card.variant === "dark"
                        ? "bg-white text-primary"
                        : "bg-white text-primary"
                    }`}>
                      {card.icon}
                    </div>
                  </div>
                  {/* Card body */}
                  <div className={`rounded-[20px] pt-12 pb-8 px-8 h-full ${cardBg}`}>
                    <h3 className={`text-xl font-bold mb-3 ${
                      card.variant === "accent" ? "text-primary-dark" : card.variant === "dark" ? "text-white" : "text-primary"
                    }`}>
                      {card.title}
                    </h3>
                    <p className={`text-[14px] leading-relaxed ${
                      card.variant === "accent" ? "text-primary-dark/70" : card.variant === "dark" ? "text-white/60" : "text-primary/60"
                    }`}>
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Nos Atouts ── */}
      <section className="py-14 lg:py-20 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            {/* Left — numbered list */}
            <div className="flex flex-col">
              <FadeIn>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-10 bg-primary/40" />
                  <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
                    Nos atouts
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary leading-tight mb-10">
                  Pourquoi choisir <span className="text-accent">Iso Tradition</span> ?
                </h2>
              </FadeIn>
              <div className="space-y-0">
                {[
                  "Une expérience éprouvée sur le marché suisse",
                  "Performance, sécurité et esthétique",
                  "Des experts-métiers à votre service",
                  "Un process clé en main 100% internalisé",
                  "Un conseil personnalisé & sur-mesure",
                  "Un engagement éco-responsable",
                ].map((atout, i) => (
                  <AtoutItem key={i} atout={atout} i={i} />
                ))}
              </div>
            </div>

            {/* Right — image with quote */}
            <FadeIn direction="right" delay={0.2} className="h-full">
              <div className="relative rounded-[20px] overflow-hidden h-full min-h-[400px]">
                <Image
                  src="/images/about-cozy.jpg"
                  alt="Moments chaleureux dans un intérieur rénové"
                  fill
                  className="object-cover"
                />
                {/* Quote overlay */}
                <div className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm rounded-tl-[20px] px-6 py-5 max-w-[260px]">
                  <p className="text-primary/70 text-[14px] leading-relaxed italic">
                    &ldquo;Des experts locaux pour des portes et fenêtres de qualité&rdquo;
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Process intégré ── */}
      <section className="py-14 lg:py-20 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
            {/* Left — sticky title */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <FadeIn>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-10 bg-primary/40" />
                  <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
                    Comment ça marche
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-primary leading-tight mb-4">
                  Un process <span className="text-accent">100% intégré</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-primary/60 text-[15px] leading-relaxed mb-8">
                  La pose de fenêtres, portes ou volets est un projet technique qui mérite une approche
                  méthodique, garantissant la bonne conformité aux normes suisses et la longévité des menuiseries.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://form.typeform.com/to/astTYipT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-6 py-3 rounded-full text-[15px] transition-colors group"
                  >
                    Demander une offre
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </a>
                  <a
                    href="tel:0216245300"
                    className="inline-flex items-center gap-2 text-primary/70 hover:text-accent font-semibold text-[15px] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    021 624 53 00
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right — scrolling steps */}
            <div className="space-y-5">
              {processSteps.map((step, i) => {
                const isAccent = i === 0;
                const isDark = i % 3 === 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.55, delay: (i % 3) * 0.18, ease: [...ease] }}
                    viewport={{ once: true, amount: 0.4 }}
                    className={`rounded-[20px] p-7 relative overflow-hidden ${
                      isAccent
                        ? "bg-accent text-primary-dark"
                        : isDark
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                    }`}
                  >
                    {/* Background icon */}
                    <svg
                      className={`absolute -right-2 -bottom-2 w-24 h-24 ${
                        isAccent ? "text-primary-dark/[0.07]" : isDark ? "text-white/[0.07]" : "text-primary/[0.06]"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={0.8}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                    <span className={`font-secondary text-sm font-bold tracking-wider ${
                      isAccent ? "text-primary-dark/40" : isDark ? "text-white/30" : "text-primary/30"
                    }`}>
                      {step.num}
                    </span>
                    <h3 className="text-lg font-bold mt-1 mb-2 relative">{step.title}</h3>
                    <p className={`text-[14px] leading-relaxed relative ${
                      isAccent ? "text-primary-dark/70" : isDark ? "text-white/70" : "text-primary/60"
                    }`}>
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Nos Partenaires ── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <FadeIn>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-10 bg-primary/40" />
                <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
                  Nos partenaires
                </span>
                <span className="h-px w-10 bg-primary/40" />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-primary leading-tight mb-4">
                Ils nous font <span className="text-accent">confiance</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-primary/60 text-[15px] leading-relaxed max-w-2xl mx-auto">
                Nous collaborons avec les leaders de l&apos;industrie pour vous offrir des produits
                de la plus haute qualité, certifiés et garantis.
              </p>
            </FadeIn>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [...ease] }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-secondary/50 hover:bg-secondary rounded-[20px] p-6 flex flex-col items-center justify-center text-center transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-colors">
                  <span className="text-primary font-bold text-lg">{partner.name.charAt(0)}</span>
                </div>
                <h3 className="text-sm font-bold text-primary mb-1">{partner.name}</h3>
                <p className="text-primary/50 text-[12px] leading-snug">{partner.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bureaux & Zones d'intervention ── */}
      <section className="relative py-14 lg:py-20 overflow-hidden">
        <Image
          src="/images/suisse-paysage.jpg"
          alt="Paysage suisse"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <FadeIn>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-10 bg-white/40" />
                  <span className="font-secondary text-white/60 font-medium text-sm uppercase tracking-[0.2em]">
                    Zone d&apos;intervention
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-white leading-tight mb-6">
                  Basés à <span className="text-accent">Mies</span>, présents dans toute la Suisse romande
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-white/70 text-[15px] leading-relaxed mb-6">
                  Nos bureaux sont situés à Mies (VD), Route de Suisse 7A. De là, notre équipe intervient
                  sur l&apos;ensemble de la Suisse romande pour des projets de toute envergure.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {zones.map((zone, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-white/80 text-[14px] font-medium">{zone}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.25}>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://form.typeform.com/to/astTYipT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-6 py-3 rounded-full text-[15px] transition-colors group"
                  >
                    Demander une offre
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </a>
                  <a
                    href="tel:0216245300"
                    className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3 rounded-full text-[15px] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    021 624 53 00
                  </a>
                </div>
              </FadeIn>
            </div>
            <FadeIn direction="right" delay={0.1}>
              <div className="relative rounded-[20px] overflow-hidden shadow-2xl aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.8!2d6.1638!3d46.2968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c67ef5d8d251f%3A0xce93767682c6cdd6!2sIso%20Tradition!5e0!3m2!1sfr!2sch!4v1"
                  className="w-full h-full min-h-[300px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Iso Tradition — Mies, Suisse"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
        <BrandIcon className="absolute -left-20 -bottom-20 w-[500px] h-[500px] text-primary opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-primary leading-tight mb-4">
              Prêt à transformer <span className="text-accent">votre habitat</span> ?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-primary/60 text-[15px] leading-relaxed max-w-2xl mx-auto mb-8">
              Contactez-nous dès aujourd&apos;hui pour une visite technique gratuite et sans engagement.
              Nos experts vous accompagnent à chaque étape de votre projet.
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
