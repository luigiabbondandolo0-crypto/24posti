"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import About from "./About";
import SeaSection from "./SeaSection";
import Reviews from "./Reviews";
import Menu from "./Menu";
import Contact from "./Contact";
import Footer from "@/components/Footer";

export default function Hero() {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="/chef.jpg"
      bgImageSrc="/mare.jpg"
      title="24 POSTI"
      textBlend
    >
      <About />
      <SeaSection />
      <Reviews />
      <Menu />
      <Contact />
      <Footer />
    </ScrollExpandMedia>
  );
}
