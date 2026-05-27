import Image from "next/image";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { BROKER, properties } from "@/data/properties";
import { testimonials } from "@/data/testimonials";

function lookupProperty(name: string | undefined) {
  if (!name) return undefined;
  return properties.find((p) => p.name === name);
}

const aggregateRating = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  itemReviewed: {
    "@type": "RealEstateAgent",
    name: BROKER.name
  },
  ratingValue: (
    testimonials.reduce((sum, t) => sum + (t.rating ?? 5), 0) / testimonials.length
  ).toFixed(1),
  reviewCount: testimonials.length,
  bestRating: 5,
  worstRating: 1
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-primary" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2.5 14.95 8.7l6.8.99-4.92 4.8 1.16 6.77L12 18.07l-6 3.19 1.15-6.78L2.25 9.69l6.8-.99L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 lg:py-32 bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <Reveal as="div" className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-label-sm text-primary tracking-widest">CLIENT STORIES</span>
          <h2 className="font-display text-headline-md mt-3 mb-4 leading-tight">
            Stories from the buyers I&apos;ve helped find home.
          </h2>
          <p className="text-body-md text-on-surface-variant">
            From first-time buyers in Metro Manila to OFW investors across the region.
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-gutter list-none p-0">
          {testimonials.map((t, i) => {
            const property = lookupProperty(t.property);
            return (
              <Reveal key={t.id} as="li" delay={i * 120}>
                <figure className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-3 py-1 text-label-sm font-display font-semibold">
                      {t.category}
                    </span>
                    <Stars count={t.rating ?? 5} />
                  </div>
                  <blockquote className="text-body-md text-on-surface leading-relaxed flex-1">
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 pt-6 border-t border-outline-variant/40 flex items-center gap-3">
                    <span
                      aria-hidden
                      className="w-11 h-11 shrink-0 rounded-full bg-primary/10 text-primary font-display font-bold flex items-center justify-center text-label-md"
                    >
                      {initials(t.author)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-display font-semibold text-on-surface">{t.author}</div>
                      <div className="text-label-sm text-on-surface-variant truncate">{t.role}</div>
                    </div>
                    {property && (
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-outline-variant/40 shadow-sm">
                          <Image
                            src={property.image}
                            alt=""
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </figcaption>
                  {property && (
                    <p className="mt-3 text-label-sm text-on-surface-variant italic">
                      Bought at <span className="not-italic font-display font-semibold text-on-surface">{property.name}</span>
                    </p>
                  )}
                </figure>
              </Reveal>
            );
          })}
        </ul>

        <p className="text-center text-label-sm text-on-surface-variant mt-10 italic">
          Testimonials shared with each client&apos;s consent.{" "}
          <a
            href="#contact"
            className="text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          >
            Want to share yours? <Icon name="arrow_forward" className="text-base" />
          </a>
        </p>
      </div>

      <script
        key="ld-json-testimonials"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRating) }}
      />
    </section>
  );
}
