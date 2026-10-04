# Wonderkin Tattoo

Animated single-page landing for Wonderkin Tattoo (Düsseldorf), built with Next.js 16, React 19, Tailwind CSS 4, GSAP 3 and Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

## Structure

```
src/
  app/                 layout (fonts, metadata, global providers), page, globals.css (design tokens)
  components/
    layout/            Header, MobileMenu, MenuToggle
    sections/          Hero → About → Styles → Gallery → Testimonials → Contact → Outro (footer)
    form/              ContactForm + TextField, ChoiceGroup, Checkbox, FileField
    ui/                motion primitives: SplitReveal, Reveal, ParallaxImage, Magnetic, RollingText,
                       ArrowButton, VelocityMarquee, Sigil, Cursor, Preloader, ScrollProgress, icons
  content/site.ts      all copy, nav items, testimonials and image imports
  hooks/useScrollTo.ts smooth anchor scrolling through Lenis
  lib/gsap.ts          the only place GSAP plugins are registered (+ shared eases)
  lib/contact.ts       contact form submit (stub — see below)
  providers/           SmoothScroll (Lenis ↔ GSAP ticker ↔ ScrollTrigger), IntroProvider (preloader → hero)
public/images/         hero/, about/, gallery/, voices/, outro-bg.jpg
```

## Motion notes

- **One scroll engine.** Lenis is driven by `gsap.ticker`, and every ScrollTrigger updates from Lenis, so pinned/scrubbed sections never drift.
- **Always import GSAP from `@/lib/gsap`.** It registers ScrollTrigger, SplitText, DrawSVG and CustomEase once and exposes the `ink` / `ink.inOut` eases (mirrored as `ease-ink` / `ease-ink-in-out` in Tailwind).
- **Responsive animations use `gsap.matchMedia()`.** With a conditions object, the callback only runs if at least one condition matches, so always include a condition that is true on every device (e.g. both motion queries).
- **`prefers-reduced-motion`** disables Lenis, the preloader sequence, reveals and parallax.
- **Custom cursor labels:** add `data-cursor="Label"` to any element.

## TODO before launch

- `src/lib/contact.ts` only simulates sending. Connect it to a real endpoint (route handler + email service, Formspree, …).
- Set the real Instagram URL in `src/content/site.ts`, and link the Imprint / Privacy pages in `Outro.tsx` and `ContactForm.tsx`.
