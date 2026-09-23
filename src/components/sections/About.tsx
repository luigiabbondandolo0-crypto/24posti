"use client";

import FadeIn from "@/components/FadeIn";
import Image from "next/image";

export default function About() {
  return (
    <section id="chi-siamo" className="py-32 md:py-44 px-6 bg-[#FAF9F7]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left — two photos stacked */}
        <FadeIn direction="right">
          <div className="relative grid grid-cols-2 gap-3">
            <div className="col-span-2 relative aspect-[3/2] overflow-hidden rounded-sm">
              <Image
                src="/sala.jpg"
                alt="La sala di 24 Posti"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <Image
                src="/couple.jpg"
                alt="I titolari di 24 Posti"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <Image
                src="/antipasto-24.jpg"
                alt="Antipasto 24 Posti"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Gold accent */}
            <div className="absolute -bottom-5 -left-5 w-full h-full border border-[#92700A]/20 rounded-sm -z-10" />
          </div>
        </FadeIn>

        {/* Right — text */}
        <div>
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <span className="divider-gold" />
              <span className="font-body text-xs tracking-[0.35em] uppercase text-[#92700A]">
                Chi Siamo
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl leading-tight text-[#1C1917] mb-8">
              Una storia di famiglia e di mare
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-body text-[#78716C] leading-[1.9] text-base mb-6">
              24 Posti nasce dalla passione di una coppia per la cucina e per la
              selezione attenta degli ingredienti. Un ristorante a conduzione
              familiare dove ogni dettaglio — dalla preparazione dei piatti alla
              cura dell'ambiente — è pensato per regalare un'esperienza
              indimenticabile.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-body text-[#78716C] leading-[1.9] text-base mb-12">
              La nostra cucina unisce tradizione e innovazione, valorizzando i
              sapori del mare con ingredienti stagionali e del territorio
              campano.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex gap-10">
              <div>
                <p className="font-heading text-4xl text-[#92700A]">24</p>
                <p className="font-body text-xs tracking-widest uppercase text-[#78716C] mt-1">
                  Coperti
                </p>
              </div>
              <div className="w-px bg-[#E5E2DC]" />
              <div>
                <p className="font-heading text-4xl text-[#92700A]">100%</p>
                <p className="font-body text-xs tracking-widest uppercase text-[#78716C] mt-1">
                  Fresco
                </p>
              </div>
              <div className="w-px bg-[#E5E2DC]" />
              <div>
                <p className="font-heading text-4xl text-[#92700A]">♥</p>
                <p className="font-body text-xs tracking-widest uppercase text-[#78716C] mt-1">
                  Famiglia
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
