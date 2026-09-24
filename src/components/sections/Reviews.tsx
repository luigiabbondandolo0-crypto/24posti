"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.it/Restaurant_Review-g580203-d23992461-Reviews-24_Posti-Avellino_Province_of_Avellino_Campania.html";

const reviews = [
  {
    author: "Marianna D.",
    date: "Settembre 2024",
    rating: 5,
    text: "Un'esperienza indimenticabile. Pesce freschissimo, servizio impeccabile e un'atmosfera raccolta e familiare. Ci torneremo sicuramente.",
  },
  {
    author: "Francesco B.",
    date: "Agosto 2024",
    rating: 5,
    text: "Il miglior ristorante di pesce della zona. I crudi erano eccezionali e la pasta ai frutti di mare semplicemente perfetta. Personale gentilissimo.",
  },
  {
    author: "Lucia T.",
    date: "Luglio 2024",
    rating: 5,
    text: "Locale piccolo e curato, si respira la passione in ogni piatto. La degustazione del mare è stata una vera scoperta. Consigliato a tutti.",
  },
  {
    author: "Roberto M.",
    date: "Ottobre 2024",
    rating: 5,
    text: "Atmosfera elegante e raccolta, cucina di altissimo livello. Il rombo al forno era semplicemente meraviglioso. Bravi!",
  },
  {
    author: "Silvia P.",
    date: "Giugno 2024",
    rating: 5,
    text: "Una perla nascosta in Campania. Ogni dettaglio curato con amore, dai fiori sul tavolo alla qualità del pesce. Una serata perfetta.",
  },
  {
    author: "Antonio G.",
    date: "Maggio 2024",
    rating: 5,
    text: "Qualità eccezionale in un ambiente intimo. Il menu degustazione ha superato le aspettative. Ingredienti freschissimi e abbinamenti creativi.",
  },
];

// Duplicate for seamless infinite loop
const doubled = [...reviews, ...reviews];

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function TripAdvisorLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 40"
      className="h-6 w-auto"
      aria-label="TripAdvisor"
    >
      {/* Owl left eye */}
      <circle cx="18" cy="20" r="10" fill="#34e0a1" />
      <circle cx="18" cy="20" r="6" fill="white" />
      <circle cx="18" cy="20" r="3.5" fill="#161616" />
      {/* Owl right eye */}
      <circle cx="42" cy="20" r="10" fill="#34e0a1" />
      <circle cx="42" cy="20" r="6" fill="white" />
      <circle cx="42" cy="20" r="3.5" fill="#161616" />
      {/* Beak */}
      <path d="M27 22 L30 28 L33 22 Z" fill="#34e0a1" />
      {/* Text */}
      <text
        x="58"
        y="26"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="16"
        fill="#161616"
      >
        TripAdvisor
      </text>
    </svg>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white border border-[#E5E2DC] rounded-sm p-7 mx-4 flex flex-col gap-4 hover:border-[#92700A]/40 hover:shadow-md transition-all duration-300">
      {/* Stars */}
      <div className="flex gap-0.5 text-[#92700A]">
        {Array.from({ length: review.rating }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      {/* Text */}
      <p className="font-body text-[#44403C] text-sm leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      {/* Author */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E5E2DC]">
        <div>
          <p className="font-body font-semibold text-[#1C1917] text-sm">
            {review.author}
          </p>
          <p className="font-body text-xs text-[#78716C] mt-0.5">
            {review.date}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#34e0a1]/20 flex items-center justify-center">
          <span className="font-body font-bold text-xs text-[#00a680]">
            {review.author[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="recensioni"
      ref={ref}
      className="py-32 md:py-44 overflow-hidden bg-[#FAF9F7]"
    >
      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto mb-16">
        <FadeIn>
          <div className="flex items-center gap-4 mb-8">
            <span className="divider-gold" />
            <span className="font-body text-xs tracking-[0.35em] uppercase text-[#92700A]">
              Recensioni
            </span>
          </div>
        </FadeIn>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl leading-tight text-[#1C1917]">
              Cosa dicono i nostri ospiti
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col items-start md:items-end gap-3">
              {/* Rating badge */}
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5 text-[#92700A]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <span className="font-heading text-2xl text-[#1C1917]">5.0</span>
                <span className="font-body text-sm text-[#78716C]">su TripAdvisor</span>
              </div>
              <TripAdvisorLogo />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Infinite marquee carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAF9F7] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAF9F7] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 38,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ willChange: "transform" }}
          >
            {doubled.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* CTA */}
      <div className="px-6 max-w-7xl mx-auto mt-16 flex justify-center">
        <FadeIn delay={0.4}>
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-[#92700A] text-[#92700A] px-8 py-4 font-body text-xs tracking-[0.25em] uppercase hover:bg-[#92700A] hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Leggi tutte le recensioni su TripAdvisor"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Leggi tutte le recensioni
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
