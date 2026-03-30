"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import BrandIcon from "./BrandIcon";
import { FadeIn } from "./Motion";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

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
    href: "https://www.google.com/maps/place/Iso+Tradition/@46.2967731,6.1664223,17z/data=!3m1!4b1!4m6!3m5!1s0x478c67ef5d8d251f:0xce93767682c6cdd6!8m2!3d46.2967731!4d6.1664223!16s%2Fg%2F11wtl85_hk?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
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

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      location: (form.elements.namedItem("location") as HTMLInputElement).value,
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json();
        setErrorMsg(json.error || "Une erreur est survenue.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Impossible d'envoyer le message. Vérifiez votre connexion.");
      setStatus("error");
    }
  }
  return (
    <>
      <Header forceVisible />

      {/* ── Hero ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-10">
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
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1.5">Nom</label>
                    <input
                      type="text"
                      name="name"
                      required
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
                      required
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

                  {/* Status messages */}
                  {status === "success" && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-green-700 text-sm font-medium text-center">
                      Message envoyé avec succès ! Nous vous recontacterons rapidement.
                    </div>
                  )}
                  {status === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm font-medium text-center">
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-primary-dark font-bold py-3.5 rounded-full text-[15px] transition-colors mt-2"
                  >
                    {status === "sending" ? "Envoi en cours..." : "Envoyer"}
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

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
                  <li className="flex items-center gap-3 text-white/80 text-[14px]">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    Sur rendez-vous
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
                Demander un offre
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
