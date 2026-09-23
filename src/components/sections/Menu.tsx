"use client";

import FadeIn from "@/components/FadeIn";
import Image from "next/image";

const categories = [
  {
    num: "01",
    name: "Antipasti",
    desc: "La nostra selezione di crudi e cotti, tra cui l'iconica selezione 24 Posti",
    src: "/antipasto-24.jpg",
    pos: "object-center",
  },
  {
    num: "02",
    name: "Primi",
    desc: "Paste fresche, risotti e zuppe di mare preparati al momento",
    src: "/pasta.jpg",
    pos: "object-center",
  },
  {
    num: "03",
    name: "Secondi",
    desc: "Pesce fresco del giorno, alla griglia, al forno o in guazzetto",
    src: "/pesce-bianco.jpg",
    pos: "object-center",
  },
  {
    num: "04",
    name: "Dolci",
    desc: "Pasticceria artigianale per chiudere in dolcezza",
    src: "/dolce1.jpg",
    pos: "object-center",
  },
];

export default function Menu() {
  return (
    <section id="menu" className="py-32 md:py-44 bg-[#FAF9F7]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <span className="divider-gold" />
                <span className="font-body text-xs tracking-[0.35em] uppercase text-[#92700A]">
                  Il Menu
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-heading text-4xl md:text-5xl text-[#1C1917] leading-tight">
                Una proposta che cambia
                <br />
                con le stagioni
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p className="font-body text-[#78716C] leading-[1.9] text-base">
              Il nostro menu è costruito attorno alla freschezza del pescato e
              alla stagionalità. Ogni settimana porta nuove proposte — vieni a
              scoprirle di persona.
            </p>
          </FadeIn>
        </div>

        {/* Photo cards grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {categories.map((cat, i) => (
            <FadeIn key={cat.num} delay={i * 0.1}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-sm cursor-default">
                {/* Photo */}
                <Image
                  src={cat.src}
                  alt={cat.name}
                  fill
                  className={`object-cover ${cat.pos} group-hover:scale-105 transition-transform duration-700`}
                  quality={85}
                />

                {/* Base overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-500" />

                {/* Number top-left */}
                <div className="absolute top-6 left-6">
                  <span className="font-body text-xs tracking-[0.3em] text-white/50">{cat.num}</span>
                </div>

                {/* Category name — always visible, slides up on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="font-heading text-3xl md:text-4xl text-white tracking-wide mb-0 group-hover:mb-3 transition-all duration-400">
                    {cat.name}
                  </h3>
                  {/* Description — reveals on hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-out">
                    <p className="font-body text-sm text-white/75 leading-[1.8] pt-1">
                      {cat.desc}
                    </p>
                  </div>
                  {/* Gold underline */}
                  <div className="w-0 group-hover:w-10 h-px bg-[#D4A017] transition-all duration-500 ease-out mt-4" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="text-center">
            <p className="font-body text-[#78716C] text-sm mb-6 tracking-wide">
              Per conoscere il menu del giorno, chiamaci o vieni a trovarci.
            </p>
            <a
              href="tel:+3908251503257"
              className="inline-flex border border-[#92700A] text-[#92700A] px-10 py-3.5 text-xs tracking-[0.25em] uppercase font-body hover:bg-[#92700A] hover:text-white transition-all duration-300 cursor-pointer"
            >
              +39 0825 1503257
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
