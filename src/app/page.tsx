import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SeaSection from "@/components/sections/SeaSection";
import Menu from "@/components/sections/Menu";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <SeaSection />
        <Menu />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
