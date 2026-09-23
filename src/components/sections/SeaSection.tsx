"use client";

import FadeIn from "@/components/FadeIn";
import Image from "next/image";

const dishes = [
  {
    src: "/octopus.jpg",
    label: "Antipasti",
    desc: "Selezione del giorno",
  },
  {
    src: "/pasta.jpg",
    label: "Primi",
    desc: "Paste fresche di mare",
  },
  {
    src: "/dessert.jpg",
    label: "Dolci",
    desc: "Pasticceria artigianale",
  },
];

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

        {/* Photo grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {dishes.map((dish, i) => (
            <FadeIn key={dish.label} delay={i * 0.12}>
              <div className="group cursor-default">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4">
                  <Image
                    src={dish.src}
                    alt={dish.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl text-[#1C1917]">{dish.label}</h3>
                  <span className="font-body text-xs tracking-widest uppercase text-[#78716C]">
                    {dish.desc}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Chef photo full width */}
        <FadeIn delay={0.3}>
          <div className="mt-16 relative aspect-[21/9] overflow-hidden rounded-sm">
            <Image
              src="/chef.jpg"
              alt="Lo chef al lavoro"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
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
