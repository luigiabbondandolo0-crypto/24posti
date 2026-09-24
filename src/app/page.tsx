import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Reviews from "@/components/sections/Reviews";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Reviews />
      </main>
    </>
  );
}
