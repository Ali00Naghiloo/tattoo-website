import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Outro from "@/components/sections/Outro";
import Styles from "@/components/sections/Styles";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Styles />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Outro />
    </>
  );
}
