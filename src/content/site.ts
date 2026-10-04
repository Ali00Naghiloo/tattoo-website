import type { StaticImageData } from "next/image";

import studio01 from "@public/images/about/studio-01.jpg";
import studio02 from "@public/images/about/studio-02.jpg";
import work01 from "@public/images/gallery/work-01.jpg";
import work02 from "@public/images/gallery/work-02.jpg";
import work03 from "@public/images/gallery/work-03.jpg";
import work04 from "@public/images/gallery/work-04.jpg";
import work05 from "@public/images/gallery/work-05.jpg";
import voice01 from "@public/images/voices/voice-01.jpg";
import voice02 from "@public/images/voices/voice-02.jpg";
import voice03 from "@public/images/voices/voice-03.jpg";

export const site = {
  name: "Wonderkin Tattoo",
  artist: "Nicki",
  city: "Düsseldorf",
  since: 2017,
  // TODO: replace with the studio's real profile URL.
  instagram: "https://www.instagram.com/",
  credit: { label: "Michael Aust", href: "#" },
};

export type NavItem = { label: string; href: `#${string}` };

export const navItems: NavItem[] = [
  { label: "Start", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Voices", href: "#voices" },
  { label: "Contact", href: "#contact" },
];

export const styles = ["Mandala", "Traditional", "Fine line", "Botanical", "Blackwork", "Ornamental"];

export const about = {
  intro:
    "Hey, I'm Nicki, and I've been tattooing in my studio in Düsseldorf since 2017. My expertise lies in mandala and traditional styles, but I'm always open to new creative ideas so we can find your perfect tattoo together.",
  facts: [
    { value: "2017", label: "Tattooing since" },
    { value: "1:1", label: "Private studio sessions" },
    { value: "∞", label: "Custom designs, never flash" },
  ],
  images: [
    { src: studio01, alt: "Detailed tattoo work in the studio" },
    { src: studio02, alt: "Finished tattoo close-up" },
  ] satisfies { src: StaticImageData; alt: string }[],
};

export const gallery: { src: StaticImageData; alt: string }[] = [
  { src: work01, alt: "Tattoo work 01" },
  { src: work02, alt: "Tattoo work 02" },
  { src: work03, alt: "Tattoo work 03" },
  { src: work04, alt: "Tattoo work 04" },
  { src: work05, alt: "Red botanical fine line tattoo on the collarbone" },
];

export type Testimonial = { name: string; quote: string; image: StaticImageData };

export const testimonials: Testimonial[] = [
  {
    name: "Andi",
    quote:
      "Nicki is incredibly professional. She took the time to understand my idea and transform it into a beautiful tattoo. Her empathetic manner immediately put me at ease, and throughout the session she repeatedly checked on my comfort level. The result was not only precise but exceeded my expectations.",
    image: voice01,
  },
  {
    name: "Marie",
    quote:
      "I was a little concerned about the pain, but Nicki explained everything so well that I immediately relaxed. She showed me several designs and made sure I was happy with everything. Her precision and patience are remarkable — the tattoo is a true work of art.",
    image: voice02,
  },
  {
    name: "Vera",
    quote:
      "I felt comfortable with Nicki from the very beginning. Her studio is clean and welcoming, and she has a knack for putting people at ease. The tattoo is exactly what I imagined — maybe even better. I recommend her to anyone looking for a talented, compassionate artist.",
    image: voice03,
  },
];
