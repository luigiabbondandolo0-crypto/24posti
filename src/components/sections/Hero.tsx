"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import About from "./About";
import SeaSection from "./SeaSection";
import Menu from "./Menu";
import Contact from "./Contact";
import Footer from "@/components/Footer";

export default function Hero() {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="/chef.jpg"
      bgImageSrc="/sala.jpg"
      title="24 POSTI"
      date="Avellino · Cucina di Mare"
      scrollToExpand="Scorri per scoprire"
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
