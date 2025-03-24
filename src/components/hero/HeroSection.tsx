"use client";

import React, { useEffect, useRef } from "react";
import plants from "@/public/assets/plant.png";
import elli from "@/public/assets/elli-desktop.png";
import textureBg from "@/public/assets/texture-bg.jpg";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  // refs
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const leafRef = useRef(null);
  const elliRef = useRef(null);

  const title = "WonderkinTattoo";

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        // markers: true,
        start: "53% 50%",
        scrub: true,
      },
    });

    // gsap.to(titleRef.current, { y: 100 });

    tl.to(
      titleRef.current,
      {
        y: -200,
      },
      "a"
    )
      .to(leafRef.current, { scale: 1.2 }, "a")
      .to(elliRef.current, { scale: 1.2 }, "a")
      .to(containerRef.current, { y: 400 }, "a");
  });

  useEffect(() => {
    if (titleRef.current) {
      const words = title.split(" ").map((word) => {
        const span = document.createElement("span");
        span.style.display = "inline-block"; // Required for transforms
        span.textContent = word + " "; // Preserve spacing
        return span;
      });
      // Clear original text and append spans
      titleRef.current.innerHTML = "";
      words.forEach((span) => titleRef.current?.appendChild(span));

      // GSAP Animation
      gsap.from(words, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <div
      className="w-full h-screen flex flex-col justify-end items-center bg-[#292929] overflow-hidden"
      ref={containerRef}
    >
      <div className="w-full h-full fixed left-0 top-0">
        <Image
          className="w-full h-full object-cover opacity-[0.29]"
          style={{ mixBlendMode: "multiply" }}
          src={textureBg}
          alt=""
          width={1000}
          height={900}
        />
      </div>

      {/* title */}
      <div
        ref={titleRef}
        className="flex justify-center text-[9rem] w-full translate-y-[50%] z-10"
      >
        {title.split("").map((t, index) => (
          <span key={index} className="">
            {t}
          </span>
        ))}
      </div>

      <Image
        src={plants}
        className="w-[80%] absolute bottom-0 left-[50%] translate-x-[-50%]"
        alt="plant"
        width={700}
        height={500}
        ref={leafRef}
      />

      {/* images */}
      <div className="w-[30%] h-[80%] absolute left-[50%] translate-x-[-50%] bg-[#83827E] rounded-se-[190px] rounded-ss-[190px]"></div>

      <Image
        ref={elliRef}
        src={elli}
        alt="plant"
        className="w-fit h-[80%] z-20"
        width={300}
        height={500}
      />
    </div>
  );
}
