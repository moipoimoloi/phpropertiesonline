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
    <section
      id="hero"
      className="relative min-h-[640px] lg:h-screen lg:min-h-[760px] flex flex-col justify-end"
    >
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero-poster.jpg"
        alt=""
        aria-hidden
      />
      <div className="absolute inset-0 hero-gradient" aria-hidden />

      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-10 lg:pt-0 lg:pb-24">
        {/* ====== Text panel — backdrop blur veil for typographic clarity ====== */}
        <div className="hero-fade-up max-w-[720px] text-white mb-8 lg:mb-14">
          <span className="inline-block bg-white/95 text-primary px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-label-sm shadow-lg mb-5 sm:mb-7 leading-snug">
            SMART PROPERTY INVESTMENTS · CURATED FOR LONG-TERM VALUE
          </span>
          <h1 className="font-display font-extrabold text-white mb-4 sm:mb-6 leading-[1.1] lg:leading-[1.05] tracking-tight text-[clamp(1.85rem,5.5vw,3.75rem)]">
            Invest in properties positioned for long-term growth.
          </h1>
          <p className="font-body text-white/85 text-base sm:text-body-lg max-w-[620px] leading-relaxed">
            From Metro Manila condominiums to master-planned estates in Laguna and Pampanga, I help families and
            investors make informed property decisions with guided site visits and personalized computations.
          </p>

          {/* ====== Trust badges row ====== */}
          <ul className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-2 text-white/90 text-[12px] sm:text-label-sm">
            <TrustBadge>
              <span className="sm:hidden">Licensed Broker · REB No. 0033432</span>
              <span className="hidden sm:inline">Licensed Real Estate Broker · REB No. 0033432</span>
            </TrustBadge>
            <TrustBadge>
              <span className="sm:hidden">Accredited · Avida Land Corp.</span>
              <span className="hidden sm:inline">Accredited Property Specialist · Avida Land Corp.</span>
            </TrustBadge>
            <TrustBadge>
              <span className="sm:hidden">Top 9 Sales Team · Q1 2026</span>
              <span className="hidden sm:inline">Recognized Sales Performance · Top 9 Team · Q1 2026</span>
            </TrustBadge>
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

function TrustBadge({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
      <svg
        viewBox="0 0 20 20"
        className="w-3.5 h-3.5 shrink-0 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 10.5l4 4 8-9" />
      </svg>
      <span className="leading-none">{children}</span>
    </li>
  );
}
