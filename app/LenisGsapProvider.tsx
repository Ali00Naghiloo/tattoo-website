"use client";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { createContext, useContext, useEffect, useRef, ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

interface GSAPLenisContextType {
  lenis: Lenis | null;
  containerRef: React.RefObject<HTMLDivElement>;
}

const GSAPLenisContext = createContext<GSAPLenisContextType | undefined>(
  undefined
);

interface GSAPLenisProviderProps {
  children: ReactNode;
}

export const GSAPLenisProvider: React.FC<GSAPLenisProviderProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    ScrollTrigger.scroller(containerRef.current);

    const ctx = gsap.context(() => {
      ScrollTrigger.defaults({ scroller: containerRef.current });
    }, containerRef);

    return () => {
      ctx.revert();
      lenisRef.current?.destroy();
    };
  }, []);

  const contextValue: GSAPLenisContextType = {
    lenis: lenisRef.current,
    containerRef: containerRef,
  };

  return (
    <GSAPLenisContext.Provider value={contextValue}>
      <div ref={containerRef} style={{ overflow: "auto", height: "100vh" }}>
        {children}
      </div>
    </GSAPLenisContext.Provider>
  );
};

export const useGSAPLenis = (): GSAPLenisContextType => {
  const context = useContext(GSAPLenisContext);
  if (!context) {
    throw new Error("useGSAPLenis must be used within a GSAPLenisProvider");
  }
  return context;
};
