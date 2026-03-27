"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "./Motion";

function CardWrap({ children, i, className = "" }: { children: React.ReactNode; i: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Strengths() {
  return (
    <section className="py-16 lg:py-20 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — left text + right CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-10 bg-primary/40" />
                <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
                  Nos atouts
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-primary leading-tight mb-4">
                Pourquoi choisir{" "}
                <span className="text-accent">Iso Tradition ?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                Plus de 35 ans d&apos;expertise certifiée en Suisse. Des solutions
                sur mesure alliant technologie de pointe, matériaux performants et
                qualité irréprochable pour votre confort et vos économies d&apos;énergie.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <a
              href="https://form.typeform.com/to/astTYipT" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-6 py-3 rounded-full transition-colors text-[15px] group shrink-0"
            >
              Demander une offre
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </a>
          </FadeIn>
        </div>

        {/* Bento Grid — 3 cols, with animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 md:auto-rows-[200px]">
          {/* ===== Row 1, Col 1: Dark stat card ===== */}
          <CardWrap i={0} className="h-full">
            <div className="relative bg-primary rounded-[20px] p-8 flex flex-col justify-end h-full overflow-hidden">
              <div className="absolute top-0 right-0">
                <div className="bg-white rounded-bl-[16px] sm:rounded-bl-[24px] px-3 py-1.5 sm:px-7 sm:py-4">
                  <span className="text-xl sm:text-4xl font-bold text-primary">+2&apos;500</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1">
                  Portes &amp; fenêtres posées
                </h3>
                <p className="text-white/60 text-[14px] leading-relaxed">
                  Un volume qui témoigne de la confiance de nos clients
                  et de notre capacité d&apos;exécution.
                </p>
              </div>
            </div>
          </CardWrap>

          {/* ===== Row 1-2, Col 2: Tall pergola image (spans 2 rows) ===== */}
          <CardWrap i={1} className="md:row-span-2 h-full min-h-[200px]">
            <div className="relative rounded-[20px] overflow-hidden h-full">
              <Image
                src="/images/strength-3.jpg"
                alt="Pergola moderne"
                fill
                className="object-cover"
              />
            </div>
          </CardWrap>

          {/* ===== Row 1, Col 3: Light stat card ===== */}
          <CardWrap i={2} className="h-full">
            <div className="relative bg-secondary rounded-[20px] p-8 flex flex-col justify-center h-full">
              <span className="text-4xl font-bold text-primary mb-2">100%</span>
              <h3 className="font-bold text-primary text-lg mb-2">
                Pose par nos équipes internes
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                Aucune sous-traitance. Chaque installation est réalisée
                par nos poseurs qualifiés pour un résultat irréprochable.
              </p>
            </div>
          </CardWrap>

          {/* ===== Row 2, Col 1: Living room image ===== */}
          <CardWrap i={3} className="h-full">
            <div className="relative rounded-[20px] overflow-hidden h-full min-h-[200px]">
              <Image
                src="/images/strength-living.jpg"
                alt="Salon avec baies vitrées"
                fill
                className="object-cover"
              />
            </div>
          </CardWrap>

          {/* Row 2, Col 2 is occupied by pergola row-span-2 */}

          {/* ===== Row 2, Col 3: Accent card ===== */}
          <CardWrap i={4} className="h-full">
            <div className="relative bg-accent rounded-[20px] p-8 flex flex-col justify-center h-full">
              <span className="text-4xl font-bold text-primary mb-2 block">1:1</span>
              <h3 className="text-2xl font-bold text-primary leading-tight">
                Un conseil personnalisé
                <br />
                &amp; sur-mesure
              </h3>
            </div>
          </CardWrap>

          {/* ===== Row 3: Worker image (spans 2 cols) + stat card ===== */}
          <CardWrap i={5} className="md:col-span-2 h-full min-h-[200px]">
            <div className="relative rounded-[20px] overflow-hidden h-full">
              <Image
                src="/images/strength-worker.jpg"
                alt="Technicien professionnel en intervention"
                fill
                className="object-cover"
              />
              {/* Overlay text */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 z-10">
                <h3 className="text-white font-bold text-2xl mb-2">
                  Des experts à votre service
                </h3>
                <p className="text-white/70 text-[14px] leading-relaxed max-w-sm">
                  Notre équipe de techniciens certifiés intervient avec
                  rigueur et professionnalisme sur chaque chantier.
                </p>
              </div>
            </div>
          </CardWrap>

          <CardWrap i={6} className="h-full">
            <div className="relative bg-primary rounded-[20px] p-8 flex flex-col justify-center h-full">
              <span className="text-4xl font-bold text-white mb-2 block">+35</span>
              <h3 className="font-bold text-white text-lg mb-2">
                Années d&apos;expérience
              </h3>
              <p className="text-white/60 text-[14px] leading-relaxed">
                Plus de trois décennies de savoir-faire au service de
                votre confort et de votre sécurité.
              </p>
            </div>
          </CardWrap>
        </div>
      </div>
    </section>
  );
}
