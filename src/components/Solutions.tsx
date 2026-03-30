"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "./Motion";
import BrandIcon from "./BrandIcon";

const solutions = [
  {
    title: "Fenêtres",
    slug: "/nos-solutions/fenetres",
    image: "/images/sol-fenetres.jpg",
  },
  {
    title: "Baies coulissantes",
    slug: "/nos-solutions/baies-coulissantes",
    image: "/images/sol-baies.jpg",
  },
  {
    title: "Portes d'entrée",
    slug: "/nos-solutions/portes-entree",
    image: "/images/sol-portes.jpg",
  },
  {
    title: "Volets",
    slug: "/nos-solutions/volets",
    image: "/images/sol-volets.jpg",
  },
  {
    title: "Portes de garage",
    slug: "/nos-solutions/portes-garage",
    image: "/images/sol-garage.jpg",
  },
  {
    title: "Stores bannes",
    slug: "/nos-solutions/stores-bannes",
    image: "/images/sol-stores.jpg",
  },
  {
    title: "Films solaires",
    slug: "/nos-solutions/films-solaires",
    image: "/images/sol-film.png",
  },
  {
    title: "Carports & Pergolas",
    slug: "/nos-solutions/carports-pergolas",
    image: "/images/sol-carport.jpg",
  },
];

function Card({ sol }: { sol: (typeof solutions)[number] }) {
  return (
    <Link href={sol.slug} className="group relative flex-shrink-0 w-[180px] sm:w-[220px] 2xl:w-[240px] 3xl:w-[280px] touch-manipulation">
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
          <div className="absolute bottom-0 left-0 right-0 p-4 2xl:p-5 3xl:p-6">
            <h3 className="font-bold text-white text-sm 2xl:text-base 3xl:text-xl drop-shadow-md">
              {sol.title}
            </h3>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </Link>
  );
}

export default function Solutions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Desktop: smaller translate, Mobile: larger to reach last card
  // Adjust translate based on viewport width
  const [desktopEnd, setDesktopEnd] = useState("-40%");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 1280) setDesktopEnd("-55%");      // 1024-1279
      else if (w < 1536) setDesktopEnd("-35%");  // 1280-1535 (1440px range)
      else if (w < 2200) setDesktopEnd("-35%");  // 1536-2199 (laptop/desktop)
      else setDesktopEnd("0%");                 // 2200+ (4K)
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const x = useTransform(scrollYProgress, [0.05, 0.85], ["0%", desktopEnd]);
  const xMobile = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "-75%"]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="services" className="scroll-mt-24 lg:scroll-mt-32">
      <div ref={sectionRef} className="relative h-[250vh] sm:h-[250vh] lg:h-[250vh] xl:h-[180vh] 2xl:h-[160vh] 3xl:h-auto 3xl:py-16">
        <div className="sticky top-0 h-screen flex flex-col justify-center 3xl:static 3xl:h-auto overflow-hidden bg-white">
          {/* Background decorative icon */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-20 opacity-[0.07] pointer-events-none">
            <BrandIcon className="w-[600px] h-auto" color="#032742" />
          </div>

          <div className="text-center px-4 mb-2 lg:mb-2 xl:mb-3 2xl:mb-4 3xl:mb-12 relative z-10">
            <FadeIn>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="h-px w-10 bg-primary/40" />
                <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
                  Nos solutions
                </span>
                <span className="h-px w-10 bg-primary/40" />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-6xl font-bold text-primary leading-tight mb-1 lg:mb-1 xl:mb-1 2xl:mb-2 3xl:mb-8">
                Des solutions pour chaque{" "}
                <span className="text-accent">besoin</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex items-center justify-center gap-4 mt-1 lg:mt-1 xl:mt-2 2xl:mt-3 3xl:mt-8">
                <a
                  href="/nos-solutions"
                  className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-primary-dark font-semibold px-6 py-2.5 2xl:px-8 2xl:py-3 3xl:px-12 3xl:py-5 rounded-full transition-colors text-sm 2xl:text-base 3xl:text-2xl uppercase tracking-wider group"
                >
                  Toutes nos solutions
                  <svg className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 3xl:w-6 3xl:h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
            className="hidden lg:flex 3xl:hidden gap-5 2xl:gap-6 3xl:gap-8 pl-[8vw] 3xl:pl-0 w-max 3xl:w-full 3xl:max-w-none 3xl:justify-center relative z-10 items-center mt-2 lg:mt-2 xl:mt-3 2xl:mt-6 3xl:mt-10"
          >
            {solutions.map((sol) => (
              <Card key={sol.title} sol={sol} />
            ))}
            <div className="flex-shrink-0 w-[8vw]" />
          </motion.div>

          {/* 4K Static View */}
          <div className="hidden 3xl:flex gap-8 w-full max-w-[2800px] mx-auto justify-center px-10 relative z-10 items-center mt-10">
            {solutions.map((sol) => (
              <Card key={sol.title} sol={sol} />
            ))}
          </div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 3xl:hidden"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="w-8 h-8 rounded-full border-2 border-primary/30 flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
