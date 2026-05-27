import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { type Property } from "@/data/properties";
import { filterProperties, hasActiveFilters, type PropertyFilters } from "@/lib/filter-properties";

function PropertyCard({ property }: { property: Property }) {
  const badgeClass =
    property.statusTone === "primary"
      ? "bg-primary text-white"
      : "bg-secondary-container text-on-secondary-container";

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col group">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={property.image}
          alt={property.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out motion-reduce:transform-none"
        />
        <div className={`absolute top-4 left-4 ${badgeClass} px-3 py-1 rounded-full text-label-sm`}>
          {property.status}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-display text-headline-sm mb-1">{property.name}</h3>
        <p className="text-label-sm text-on-surface-variant mb-3">
          {property.location} · {property.developer}
        </p>
        <ul className="text-body-md text-on-surface-variant space-y-1 mb-4">
          {property.specs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 border-t border-outline-variant/40 pt-4 mt-auto">
          <span className="text-label-sm text-on-surface-variant uppercase">{property.priceLabel}</span>
          <span className="font-display text-headline-sm font-bold text-primary">{property.price}</span>
          <span className="text-label-sm text-on-surface-variant">{property.priceFootnote}</span>
        </div>
        <Link
          href={`/?interest=${encodeURIComponent(property.name)}#contact`}
          className="mt-4 text-primary font-display font-semibold text-label-md inline-flex items-center gap-1 hover:gap-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
        >
          Request Free Computation <Icon name="arrow_forward" className="text-base" />
        </Link>
      </div>
    </article>
  );
}

export function PropertyGrid({ filters }: { filters?: PropertyFilters }) {
  const visible = filterProperties(filters ?? {});
  const filtered = hasActiveFilters(filters ?? {});

  return (
    <section id="properties" className="py-16 lg:py-32 bg-surface-container-low scroll-mt-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <Reveal as="div" className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12">
          <div>
            <h2 className="font-display text-headline-md">Featured Properties</h2>
            <p className="text-body-md text-on-surface-variant mt-2">
              {filtered
                ? `Showing ${visible.length} of 4 properties matching your filters.`
                : "Active developments I currently represent."}
            </p>
          </div>
          <div className="flex items-center gap-6">
            {filtered && (
              <Link
                href="/#properties"
                className="inline-flex items-center gap-1.5 border border-outline-variant bg-white text-on-surface font-display font-semibold text-label-md px-3 py-1.5 rounded-full hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Icon name="close" className="text-base" />
                Clear filters
              </Link>
            )}
            <a
              className="text-primary font-display font-semibold text-label-md inline-flex items-center gap-2 hover:gap-3 transition-all"
              href="#contact"
            >
              Request Free Computation <Icon name="arrow_forward" />
            </a>
          </div>
        </Reveal>

        {visible.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <Icon name="search_off" className="text-5xl text-on-surface-variant mb-4" />
            <h3 className="font-display text-headline-sm mb-2">No matches in that area yet</h3>
            <p className="text-body-md text-on-surface-variant mb-6">
              I represent properties in Mandaluyong, Calamba, and Pampanga. Send a message and I&apos;ll let you know
              about upcoming developments in your preferred location.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-display font-semibold text-label-md hover:bg-primary-container transition-all"
            >
              Contact me <Icon name="arrow_forward" />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {visible.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
