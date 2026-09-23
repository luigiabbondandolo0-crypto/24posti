"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const links = [
  { label: "Chi Siamo", href: "#chi-siamo" },
  { label: "Il Mare", href: "#il-mare" },
  { label: "Menu", href: "#menu" },
  { label: "Contatti", href: "#contatti" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D0D0B]/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer"
            aria-label="Torna in cima"
          >
            <Image
              src="/logo.jpg"
              alt="24 Posti"
              width={52}
              height={52}
              className="rounded-sm object-cover"
            />
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleLink(link.href)}
                  className="font-body text-sm tracking-widest uppercase text-[#9C9990] hover:text-[#FAF9F6] transition-colors duration-300 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Reserve CTA */}
          <a
            href="tel:+3908251503257"
            className="hidden md:flex items-center gap-2 border border-[#CA8A04]/60 text-[#CA8A04] px-5 py-2 text-xs tracking-widest uppercase font-body hover:bg-[#CA8A04] hover:text-[#0D0D0B] transition-all duration-300 cursor-pointer"
          >
            Prenota
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
            aria-label="Apri menu"
          >
            <span
              className={`block w-6 h-px bg-[#FAF9F6] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-[#FAF9F6] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-[#FAF9F6] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0D0D0B]/98 backdrop-blur-md flex flex-col items-center justify-center gap-10"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleLink(link.href)}
                className="font-heading text-3xl tracking-widest text-[#FAF9F6] hover:text-[#CA8A04] transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </motion.button>
            ))}
            <a
              href="tel:+3908251503257"
              className="mt-4 border border-[#CA8A04]/60 text-[#CA8A04] px-8 py-3 text-sm tracking-widest uppercase font-body"
            >
              Prenota
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
