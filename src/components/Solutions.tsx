"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "./Motion";
import BrandIcon from "./BrandIcon";

const solutions = [
  {
    title: "Fenêtres",
    image: "/images/sol-fenetres.jpg",
  },
  {
    title: "Baies coulissantes",
    image: "/images/sol-baies.jpg",
  },
  {
    title: "Portes d'entrée",
    image: "/images/sol-portes.jpg",
  },
  {
    title: "Volets",
    image: "/images/sol-volets.jpg",
  },
  {
    title: "Portes de garage",
    image: "/images/sol-garage.jpg",
  },
  {
    title: "Stores bannes",
    image: "/images/sol-stores.jpg",
  },
  {
    title: "Films solaires",
    image: "/images/sol-film.png",
  },
  {
    title: "Carports & Pergolas",
    image: "/images/sol-carport.jpg",
  },
];

function Card({ sol }: { sol: (typeof solutions)[number] }) {
  return (
    <a href="#services" className="group relative flex-shrink-0 w-[180px] sm:w-[220px] touch-manipulation">
      <div className="relative rounded-xl overflow-hidden shadow-md group-hover:shadow-2xl group-active:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 group-active:-translate-y-3">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={sol.image}
            alt={sol.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-white text-sm drop-shadow-md">
              {sol.title}
            </h3>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </a>
  );
}

export default function Solutions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Desktop: smaller translate, Mobile: larger to reach last card
  const x = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "-30%"]);
  const xMobile = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "-75%"]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section id="services">
      <div ref={sectionRef} className="relative h-[250vh] sm:h-[250vh] lg:h-[200vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-secondary">
          {/* Background decorative icon */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-20 opacity-[0.03] pointer-events-none">
            <BrandIcon className="w-[600px]" color="#215e84" />
          </div>

          {/* Section header */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6 relative z-10">
            <FadeIn>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-10 bg-accent" />
                <span className="font-secondary text-accent font-light text-sm uppercase tracking-[0.2em]">
                  Nos solutions
                </span>
                <span className="h-px w-10 bg-accent" />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary leading-tight mb-4">
                Des solutions pour chaque{" "}
                <span className="text-accent">besoin</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex items-center justify-center gap-4 mt-4">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 border-2 border-primary/30 hover:border-primary text-primary font-semibold px-6 py-2.5 rounded-full transition-colors text-sm uppercase tracking-wider group"
                >
                  Toutes nos solutions
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Horizontal scroll track — uses xMobile on small screens, x on desktop */}
          <motion.div
            style={{ x: xMobile }}
            className="flex gap-4 pl-4 sm:pl-6 w-max relative z-10 items-center mt-4 lg:hidden"
          >
            {solutions.map((sol) => (
              <Card key={sol.title} sol={sol} />
            ))}
            <div className="flex-shrink-0 w-4" />
          </motion.div>
          <motion.div
            style={{ x }}
            className="hidden lg:flex gap-5 pl-[8vw] w-max relative z-10 items-center mt-4"
          >
            {solutions.map((sol) => (
              <Card key={sol.title} sol={sol} />
            ))}
            <div className="flex-shrink-0 w-[8vw]" />
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-primary"
          >
            <span className="text-sm uppercase tracking-widest font-secondary font-semibold">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
