"use client";

import { useLenis } from "lenis/react";
import { useCallback, useRef, useState } from "react";

import ArrowButton from "@/components/ui/ArrowButton";
import { InstagramIcon, Logo } from "@/components/ui/icons";
import Magnetic from "@/components/ui/Magnetic";
import RollingText from "@/components/ui/RollingText";
import { navItems, site } from "@/content/site";
import { useScrollTo } from "@/hooks/useScrollTo";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntro } from "@/providers/IntroProvider";

import MenuToggle from "./MenuToggle";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const { ready } = useIntro();
  const scrollTo = useScrollTo();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#top");

  useLenis(
    ({ scroll, direction }) => {
      setScrolled(scroll > 60);
      if (!menuOpen) setHidden(direction === 1 && scroll > 240);

      // Highlight the section that occupies the middle of the viewport.
      const mid = window.innerHeight / 2;
      for (const item of navItems) {
        const rect = document.querySelector(item.href)?.getBoundingClientRect();
        if (rect && rect.top <= mid && rect.bottom >= mid) {
          setActive(item.href);
          break;
        }
      }
    },
    [menuOpen],
  );

  useGSAP(
    () => {
      if (!ready) return;
      gsap.from("[data-header-item]", { yPercent: -120, autoAlpha: 0, stagger: 0.07, duration: 1.2, delay: 0.5 });
    },
    { scope: root, dependencies: [ready] },
  );

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <>
      <header
        ref={root}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-ink",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 bg-linear-to-b from-ink/80 to-transparent backdrop-blur-[2px] transition-opacity duration-700",
            scrolled && !menuOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <div className="mx-auto flex items-center justify-between gap-6 px-5 py-5 md:px-10 md:py-7">
          <a href="#top" onClick={go("#top")} aria-label={`${site.name} — back to top`} data-header-item className="block">
            <Magnetic strength={0.4}>
              <Logo className="h-7 w-auto transition-transform duration-700 ease-ink hover:rotate-[-8deg] md:h-8" />
            </Magnetic>
          </a>

          <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-9">
              {navItems.map((item) => (
                <li key={item.href} data-header-item>
                  <a
                    href={item.href}
                    onClick={go(item.href)}
                    aria-current={active === item.href ? "true" : undefined}
                    className="group relative flex items-center gap-2 py-2 text-[0.8rem] uppercase tracking-[0.18em] text-bone/70 transition-colors hover:text-bone aria-[current]:text-bone"
                  >
                    <span
                      className={cn(
                        "size-1 rounded-full bg-ember transition-[transform,opacity] duration-500 ease-ink",
                        active === item.href ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      )}
                    />
                    <RollingText text={item.label} />
                  </a>
                </li>
              ))}
              <li data-header-item>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="block text-bone/70 transition-[color,transform] duration-500 hover:rotate-12 hover:text-bone"
                >
                  <InstagramIcon className="size-[18px]" />
                </a>
              </li>
            </ul>
          </nav>

          <div data-header-item className="flex items-center gap-3">
            <div className="hidden lg:block">
              <ArrowButton href="#contact" onClick={go("#contact")} label="Book a session" />
            </div>
            <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} className="lg:hidden" />
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
