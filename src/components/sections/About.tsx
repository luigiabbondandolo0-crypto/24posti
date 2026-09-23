"use client";

import FadeIn from "@/components/FadeIn";

export default function About() {
  return (
    <section id="chi-siamo" className="py-32 md:py-44 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left — text */}
        <div>
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <span className="divider-gold" />
              <span className="font-body text-xs tracking-[0.35em] uppercase text-[#CA8A04]">
                Chi Siamo
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl leading-tight text-[#FAF9F6] mb-8">
              Una storia di famiglia e di mare
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-body text-[#9C9990] leading-[1.9] text-base mb-6">
              24 Posti nasce dalla passione di una coppia per la cucina e per la
              selezione attenta degli ingredienti. Un ristorante a conduzione
              familiare dove ogni dettaglio — dalla preparazione dei piatti alla
              cura dell'ambiente — è pensato per regalare un'esperienza
              indimenticabile.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-body text-[#9C9990] leading-[1.9] text-base mb-10">
              La nostra cucina unisce tradizione e innovazione, valorizzando i
              sapori del mare con ingredienti stagionali e del territorio
              campano.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex gap-12">
              <div>
                <p className="font-heading text-4xl text-[#CA8A04]">24</p>
                <p className="font-body text-xs tracking-widest uppercase text-[#9C9990] mt-1">
                  Coperti selezionati
                </p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="font-heading text-4xl text-[#CA8A04]">100%</p>
                <p className="font-body text-xs tracking-widest uppercase text-[#9C9990] mt-1">
                  Ingredienti freschi
                </p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="font-heading text-4xl text-[#CA8A04]">♥</p>
                <p className="font-body text-xs tracking-widest uppercase text-[#9C9990] mt-1">
                  Gestione familiare
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right — decorative block */}
        <FadeIn direction="left" delay={0.2}>
          <div className="relative">
            <div className="aspect-[4/5] bg-[#1C1917] rounded-sm overflow-hidden">
              {/* Placeholder per foto ristorante */}
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 border border-[#CA8A04]/30 rounded-full flex items-center justify-center">
                  <span className="text-[#CA8A04] text-2xl font-heading">24</span>
                </div>
                <p className="font-body text-xs tracking-widest uppercase text-[#9C9990]">
                  Foto in arrivo
                </p>
              </div>
            </div>
            {/* Gold accent border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#CA8A04]/20 rounded-sm -z-10" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
