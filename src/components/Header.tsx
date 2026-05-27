"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "./Icon";
import { BROKER } from "@/data/properties";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#properties", label: "Properties" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Stories" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" }
] as const;

type ActiveId = (typeof navLinks)[number]["href"] | null;

// Scroll distance over which the header transitions from transparent → solid.
// Fade begins immediately on scroll (FADE_START = 0).
const FADE_START = 0;
const FADE_LENGTH = 500;

function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const raw = (window.scrollY - FADE_START) / FADE_LENGTH;
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    update();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return progress;
}

function useActiveSection(): ActiveId {
  const [active, setActive] = useState<ActiveId>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ids = navLinks.map((l) => l.href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const HEADER_OFFSET = 140;

    // Sort once by document position so "last passed" works regardless of array order.
    const sorted = [...elements].sort((a, b) => a.offsetTop - b.offsetTop);

    const compute = () => {
      const scrollY = window.scrollY + HEADER_OFFSET;
      // Pick the last tracked section whose top is at or above the trigger line.
      // This keeps the previous nav link underlined through any untracked region in between
      // (e.g. Video Walkthrough sits between About and Stories, but isn't a nav target).
      let current: ActiveId = null;
      for (const el of sorted) {
        if (scrollY >= el.offsetTop) {
          current = `#${el.id}` as ActiveId;
        } else {
          break;
        }
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    compute();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        compute();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();
  const scrolled = progress > 0.5;
  const active = useActiveSection();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onHash = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, [open]);

  // Treat the menu being open the same as fully scrolled — opaque chrome so the drawer is legible.
  const visualProgress = open ? 1 : progress;
  const opaque = visualProgress > 0.5;

  const navLinkClass = (href: string) =>
    `relative text-label-md tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded py-2 group ${
      active === href
        ? "font-display text-primary"
        : opaque
          ? "text-on-surface-variant hover:text-primary"
          : "text-white hover:text-white drop-shadow"
    }`;

  const navUnderline = (href: string) =>
    `absolute left-0 right-0 -bottom-0.5 h-[2px] origin-left transition-transform duration-300 ease-out ${
      active === href
        ? "bg-primary scale-x-100"
        : opaque
          ? "bg-primary scale-x-0 group-hover:scale-x-100"
          : "bg-white scale-x-0 group-hover:scale-x-100"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ====== Red TopStrip — fades & expands as you scroll ====== */}
      <div
        aria-hidden={visualProgress < 0.5}
        style={{
          maxHeight: `${visualProgress * 10}rem`,
          opacity: visualProgress,
          willChange: "max-height, opacity"
        }}
        className="bg-primary text-white text-label-sm overflow-hidden"
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-1 sm:py-2 flex flex-row sm:flex-wrap justify-between items-center gap-x-3 gap-y-1 text-[11px] sm:text-label-sm">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1">
              <Icon name="verified" className="text-sm sm:text-base" />
              REB Lic. No. {BROKER.reb}
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Icon name="workspace_premium" className="text-base" />
              Authorized Property Specialist · Avida Land Corp
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={BROKER.phoneHref}
              className="flex items-center gap-1 hover:underline py-0.5 sm:py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
              tabIndex={scrolled ? 0 : -1}
            >
              <Icon name="call" className="text-sm sm:text-base" />
              {BROKER.phone}
            </a>
            <a
              href={BROKER.emailHref}
              className="hidden sm:flex items-center gap-1 hover:underline py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded"
              tabIndex={scrolled ? 0 : -1}
            >
              <Icon name="mail" className="text-base" />
              {BROKER.email}
            </a>
          </div>
        </div>
      </div>

      {/* ====== Main navigation bar ====== */}
      <div
        style={{
          backgroundColor: `rgba(255, 255, 255, ${visualProgress})`,
          borderBottomColor: `rgba(207, 206, 206, ${visualProgress * 0.6})`,
          boxShadow:
            visualProgress > 0
              ? `0 4px 6px -1px rgba(0,0,0,${visualProgress * 0.1}), 0 2px 4px -2px rgba(0,0,0,${visualProgress * 0.1})`
              : "none",
          willChange: "background-color, border-color, box-shadow"
        }}
        className="border-b"
      >
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-3 lg:py-6 max-w-container-max mx-auto">
          <a
            href="#top"
            className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          >
            <Image
              src="/assets/avida-logo.png"
              alt="Avida"
              width={120}
              height={36}
              className="h-7 sm:h-9 w-auto object-contain"
              priority
            />
            <span
              className={`flex flex-col leading-tight border-l pl-2 sm:pl-3 transition-colors ${
                opaque ? "border-outline-variant/60" : "border-white/40"
              }`}
            >
              <span className={`text-[10px] sm:text-label-sm ${opaque ? "text-on-surface-variant" : "text-white/80"}`}>by</span>
              <span
                className={`font-display font-semibold text-[11px] sm:text-label-md -mt-0.5 whitespace-nowrap ${
                  opaque ? "text-on-surface" : "text-white drop-shadow"
                }`}
              >
                Abigail S. Natan
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-10 xl:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={navLinkClass(link.href)}
              >
                <span>{link.label}</span>
                <span className={navUnderline(link.href)} aria-hidden />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="cta-hover-glow bg-primary text-white px-3.5 sm:px-7 py-2 sm:py-3 rounded-xl font-display font-semibold text-[13px] sm:text-label-md hover:bg-primary-container hover:-translate-y-0.5 transition-all duration-200 min-h-10 sm:min-h-11 inline-flex items-center touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary shadow-md"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book a Viewing</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className={`lg:hidden w-11 h-11 rounded flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                opaque ? "text-on-surface hover:text-primary" : "text-white hover:text-white/80"
              }`}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {open && (
          <nav
            id="mobile-nav"
            aria-label="Primary mobile"
            className="lg:hidden border-t border-outline-variant/30 bg-white"
          >
            <ul className="flex flex-col py-2 list-none p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.href ? "true" : undefined}
                    className={`block px-margin-mobile md:px-margin-desktop py-3 text-label-md font-display hover:bg-surface-container-low focus-visible:bg-surface-container-low focus-visible:outline-none ${
                      active === link.href
                        ? "text-primary border-l-4 border-primary"
                        : "text-on-surface hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
