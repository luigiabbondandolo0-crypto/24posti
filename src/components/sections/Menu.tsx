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
    <section id="menu" className="py-32 md:py-44 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <span className="divider-gold" />
                <span className="font-body text-xs tracking-[0.35em] uppercase text-[#CA8A04]">
                  Il Menu
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-heading text-4xl md:text-5xl text-[#FAF9F6] leading-tight">
                Una proposta che cambia
                <br />
                con le stagioni
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="md:pt-20">
            <p className="font-body text-[#9C9990] leading-[1.9] text-base">
              Il nostro menu è costruito attorno alla freschezza del pescato e
              alla stagionalità degli ingredienti. Per questo non troverai un
              menu fisso — ogni settimana, ogni stagione porta nuove proposte.
              Vieni a scoprirle di persona.
            </p>
          </FadeIn>
        </div>

        {/* Category list */}
        <div className="border-t border-white/5">
          {categories.map((cat, i) => (
            <FadeIn key={cat.name} delay={i * 0.08}>
              <div className="border-b border-white/5 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 group cursor-default">
                <div className="flex items-center gap-6">
                  <span className="font-body text-xs text-[#CA8A04] tracking-widest w-6 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl text-[#FAF9F6] group-hover:text-[#CA8A04] transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>
                <p className="font-body text-sm text-[#9C9990] sm:text-right pl-12 sm:pl-0 max-w-xs">
                  {cat.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-16 text-center">
            <p className="font-body text-[#9C9990] text-sm mb-6 tracking-wide">
              Per conoscere il menu del giorno, chiamaci o vieni a trovarci.
            </p>
            <a
              href="tel:+3908251503257"
              className="inline-flex border border-[#CA8A04]/60 text-[#CA8A04] px-10 py-3.5 text-xs tracking-[0.25em] uppercase font-body hover:bg-[#CA8A04] hover:text-[#0D0D0B] transition-all duration-300 cursor-pointer"
            >
              +39 0825 1503257
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
