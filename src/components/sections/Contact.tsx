"use client";

import FadeIn from "@/components/FadeIn";
import { MapPin, Phone, Mail, Share2, Clock } from "lucide-react";

const hours = [
  { day: "Lunedì", time: "Chiuso" },
  { day: "Martedì – Sabato", time: "13:00–15:30  ·  20:00–23:30" },
  { day: "Domenica", time: "12:30–15:30" },
];

export default function Contact() {
  return (
    <section id="contatti" className="py-32 md:py-44 bg-[#F0EDE8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="divider-gold" />
              <span className="font-body text-xs tracking-[0.35em] uppercase text-[#92700A]">
                Vieni a Trovarci
              </span>
              <span className="divider-gold" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-6xl text-[#1C1917]">
              Contatti & Orari
            </h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Info */}
          <div className="flex flex-col gap-8">
            <FadeIn>
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-[#92700A]/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#92700A]" />
                </div>
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-[#78716C] mb-1">
                    Indirizzo
                  </p>
                  <a
                    href="https://maps.google.com/?q=Via+Gabriele+Speranza+12+Avellino"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[#1C1917] hover:text-[#92700A] transition-colors duration-300 cursor-pointer"
                  >
                    Via Gabriele Speranza, 12<br />
                    83100 Avellino (AV)
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-[#92700A]/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#92700A]" />
                </div>
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-[#78716C] mb-1">
                    Telefono
                  </p>
                  <a
                    href="tel:+3908251503257"
                    className="font-body text-[#1C1917] hover:text-[#92700A] transition-colors duration-300 cursor-pointer"
                  >
                    +39 0825 1503257
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-[#92700A]/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#92700A]" />
                </div>
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-[#78716C] mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:24posti24@gmail.com"
                    className="font-body text-[#1C1917] hover:text-[#92700A] transition-colors duration-300 cursor-pointer"
                  >
                    24posti24@gmail.com
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-[#92700A]/30 flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-4 h-4 text-[#92700A]" />
                </div>
                <div>
                  <p className="font-body text-xs tracking-widest uppercase text-[#78716C] mb-1">
                    Social
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com/24posti_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[#1C1917] hover:text-[#92700A] transition-colors duration-300 cursor-pointer"
                    >
                      Instagram
                    </a>
                    <span className="text-[#78716C]">·</span>
                    <a
                      href="https://facebook.com/24posti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[#1C1917] hover:text-[#92700A] transition-colors duration-300 cursor-pointer"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Hours */}
          <FadeIn direction="left" delay={0.2}>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Clock className="w-4 h-4 text-[#92700A]" />
                <span className="font-body text-xs tracking-[0.35em] uppercase text-[#92700A]">
                  Orari
                </span>
              </div>
              <div>
                {hours.map((h, i) => (
                  <div
                    key={h.day}
                    className={`py-5 border-b border-[#E5E2DC] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 ${
                      i === 0 ? "border-t" : ""
                    }`}
                  >
                    <span className="font-body text-sm text-[#78716C] tracking-wide">
                      {h.day}
                    </span>
                    <span
                      className={`font-body text-sm tracking-wide ${
                        h.time === "Chiuso" ? "text-[#78716C]/50" : "text-[#1C1917]"
                      }`}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 border border-[#92700A]/20 p-8 bg-white/60">
                <p className="font-body text-[#78716C] text-sm leading-[1.9] mb-6">
                  Per prenotare un tavolo o richiedere informazioni, contattaci
                  telefonicamente o via email.
                </p>
                <a
                  href="tel:+3908251503257"
                  className="inline-flex border border-[#92700A] text-[#92700A] px-8 py-3 text-xs tracking-[0.25em] uppercase font-body hover:bg-[#92700A] hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Chiama Ora
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Payment methods */}
        <FadeIn delay={0.3}>
          <div className="mt-20 pt-12 border-t border-[#E5E2DC]">
            <p className="font-body text-xs tracking-[0.35em] uppercase text-[#92700A] mb-10 text-center">
              Metodi di Pagamento
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {[
                {
                  label: "Contanti",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <circle cx="12" cy="12" r="3" />
                      <path d="M6 12h.01M18 12h.01" />
                    </svg>
                  ),
                },
                {
                  label: "Contactless",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                      <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z" strokeDasharray="4 2" />
                      <path d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" fill="currentColor" stroke="none" />
                      <path d="M8.5 8.5 6 6M15.5 8.5 18 6M8.5 15.5 6 18M15.5 15.5 18 18" />
                    </svg>
                  ),
                },
                {
                  label: "Mastercard",
                  icon: (
                    <svg viewBox="0 0 38 24" className="w-10 h-7">
                      <circle cx="15" cy="12" r="10" fill="#EB001B" />
                      <circle cx="23" cy="12" r="10" fill="#F79E1B" />
                      <path d="M19 5.4a10 10 0 0 1 0 13.2A10 10 0 0 1 19 5.4Z" fill="#FF5F00" />
                    </svg>
                  ),
                },
                {
                  label: "VISA",
                  icon: (
                    <svg viewBox="0 0 60 20" className="w-12 h-7">
                      <text x="0" y="17" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="#1A1F71" letterSpacing="-1">VISA</text>
                    </svg>
                  ),
                },
                {
                  label: "Carta di debito",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path d="M2 10h20" />
                      <path d="M6 15h4" />
                    </svg>
                  ),
                },
                {
                  label: "Apple Pay",
                  icon: (
                    <svg viewBox="0 0 50 20" className="w-12 h-7">
                      <text x="0" y="15" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="14" fill="#1C1917"> Pay</text>
                    </svg>
                  ),
                },
                {
                  label: "Maestro",
                  icon: (
                    <svg viewBox="0 0 38 24" className="w-10 h-7">
                      <circle cx="15" cy="12" r="10" fill="#6F6F6F" />
                      <circle cx="23" cy="12" r="10" fill="#007AC9" fillOpacity="0.85" />
                      <path d="M19 5.4a10 10 0 0 1 0 13.2A10 10 0 0 1 19 5.4Z" fill="#6F6F6F" fillOpacity="0.5" />
                    </svg>
                  ),
                },
              ].map((method) => (
                <div key={method.label} className="flex flex-col items-center gap-2.5">
                  <div className="text-[#78716C]">{method.icon}</div>
                  <span className="font-body text-[10px] tracking-wider uppercase text-[#78716C] text-center leading-tight max-w-[60px]">
                    {method.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
