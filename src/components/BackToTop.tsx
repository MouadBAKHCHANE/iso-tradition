"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function BackToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  if (pathname?.startsWith("/studio")) return null;

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Retour en haut de la page"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 w-12 h-12 rounded-full bg-primary text-white shadow-lg shadow-black/20 flex items-center justify-center hover:bg-accent hover:text-primary-dark transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
