"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./Motion";

const reasons = [
  {
    icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
    title: "Économies d'énergie",
    description:
      "Réduisez jusqu'à 30% vos pertes de chaleur avec des fenêtres à haute isolation thermique. Des menuiseries performantes diminuent votre consommation de chauffage et climatisation.",
    image: "/images/sol-fenetres.webp",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Sécurité renforcée",
    description:
      "Profitez de vitrages anti-effraction et de serrures multipoints pour protéger votre foyer. Nos solutions répondent aux normes de sécurité les plus exigeantes.",
    image: "/images/sol-portes.webp",
  },
  {
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    title: "Confort acoustique",
    description:
      "Isolez-vous des nuisances sonores extérieures grâce à des vitrages haute performance. Profitez d'un intérieur calme et serein, même en milieu urbain.",
    image: "/images/sol-baies.webp",
  },
  {
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    title: "Valorisation du bien",
    description:
      "Augmentez la valeur de votre propriété avec des menuiseries modernes et certifiées. Un investissement rentable qui améliore l'attrait et la performance de votre habitat.",
    image: "/images/why-replace.webp",
  },
];

export default function WhyReplace() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-14 lg:py-8 xl:py-12 bg-white overflow-clip">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 xl:gap-16 items-start">
          {/* Accordion left */}
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-2">
                <span className="h-px w-10 bg-primary" />
                <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
                  Pourquoi changer ?
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-primary leading-tight mb-4 lg:mb-4 xl:mb-6">
                Pourquoi remplacer vos{" "}
                <span className="text-accent">portes & fenêtres ?</span>
              </h2>
            </FadeIn>
            {reasons.map((reason, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={reason.title}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <button
                    onClick={() => setActiveIndex(i)}
                    className="w-full flex items-center justify-between py-3 xl:py-4 text-left group cursor-pointer"
                  >
                    <span
                      className={`font-bold text-lg transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-primary/60 group-hover:text-primary"
                      }`}
                    >
                      {reason.title}
                    </span>
                    <svg
                      className={`w-6 h-6 flex-shrink-0 transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-gray-400"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={reason.icon}
                      />
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 xl:pb-4">
                          {/* Image inside accordion — mobile/tablet only */}
                          <div className="lg:hidden relative rounded-xl overflow-hidden aspect-[16/9] mb-4">
                            <Image
                              src={reason.image}
                              alt={reason.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="text-gray-500 leading-relaxed mb-4">
                            {reason.description}
                          </p>
                          <a
                            href="https://form.typeform.com/to/astTYipT" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-accent transition-colors underline underline-offset-4"
                          >
                            Demander une offre
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Image right — desktop only, flush to right edge */}
          <FadeIn direction="right" delay={0.3} className="hidden lg:block lg:-mr-[calc((100vw-1024px)/2+2rem)] xl:-mr-[calc((100vw-80rem)/2+2rem)] lg:-mb-28 lg:mt-16 xl:mt-10">
            <div className="relative rounded-l-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[calc(100%-6rem)] xl:h-full lg:min-h-[400px] xl:min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={reasons[activeIndex].image}
                    alt={reasons[activeIndex].title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
