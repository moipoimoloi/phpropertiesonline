import Image from "next/image";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

const driveTimes = [
  { time: "10 min", label: "to Clark Global City" },
  { time: "15–25 min", label: "to Clark Int'l Airport" },
  { time: "12 min", label: "to Medical City Clark" },
  { time: "40 min", label: "to Subic Freeport" }
] as const;

export function AlvieraSpotlight() {
  return (
    <section className="py-16 lg:py-32 text-white overflow-hidden bg-charcoal">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal as="div">
            <span className="text-label-sm tracking-widest text-secondary-container">SPOTLIGHT · CENTRAL LUZON</span>
            <h2 className="font-display text-headline-md mt-3 mb-6">
              Why Alviera is shaping Pampanga&apos;s next decade
            </h2>
            <p className="text-body-lg opacity-90 mb-8">
              A 1,800-hectare master-planned estate by Ayala Land &amp; Leonio Land at SCTEX Porac Exit, supported by
              major infrastructure and a growing mix of homes, schools, and lifestyle hubs.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              {driveTimes.map((d) => (
                <div key={d.label}>
                  <div className="font-display text-headline-md">{d.time}</div>
                  <div className="text-label-sm opacity-80 uppercase tracking-wider mt-1">{d.label}</div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-display font-semibold text-label-md hover:bg-primary-container transition-all"
            >
              Request sample computation <Icon name="arrow_forward" />
            </a>
          </Reveal>

          <Reveal as="div" delay={150} className="grid grid-cols-2 gap-4">
            <div className="rounded-xl aspect-square overflow-hidden shadow-lg bg-alviera-teal relative">
              <Image src="/assets/alviera-map.jpg" alt="Alviera access map" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain" />
            </div>
            <div className="rounded-xl aspect-square overflow-hidden shadow-lg mt-8 relative">
              <Image src="/assets/alviera-homes.jpg" alt="Alviera homes aerial view" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="rounded-xl aspect-square overflow-hidden shadow-lg relative">
              <Image src="/assets/alviera-clubhouse.jpg" alt="Alviera clubhouse" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="rounded-xl aspect-square overflow-hidden shadow-lg mt-8 relative">
              <Image
                src="/assets/alviera-commercial.jpg"
                alt="Alviera commercial hub aerial view"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
