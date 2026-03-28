"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Nos solutions", href: "#services" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export default function Hero() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="px-2 sm:px-4 pt-2">
      {/* Rounded hero container */}
      <div className="relative min-h-[85vh] sm:min-h-screen lg:min-h-[85vh] rounded-[20px] overflow-hidden bg-primary">
        {/* Background image */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero-terrace.jpg"
            alt="Terrasse moderne avec baies vitrées et vue jardin"
            fill
            className="object-cover scale-x-100"
            priority
          />
        </motion.div>

        {/* Gradient overlay — left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 via-30% to-transparent" />

        {/* ====== TOP NAV AREA — flush to top of hero ====== */}
        <div className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-10 lg:px-14">
          {/* Logo + white nav + CTA in one row */}
          <div className="flex items-start justify-between">
            {/* Logo — left, with top padding */}
            <Link href="/" className="relative shrink-0 pt-6">
              <Image
                src="/images/logo-blanc.png"
                alt="ISO Tradition"
                width={300}
                height={90}
                className="h-16 lg:h-16 xl:h-20 2xl:h-24 w-auto"
                priority
              />
            </Link>

            {/* White nav bar — centered, flush to top with concave notch ears */}
            <div className="hidden lg:block relative">
              {/* White bar — flat top, rounded bottom */}
              <div className="bg-white rounded-b-[20px] px-5 lg:px-6 xl:px-10 2xl:px-14 py-3 lg:py-3 xl:py-4 2xl:py-5 flex items-center gap-4 lg:gap-5 xl:gap-8 2xl:gap-10 relative">
                {navLinks.map((link) => {
                  const isInternal = link.href.startsWith("/");
                  const Tag = isInternal ? Link : "a";
                  return (
                    <Tag
                      key={link.label}
                      href={link.href}
                      className="font-medium text-[12px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] text-primary/70 hover:text-primary transition-colors relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-accent after:transition-all whitespace-nowrap"
                    >
                      {link.label}
                    </Tag>
                  );
                })}
              </div>

              {/* Left concave notch */}
              <div className="absolute left-0 top-0 -translate-x-full w-[24px] h-[24px] overflow-hidden pointer-events-none">
                <div className="w-[48px] h-[48px] rounded-full shadow-[0_0_0_24px_white] -translate-x-[24px] translate-y-0" />
              </div>

              {/* Right concave notch */}
              <div className="absolute right-0 top-0 translate-x-full w-[24px] h-[24px] overflow-hidden pointer-events-none">
                <div className="w-[48px] h-[48px] rounded-full shadow-[0_0_0_24px_white] translate-x-0 translate-y-0" />
              </div>
            </div>

            {/* CTA — right, with top padding */}
            <div className="flex items-center gap-3 pt-6">
              <a
                href="https://form.typeform.com/to/astTYipT"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-4 lg:px-5 xl:px-6 2xl:px-8 py-2 lg:py-2 xl:py-2.5 2xl:py-3 rounded-full text-xs lg:text-xs xl:text-sm 2xl:text-base transition-colors group"
              >
                Demander une offre
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>

              {/* Hamburger — mobile/tablet */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white"
                aria-label="Menu"
              >
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden mt-3 mx-2"
              >
                <div className="bg-white rounded-[20px] shadow-lg px-6 py-5 space-y-1">
                  {navLinks.map((link) => {
                    const isInternal = link.href.startsWith("/");
                    const Tag = isInternal ? Link : "a";
                    return (
                      <Tag
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-primary/80 hover:text-primary hover:bg-secondary rounded-xl font-medium text-[15px] transition-colors"
                      >
                        {link.label}
                      </Tag>
                    );
                  })}
                  <a
                    href="https://form.typeform.com/to/astTYipT"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="block mt-3 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-4 py-3 rounded-full text-center text-sm transition-colors"
                  >
                    Demander une offre
                  </a>
                  <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-gray-100">
                    <a href="#" className="w-9 h-9 rounded-full bg-primary/10 hover:bg-accent flex items-center justify-center transition-colors group">
                      <svg className="w-4 h-4 text-primary/60 group-hover:text-primary-dark" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="#" className="w-9 h-9 rounded-full bg-primary/10 hover:bg-accent flex items-center justify-center transition-colors group">
                      <svg className="w-4 h-4 text-primary/60 group-hover:text-primary-dark" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="#" className="w-9 h-9 rounded-full bg-primary/10 hover:bg-accent flex items-center justify-center transition-colors group">
                      <svg className="w-4 h-4 text-primary/60 group-hover:text-primary-dark" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ====== HERO CONTENT — bottom-left ====== */}
        <div className="relative z-10 flex flex-col justify-end min-h-[85vh] sm:min-h-screen lg:min-h-[85vh] px-5 sm:px-12 lg:px-20 2xl:px-28 pb-8 sm:pb-12 lg:pb-16 2xl:pb-24">
          <div className="max-w-xl xl:max-w-3xl 2xl:max-w-4xl">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="flex items-center gap-3 mb-3 sm:mb-4"
            >
              <span className="h-px w-12 bg-white/50" />
              <span className="font-secondary text-white/80 font-medium text-sm uppercase tracking-[0.2em]">
                Fenêtres &amp; Portes Suisses
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="text-[26px] sm:text-4xl lg:text-5xl xl:text-[56px] 2xl:text-[72px] font-bold text-white leading-[1.2] mb-3 sm:mb-4 2xl:mb-6"
            >
              Votre nouvel <span className="text-accent">art de vivre</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="text-sm sm:text-base 2xl:text-lg text-white/75 max-w-lg 2xl:max-w-xl mb-6 sm:mb-8 2xl:mb-10 leading-relaxed"
            >
              Des fenêtres et portes d&apos;exception, alliant savoir-faire
              traditionnel suisse et technologies de pointe pour un confort
              inégalé.
            </motion.p>

            {/* CTA + Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease }}
              className="flex flex-wrap items-center gap-5"
            >
              <a
                href="https://form.typeform.com/to/astTYipT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-6 py-3 rounded-full transition-colors text-sm group"
              >
                Demander une offre
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>

              <a
                href="tel:+41216245300"
                className="inline-flex items-center gap-3 text-white/80 hover:text-accent transition-colors"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/25">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <span className="font-semibold text-sm">021 624 53 00</span>
              </a>
            </motion.div>
          </div>

          {/* Brand icon — decorative bottom-right */}
        </div>
      </div>
    </section>
  );
}
