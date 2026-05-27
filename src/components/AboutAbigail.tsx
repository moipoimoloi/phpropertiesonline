import Image from "next/image";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { BROKER } from "@/data/properties";

const credentials = [
  { icon: "verified", label: "REB License", value: `${BROKER.reb} · Valid until ${BROKER.rebValidUntil}` },
  { icon: "workspace_premium", label: "Affiliation", value: BROKER.title },
  { icon: "military_tech", label: "Q1 2026 Recognition", value: "Top 9 Team · Top 13 Individual" },
  { icon: "place", label: "Branch Office", value: "Circuit Corporate Tower 1, Makati" }
] as const;

export function AboutAbigail() {
  return (
    <section id="about" className="py-10 lg:py-32 bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">
          <Reveal as="div" className="lg:col-span-2">
            <div className="relative max-w-xs mx-auto lg:max-w-none">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-container/30 rounded-full blur-3xl" aria-hidden />
              <div className="relative z-10 w-full aspect-[4/5] rounded-xl shadow-xl overflow-hidden bg-surface-container-low">
                <Image
                  src="/assets/abigail.jpg"
                  alt="Abigail S. Natan, Licensed Real Estate Broker"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Reveal>

          <Reveal as="div" delay={120} className="lg:col-span-3">
            <span className="text-label-sm text-primary tracking-widest">MEET YOUR BROKER</span>
            <h2 className="font-display text-headline-md mt-3 mb-6">{BROKER.name}</h2>
            <p className="text-body-lg text-on-surface-variant mb-6">
              Branch Manager at Avida Land Corp. and a licensed real estate broker with a focus on guiding professionals,
              families, and investors toward informed property decisions.
            </p>
            <p className="text-body-md text-on-surface-variant mb-8">
              From walking through a unit in Mandaluyong to mapping out long-term value in an emerging hub like Alviera,
              the goal is simple: help you invest in a property you&apos;ll still be proud of years from now.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {credentials.map((c) => (
                <div key={c.label} className="bg-surface-container-low rounded-lg p-4 flex items-start gap-3">
                  <Icon name={c.icon} className="text-primary" />
                  <div>
                    <div className="text-label-sm uppercase text-on-surface-variant">{c.label}</div>
                    <div className="font-display font-semibold">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={BROKER.phoneHref}
                className="bg-primary text-white px-6 py-3 rounded-lg font-display font-semibold text-label-md hover:bg-primary-container transition-all flex items-center gap-2"
              >
                <Icon name="call" /> Call {BROKER.phone}
              </a>
              <a
                href={BROKER.emailHref}
                className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-display font-semibold text-label-md hover:bg-primary/5 transition-all flex items-center gap-2"
              >
                <Icon name="mail" /> Email
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
