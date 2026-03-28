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
  { label: "Nos solutions", href: "/#services" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Actualités", href: "/#actualites" },
  { label: "Contact", href: "/contact" },
];

const contactCards = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Visitez-nous",
    value: "Route de Suisse 7A, 1295 Mies",
    href: "https://www.google.com/maps/place/Iso+Tradition/@46.2967731,6.1638474,17z",
    variant: "accent" as const,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    title: "Email",
    value: "contact@isotradition.ch",
    href: "mailto:contact@isotradition.ch",
    variant: "dark" as const,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "Appelez-nous",
    value: "021 624 53 00",
    href: "tel:0216245300",
    variant: "light" as const,
  },
];

const services = [
  "Fenêtres",
  "Baies coulissantes",
  "Portes d'entrée",
  "Volets",
  "Portes de garage",
  "Stores bannes",
  "Films solaires",
  "Carports & pergolas",
];

export default function ContactPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Hero with nav ── */}
      <section className="bg-white">
        {/* Nav */}
        <div className="px-6 sm:px-10 lg:px-14 pt-6 pb-4">
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logo-couleur.png"
                alt="ISO Tradition"
                width={160}
                height={50}
                className="h-10 lg:h-12 w-auto"
                priority
              />
            </Link>
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isInternal = link.href.startsWith("/");
                const Tag = isInternal ? Link : "a";
                return (
                  <li key={link.label}>
                    <Tag
                      href={link.href}
                      className={`font-medium text-[13px] xl:text-[14px] transition-colors relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-accent after:transition-all ${
                        link.label === "Contact"
                          ? "text-primary after:w-full"
                          : "text-primary/60 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Tag>
                  </li>
                );
              })}
            </ul>
            <a
              href="https://form.typeform.com/to/astTYipT"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-5 py-2.5 rounded-full text-sm transition-colors group"
            >
              Demander une offre
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-primary"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden mt-3"
              >
                <div className="bg-secondary rounded-[20px] px-6 py-5 space-y-1">
                  {navLinks.map((link) => {
                    const isInternal = link.href.startsWith("/");
                    const Tag = isInternal ? Link : "a";
                    return (
                      <Tag key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-primary/80 hover:text-primary hover:bg-white rounded-xl font-medium text-[15px] transition-colors"
                      >{link.label}</Tag>
                    );
                  })}
                  <a href="https://form.typeform.com/to/astTYipT" target="_blank" rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="block mt-3 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-4 py-3 rounded-full text-center text-sm transition-colors"
                  >Demander une offre</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hero content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 pb-10">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-bold text-primary text-center leading-tight mb-4">
              Nous sommes là pour <span className="text-accent">vous aider</span> !
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-primary/60 text-base text-center max-w-2xl mx-auto mb-10 lg:mb-14">
              Des questions ? Besoin d&apos;un devis ? Contactez-nous pour une assistance rapide ou un devis gratuit !
            </p>
          </FadeIn>

          {/* 3 Contact cards */}
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-14 lg:mb-20">
            {contactCards.map((card, i) => (
              <motion.a
                key={i}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [...ease] }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative pt-7 group block"
              >
                {/* Floating icon */}
                <div className={`absolute -top-0 left-5 z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                  card.variant === "accent"
                    ? "bg-white text-primary shadow-[0_0_0_5px_#f8ad0c]"
                    : card.variant === "dark"
                    ? "bg-white text-primary shadow-[0_0_0_5px_#215e84]"
                    : "bg-white text-primary shadow-[0_0_0_5px_#ebe9e5]"
                }`}>
                  {card.icon}
                </div>
                {/* Card */}
                <div className={`rounded-[20px] pt-10 pb-7 px-7 transition-shadow hover:shadow-lg ${
                  card.variant === "accent"
                    ? "bg-accent"
                    : card.variant === "dark"
                    ? "bg-primary"
                    : "bg-secondary"
                }`}>
                  <h2 className={`text-lg font-bold mb-1 ${
                    card.variant === "accent" ? "text-primary-dark" : card.variant === "dark" ? "text-white" : "text-primary"
                  }`}>
                    {card.title}
                  </h2>
                  <p className={`text-[14px] underline underline-offset-2 ${
                    card.variant === "accent" ? "text-primary-dark/80" : card.variant === "dark" ? "text-white/80" : "text-primary/70"
                  }`}>
                    {card.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Form + Image row */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left — Image */}
            <FadeIn direction="left">
              <div className="relative rounded-[20px] overflow-hidden h-full min-h-[400px] lg:min-h-[550px]">
                <Image
                  src="/images/contact-team.avif"
                  alt="Équipe Iso Tradition à votre service"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>

            {/* Right — Form */}
            <FadeIn direction="right" delay={0.15}>
              <div className="bg-secondary rounded-[20px] p-8 lg:p-10">
                <h2 className="text-xl lg:text-2xl font-bold text-primary mb-8">
                  Nous sommes là pour tous vos projets de menuiserie
                </h2>
                <form
                  action="https://form.typeform.com/to/astTYipT"
                  target="_blank"
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1.5">Nom</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jean Dupont"
                      className="w-full bg-white rounded-full px-5 py-3 text-sm text-primary placeholder:text-primary/40 border-0 outline-none focus:ring-2 focus:ring-accent/40 transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="exemple@email.com"
                      className="w-full bg-white rounded-full px-5 py-3 text-sm text-primary placeholder:text-primary/40 border-0 outline-none focus:ring-2 focus:ring-accent/40 transition"
                    />
                  </div>

                  {/* Phone + Service */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1.5">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+41 XX XXX XX XX"
                        className="w-full bg-white rounded-full px-5 py-3 text-sm text-primary placeholder:text-primary/40 border-0 outline-none focus:ring-2 focus:ring-accent/40 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1.5">Service</label>
                      <select
                        name="service"
                        className="w-full bg-white rounded-full px-5 py-3 text-sm text-primary/60 border-0 outline-none focus:ring-2 focus:ring-accent/40 transition appearance-none"
                      >
                        <option value="">Choisir un service...</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Location + Date */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1.5">Localisation</label>
                      <input
                        type="text"
                        name="location"
                        placeholder="Ville / Canton"
                        className="w-full bg-white rounded-full px-5 py-3 text-sm text-primary placeholder:text-primary/40 border-0 outline-none focus:ring-2 focus:ring-accent/40 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1.5">Date souhaitée</label>
                      <input
                        type="text"
                        name="date"
                        placeholder="jj-mm-aaaa"
                        className="w-full bg-white rounded-full px-5 py-3 text-sm text-primary placeholder:text-primary/40 border-0 outline-none focus:ring-2 focus:ring-accent/40 transition"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-hover text-primary-dark font-bold py-3.5 rounded-full text-[15px] transition-colors mt-2"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Header />

      {/* ── Map Section ── */}
      <section className="py-14 lg:py-20 bg-primary relative overflow-hidden">
        <BrandIcon className="absolute -right-16 -top-16 w-[400px] h-[400px] text-white opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <FadeIn>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-10 bg-white/40" />
                  <span className="font-secondary text-white/60 font-medium text-sm uppercase tracking-[0.2em]">
                    Notre emplacement
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
                  Rendez-nous <span className="text-accent">visite</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-white/70 text-[15px] leading-relaxed mb-6">
                  Nos bureaux sont situés à Mies (VD), au bord du lac Léman. Nous vous accueillons
                  du lundi au vendredi pour discuter de votre projet.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-white/80 text-[14px]">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Route de Suisse 7A, 1295 Mies, Suisse
                  </li>
                  <li>
                    <a href="tel:0216245300" className="flex items-center gap-3 text-white/80 hover:text-accent text-[14px] transition-colors">
                      <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      021 624 53 00
                    </a>
                  </li>
                  <li>
                    <a href="mailto:contact@isotradition.ch" className="flex items-center gap-3 text-white/80 hover:text-accent text-[14px] transition-colors">
                      <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      contact@isotradition.ch
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-white/80 text-[14px]">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Lun - Ven : 8h00 - 17h00
                  </li>
                </ul>
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

      {/* ── CTA ── */}
      <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
        <BrandIcon className="absolute -left-16 -bottom-16 w-[400px] h-[400px] text-primary opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary leading-tight mb-4">
              Obtenez un <span className="text-accent">devis gratuit</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-primary/60 text-[15px] leading-relaxed max-w-2xl mx-auto mb-8">
              Nos experts se déplacent gratuitement pour évaluer votre projet et vous proposer
              une solution sur mesure adaptée à vos besoins et votre budget.
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
