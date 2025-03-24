"use client";

// app/page.tsx
import AnimatedBox from "@/src/components/AnimatedBox";
import ScrollSection from "@/src/components/ParallaxSection.tsx";
import useLenis from "@/src/hooks/useLenis";

export default function Home() {
  // useLenis();

  return (
    <main>
      <section className="min-h-screen flex items-center justify-center">
        <AnimatedBox />
      </section>

      <ScrollSection />
      <ScrollSection />
      <ScrollSection />
      <ScrollSection />
    </main>
  );
}
