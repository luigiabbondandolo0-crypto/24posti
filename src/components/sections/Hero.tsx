"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollDown = () => {
    document.querySelector("#chi-siamo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#0D0D0B]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0B]" />
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FAF9F6 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gold glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#CA8A04]/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="divider-gold" />
          <span className="font-body text-xs tracking-[0.35em] uppercase text-[#CA8A04]">
            Avellino · Dal Mare
          </span>
          <span className="divider-gold" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-[clamp(4rem,12vw,10rem)] leading-none tracking-wider text-[#FAF9F6]"
        >
          24 POSTI
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 font-body text-[#9C9990] text-base md:text-lg tracking-wider max-w-sm"
        >
          Sapori e profumi di mare.
          <br />
          Tradizione e innovazione.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="tel:+3908251503257"
            className="border border-[#CA8A04] text-[#CA8A04] px-10 py-3.5 text-xs tracking-[0.25em] uppercase font-body hover:bg-[#CA8A04] hover:text-[#0D0D0B] transition-all duration-300 cursor-pointer"
          >
            Prenota un Tavolo
          </a>
          <button
            onClick={() => document.querySelector("#il-mare")?.scrollIntoView({ behavior: "smooth" })}
            className="text-[#9C9990] text-xs tracking-[0.25em] uppercase font-body hover:text-[#FAF9F6] transition-colors duration-300 cursor-pointer"
          >
            Scopri di Più
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        aria-label="Scorri verso il basso"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#9C9990] group-hover:text-[#CA8A04] transition-colors duration-300" />
        </motion.div>
      </motion.button>
    </section>
  );
}
