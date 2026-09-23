"use client";

import FadeIn from "@/components/FadeIn";

const categories = [
  { name: "Antipasti", desc: "Tra cui l'iconica selezione 24 Posti" },
  { name: "Primi", desc: "Paste fresche e risotti di mare" },
  { name: "Secondi", desc: "Pesce fresco del giorno, alla griglia o al forno" },
  { name: "Dolci", desc: "Dessert artigianali per chiudere in dolcezza" },
];

export default function Menu() {
  return (
    <section id="menu" className="py-32 md:py-44 px-6 bg-[#FAF9F7]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
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
          <FadeIn delay={0.2} className="md:pt-20">
            <p className="font-body text-[#78716C] leading-[1.9] text-base">
              Il nostro menu è costruito attorno alla freschezza del pescato e
              alla stagionalità degli ingredienti. Vieni a scoprirlo di persona
              — ogni settimana porta nuove proposte.
            </p>
          </FadeIn>
        </div>

        <div className="border-t border-[#E5E2DC]">
          {categories.map((cat, i) => (
            <FadeIn key={cat.name} delay={i * 0.08}>
              <div className="border-b border-[#E5E2DC] py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 group cursor-default">
                <div className="flex items-center gap-6">
                  <span className="font-body text-xs text-[#92700A] tracking-widest w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl text-[#1C1917] group-hover:text-[#92700A] transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>
                <p className="font-body text-sm text-[#78716C] sm:text-right pl-12 sm:pl-0 max-w-xs">
                  {cat.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-16 text-center">
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
