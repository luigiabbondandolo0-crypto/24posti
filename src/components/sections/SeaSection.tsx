"use client";

import FadeIn from "@/components/FadeIn";
import { Fish, Waves, Leaf } from "lucide-react";

const features = [
  {
    icon: Fish,
    title: "Pesce Fresco",
    desc: "Selezione quotidiana del pescato locale. Solo quello che il mare offre nella sua stagione migliore.",
  },
  {
    icon: Waves,
    title: "Antipasto 24 Posti",
    desc: "Il nostro antipasto simbolo: tre portate calde e fredde, abbinamenti studiati, sapori intensi di mare.",
  },
  {
    icon: Leaf,
    title: "Stagionalità",
    desc: "Menu che cambia con le stagioni. Ingredienti del territorio campano a supporto del protagonista: il mare.",
  },
];

export default function SeaSection() {
  return (
    <section id="il-mare" className="py-32 md:py-44 bg-[#1C1917]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="divider-gold" />
              <span className="font-body text-xs tracking-[0.35em] uppercase text-[#CA8A04]">
                La Nostra Cucina
              </span>
              <span className="divider-gold" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-6xl text-[#FAF9F6] leading-tight">
              Il Mare nel Piatto
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 font-body text-[#9C9990] text-base max-w-xl mx-auto leading-[1.9]">
              Ogni piatto racconta un viaggio. Dal mare al tavolo, con la cura e
              la precisione di chi cucina con passione.
            </p>
          </FadeIn>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <FadeIn key={f.title} delay={i * 0.12}>
                <div className="group border border-white/5 hover:border-[#CA8A04]/30 p-10 transition-all duration-500 cursor-default bg-[#0D0D0B]/40 hover:bg-[#0D0D0B]/70">
                  <div className="mb-8">
                    <div className="w-12 h-12 border border-[#CA8A04]/30 group-hover:border-[#CA8A04]/70 flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#CA8A04]" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl text-[#FAF9F6] mb-4 tracking-wide">
                    {f.title}
                  </h3>
                  <p className="font-body text-[#9C9990] text-sm leading-[1.9]">
                    {f.desc}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
