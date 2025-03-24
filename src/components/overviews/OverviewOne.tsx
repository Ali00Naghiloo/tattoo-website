"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import image1 from "@/public/assets/overview-image1.jpg";
import image2 from "@/public/assets/overview-image2.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OverviewOne() {
  const containerRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "150% 50%",
        markers: true,
      },
    });

    tl.to(image1Ref, { y: 20, opacity: 1 });

    // tl.to()
  }, []);

  return (
    <div className="w-full py-52 bg-[#1d1d1d] z-10 relative">
      <div
        className="w-full min-h-screen flex justify-between"
        ref={containerRef}
      >
        {/* svg-texts */}
        <div className="h-screen sticky left-0 top-0 flex-1 flex flex-col justify-center items-center gap-10">
          {/* title */}
          <div className="flex flex-col gap-2 text-6xl">
            <span>Leidenschaft</span>
            <span>und Präzision</span>
          </div>

          <p className="max-w-[50%] translate-x-[50%]">
            Hey, I&apos;m Nicki, and I&apos;ve been tattooing in my studio in
            Düsseldorf since 2017. My expertise lies in mandala and traditional
            styles, but I&apos;m always open to new creative ideas so we can
            find your perfect tattoo together.
          </p>
        </div>

        {/* images */}
        <div className="flex-1 px-[10%]">
          <div className="h-screen">
            <Image
              ref={image1Ref}
              src={image1}
              alt="image"
              width={500}
              height={1000}
              className="w-[80%] h-full object-cover mx-auto translate-y-[20px] opacity-0"
            />
          </div>

          <div className="h-screen">
            <Image
              ref={image2Ref}
              src={image2}
              alt="image"
              width={500}
              height={1000}
              className="w-[80%] h-full object-cover mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
