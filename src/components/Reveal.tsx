"use client";

import { createElement, useEffect, useRef, useState } from "react";

type RevealTag = "div" | "section" | "article" | "li" | "ul" | "ol";

type Props = {
  children: React.ReactNode;
  /** Optional stagger delay in ms (use for grids of cards) */
  delay?: number;
  /** Render as this element type; defaults to div */
  as?: RevealTag;
  /** Optional extra classes on the wrapper */
  className?: string;
  /**
   * IntersectionObserver `rootMargin`. Default expands the viewport bottom by 10%
   * so animations fire slightly before the element scrolls fully into view.
   */
  rootMargin?: string;
};

export function Reveal({ children, delay = 0, as = "div", className = "", rootMargin = "0px 0px -10% 0px" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return createElement(
    as,
    {
      ref,
      "data-visible": visible ? "true" : undefined,
      style:
        delay && visible
          ? { transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` }
          : undefined,
      className: `reveal ${className}`.trim()
    },
    children
  );
}
