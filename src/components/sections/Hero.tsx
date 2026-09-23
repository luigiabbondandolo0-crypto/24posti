"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import About from "./About";
import SeaSection from "./SeaSection";
import Menu from "./Menu";
import Contact from "./Contact";
import Footer from "@/components/Footer";

// CSS gradient — ocean deep water, always crisp at any resolution
const OCEAN_GRADIENT =
  "radial-gradient(ellipse at 30% 40%, #1a7a9a 0%, #0e5f7a 25%, #093d5c 55%, #05253d 80%, #021520 100%)";

export default function Hero() {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="/chef.jpg"
      bgGradient={OCEAN_GRADIENT}
      title="24 POSTI"
      textBlend
    >
      <About />
      <SeaSection />
      <Menu />
      <Contact />
      <Footer />
    </ScrollExpandMedia>
  );
}
