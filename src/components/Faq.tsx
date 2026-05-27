import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { faqs } from "@/data/faqs";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer
    }
  }))
};

export function Faq() {
  return (
    <section id="faq" className="py-16 lg:py-32 bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <Reveal as="div" className="lg:sticky lg:top-36 lg:self-start">
            <span className="text-label-sm text-primary tracking-widest">FREQUENTLY ASKED</span>
            <h2 className="font-display text-headline-md mt-3 mb-6 leading-tight">
              <span className="font-accent italic font-medium text-on-surface-variant block mb-1 text-headline-sm">
                Before you reach out,
              </span>
              the questions buyers ask most.
            </h2>
            <p className="text-body-md text-on-surface-variant mb-6">
              Quick answers on reservations, financing, OFW buying, foreign-ownership rules, and what to expect at
              every step. Have a question that&apos;s not here?
            </p>
            <a
              href="#contact"
              className="text-primary font-display font-semibold text-label-md inline-flex items-center gap-2 hover:gap-3 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            >
              Ask me directly <Icon name="arrow_forward" />
            </a>
          </Reveal>

          <ul className="flex flex-col gap-3 list-none p-0">
            {faqs.map((f, i) => (
              <Reveal as="li" key={f.id} delay={Math.min(i, 4) * 80}>
                <details className="group bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden transition-shadow hover:shadow-md open:shadow-md">
                  <summary
                    className="flex items-start justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 font-display font-semibold text-on-surface text-body-lg leading-snug focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                  >
                    <span>{f.question}</span>
                    <span
                      aria-hidden
                      className="shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-open:rotate-45"
                    >
                      <Icon name="add" />
                    </span>
                  </summary>
                  <div className="px-5 sm:px-6 pb-6 text-body-md text-on-surface-variant leading-relaxed">
                    {f.answer}
                  </div>
                </details>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Structured data for Google rich snippets */}
      <script
        key="ld-json-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
