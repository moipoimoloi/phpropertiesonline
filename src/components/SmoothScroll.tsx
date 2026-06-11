"use client";

import { useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";

// Subscribe to prefers-reduced-motion as a live signal — if the visitor flips
// the OS setting mid-session, this re-renders without Lenis the next frame.
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        // lerp: 0.08 // each frame moves 8% of remaining distance — consecutive wheel
        //   // ticks blend into one continuous glide instead of restarting a
        //   // fixed-duration animation. Tune 0.06 (floatier) – 0.12 (snappier).
        //   // Do NOT also set duration/easing; lerp replaces them.
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        // syncTouch: false → keep native touch scrolling on mobile; syncTouch
        // lags on low-end devices and gives no benefit over the OS's own
        // momentum scroll for finger swipes.
        syncTouch: false,
        // anchors: true → in-page anchor links glide too. Lenis now owns
        // anchor smoothing, so do NOT also set CSS `scroll-behavior: smooth`
        // anywhere — the two implementations fight over scroll position.
        anchors: true
      }}
    >
      {children}
    </ReactLenis>
  );
}
