"use client";

import FadeIn from "@/components/FadeIn";
import Image from "next/image";

export default function SeaSection() {
  return (
    <section id="il-mare" className="py-32 md:py-44 bg-[#F0EDE8]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <span className="divider-gold" />
                <span className="font-body text-xs tracking-[0.35em] uppercase text-[#92700A]">
                  La Cucina
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-heading text-4xl md:text-6xl text-[#1C1917] leading-tight">
                Il Mare
                <br />
                nel Piatto
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p className="font-body text-[#78716C] leading-[1.9] text-base max-w-sm md:ml-auto">
              Ogni piatto racconta un viaggio. Dal mare al tavolo, con la cura e
              la precisione di chi cucina con passione. Pesce fresco, ingredienti
              stagionali, territorio campano.
            </p>
          </FadeIn>
        </div>

        {/* ── ANTIPASTI ── */}
        <FadeIn>
          <p className="font-body text-xs tracking-[0.35em] uppercase text-[#92700A] mb-6">
            — Antipasti
          </p>
        </FadeIn>

        {/* Feature: Antipasto 24 Posti wide + salmon small */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <FadeIn delay={0.05} className="md:col-span-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm group">
              <Image
                src="/antipasto-24.jpg"
                alt="Antipasto 24 Posti"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="font-heading text-white text-xl tracking-wide">
                  Antipasto 24 Posti
                </p>
                <p className="font-body text-white/70 text-xs tracking-widest uppercase mt-1">
                  La nostra selezione
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden rounded-sm group">
              <Image
                src="/antipasto-salmon.jpg"
                alt="Tartare e carpacci"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="font-heading text-white text-lg tracking-wide">
                  Tartare & Carpacci
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Seafood display full width */}
        <FadeIn delay={0.1}>
          <div className="relative aspect-[21/8] overflow-hidden rounded-sm mb-20 group">
            <Image
              src="/seafood-display.jpg"
              alt="Selezione del pescato"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center px-10 md:px-20">
              <div>
                <p className="font-body text-xs tracking-[0.35em] uppercase text-[#D4A017] mb-3">
                  Il Pescato del Giorno
                </p>
                <p className="font-heading text-3xl md:text-5xl text-white leading-tight max-w-xs">
                  Fresco. Ogni giorno.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── PRIMI ── */}
        <FadeIn>
          <p className="font-body text-xs tracking-[0.35em] uppercase text-[#92700A] mb-6">
            — Primi
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-4 mb-20">
          <FadeIn delay={0.05}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm group">
              <Image
                src="/pasta.jpg"
                alt="Spaghetti alle vongole"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="font-heading text-white text-lg tracking-wide">
                  Pasta di Mare
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm group">
              <Image
                src="/risotto.jpg"
                alt="Risotto ai gamberi"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="font-heading text-white text-lg tracking-wide">
                  Risotto
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── SECONDI ── */}
        <FadeIn>
          <p className="font-body text-xs tracking-[0.35em] uppercase text-[#92700A] mb-6">
            — Secondi
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-4 mb-20">
          <FadeIn delay={0.05} className="md:col-span-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm group">
              <Image
                src="/octopus.jpg"
                alt="Polpo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="font-heading text-white text-lg tracking-wide">Polpo</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm group">
              <Image
                src="/pesce-bianco.jpg"
                alt="Pesce bianco"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="font-heading text-white text-lg tracking-wide">Pesce Bianco</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="md:col-span-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm group">
              <Image
                src="/tartare.jpg"
                alt="Tartare"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <p className="font-heading text-white text-lg tracking-wide">Tartare</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── DOLCI ── */}
        <FadeIn>
          <p className="font-body text-xs tracking-[0.35em] uppercase text-[#92700A] mb-6">
            — Dolci
          </p>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { src: "/dolce.jpg", label: "Cannoli" },
            { src: "/dolce1.jpg", label: "Millefoglie" },
            { src: "/dolce2.jpg", label: "Dessert del Giorno" },
            { src: "/dessert.jpg", label: "Pasticceria" },
          ].map((d, i) => (
            <FadeIn key={d.src} delay={i * 0.08}>
              <div className="relative aspect-square overflow-hidden rounded-sm group">
                <Image
                  src={d.src}
                  alt={d.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="font-heading text-white text-sm tracking-wide">{d.label}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Chef banner */}
        <FadeIn delay={0.2}>
          <div className="mt-16 relative aspect-[21/9] overflow-hidden rounded-sm">
            <Image
              src="/chef.jpg"
              alt="Lo chef al lavoro"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute inset-0 flex items-center px-12 md:px-20">
              <div>
                <p className="font-body text-xs tracking-[0.35em] uppercase text-[#D4A017] mb-4">
                  Il Nostro Chef
                </p>
                <p className="font-heading text-3xl md:text-5xl text-white leading-tight max-w-sm">
                  L'arte di scegliere il pesce giusto
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
