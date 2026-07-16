import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
