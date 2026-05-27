"use client";

import { useRouter } from "next/navigation";
import { Icon } from "./Icon";

const selectClass =
  "bg-transparent border-0 border-b border-on-surface/20 focus:ring-0 focus:border-primary px-0 py-2 font-display font-semibold text-base";

const LOCATIONS = ["Any Location", "Mandaluyong", "Makati", "Calamba, Laguna", "Porac, Pampanga"] as const;
const STATUSES = ["Any Status", "Pre-selling", "Ready for Occupancy"] as const;

export function Hero() {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    const location = String(fd.get("location") ?? "");
    const status = String(fd.get("status") ?? "");
    if (location && location !== "Any Location") params.set("location", location);
    if (status && status !== "Any Status") params.set("status", status);
    const qs = params.toString();
    router.push(`${qs ? `/?${qs}` : "/"}#properties`, { scroll: true });
  }

  return (
    <section id="hero" className="relative h-screen min-h-[760px] flex flex-col justify-end">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="absolute inset-0 hero-gradient" aria-hidden />

      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-20 lg:pb-24">
        {/* ====== Text panel — backdrop blur veil for typographic clarity ====== */}
        <div className="hero-fade-up max-w-[680px] text-white mb-12 lg:mb-14">
          <span className="inline-block bg-white/95 text-primary px-4 py-1.5 rounded-full text-label-sm shadow-lg mb-7">
            SMART INVESTMENTS · ONE PROPERTY AT A TIME
          </span>
          <h1 className="font-display font-extrabold text-white mb-6 leading-[1.05] tracking-tight text-[clamp(2.5rem,5.5vw,3.75rem)]">
            <span className="font-accent italic font-medium text-white/90 text-[clamp(1.5rem,3vw,2.25rem)] block mb-1">
              Premier Philippine properties.
            </span>
            Invest in locations that appreciate.
          </h1>
          <p className="font-body text-white/85 text-body-lg max-w-[600px] leading-relaxed">
            From Metro Manila condos to master-planned estates in Laguna and Pampanga — I help families and investors
            find the right home with sample computations, site visits, and end-to-end guidance.
          </p>

          {/* ====== Trust signals row ====== */}
          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/85 text-label-sm">
            <li className="flex items-center gap-2">
              <Icon name="verified" className="text-base text-white" />
              <span>Licensed Broker · REB 0033432</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="workspace_premium" className="text-base text-white" />
              <span>Authorized · Avida Land Corp</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="military_tech" className="text-base text-white" />
              <span>Q1 2026 · Top 9 Team</span>
            </li>
          </ul>
        </div>

        {/* ====== Floating glass search panel ====== */}
        <form
          onSubmit={onSubmit}
          className="glass-card p-6 md:p-8 rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-5 lg:gap-6 items-end hero-fade-up"
          style={{ animationDelay: "150ms" }}
          aria-label="Filter properties"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="hero-location" className="text-label-sm uppercase tracking-wider text-on-surface-variant">
              Location
            </label>
            <select id="hero-location" name="location" className={selectClass} defaultValue="Any Location">
              {LOCATIONS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="hero-status" className="text-label-sm uppercase tracking-wider text-on-surface-variant">
              Status
            </label>
            <select id="hero-status" name="status" className={selectClass} defaultValue="Any Status">
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="cta-hover-glow w-full lg:w-auto lg:px-8 bg-primary text-white py-3.5 rounded-2xl font-display font-semibold text-label-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Icon name="search" /> View Properties
          </button>
        </form>
      </div>
    </section>
  );
}
