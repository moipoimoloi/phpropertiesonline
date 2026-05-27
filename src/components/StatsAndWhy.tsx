import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

const stats = [
  { value: "Top 9", label: "SALES TEAM RECOGNITION · Q1 2026" },
  { value: "Top 13", label: "INDIVIDUAL PRODUCTION" },
  { value: "1,800 ha", label: "ALVIERA ESTATE FOOTPRINT" }
] as const;

const reasons = [
  {
    icon: "location_on",
    title: "Strategic Locations",
    body: "Sited near major CBDs, schools, and transit — chosen for both daily livability and long-term value."
  },
  {
    icon: "calculate",
    title: "Sample Computations",
    body: "Reservation, down payment, monthly amortization — see the real numbers before you commit."
  },
  {
    icon: "handshake",
    title: "Guided Site Visits",
    body: "Private viewings across Metro Manila, Laguna, and Pampanga — scheduled around your time."
  }
] as const;

export function StatsAndWhy() {
  return (
    <section className="py-14 lg:py-28 bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <Reveal as="div" className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-center border-b border-outline-variant/40 pb-16">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <div className="font-display text-display-lg text-primary">{s.value}</div>
              <div className="text-label-md text-on-surface-variant tracking-widest uppercase mt-2">{s.label}</div>
            </Reveal>
          ))}
        </Reveal>

        <Reveal as="div" className="mt-20 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-headline-md mb-4">Why work with a specialist broker</h2>
          <p className="text-body-md text-on-surface-variant">
            Every listing here is one I personally walk clients through — with sample computations, payment options, and
            an honest read on whether it fits your goals.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 120} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Icon name={r.icon} className="text-4xl" />
              </div>
              <h3 className="font-display text-headline-sm mb-3">{r.title}</h3>
              <p className="text-body-md text-on-surface-variant">{r.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
