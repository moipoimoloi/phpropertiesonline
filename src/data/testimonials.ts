export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  /** Short buyer category for the chip — e.g. "First-time buyer", "OFW", "Investor". */
  category: string;
  /** Longer role/location string shown under the author. */
  role: string;
  /** Must match a property name from `data/properties.ts` for the thumbnail to render. */
  property?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
};

// ============================================================================
// PLACEHOLDER TESTIMONIALS
// ----------------------------------------------------------------------------
// These are SAMPLE quotes for layout review only. Replace each entry with a
// real client testimonial (with the client's written consent) before launch.
// Recommended fields to collect when gathering real ones:
//   - 2-4 sentence quote in the client's own words
//   - First name + last-initial OR full name (whichever they consent to)
//   - Role/context: "OFW · Doha", "First-time buyer · Manila", etc.
//   - Property they bought (helps with credibility + SEO)
//   - Rating 1-5 (most will be 5; leave it optional)
// ============================================================================

export const testimonials: readonly Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "Abigail walked us through every step — from the sample computation to the actual site visit. She answered every question patiently and never pushed us toward a unit that didn't fit our budget. We closed on our condo with full confidence.",
    author: "M. S.",
    category: "First-time buyer",
    role: "Quezon City",
    property: "Avida Towers Verge",
    rating: 5
  },
  {
    id: "placeholder-2",
    quote:
      "As an OFW, I needed someone reliable to handle the paperwork while I was abroad. Abigail coordinated the documents, payments, and turnover so well that everything was ready by the time I came home for vacation.",
    author: "J. C.",
    category: "OFW",
    role: "Based in Dubai",
    property: "Crescela Nuvali",
    rating: 5
  },
  {
    id: "placeholder-3",
    quote:
      "We were comparing several developers in Pampanga and Abigail gave us the most honest breakdown — including the parts other brokers glossed over. That straightforwardness is why we chose Alviera through her.",
    author: "R. T.",
    category: "Investor",
    role: "Pampanga",
    property: "Vermont Settings Alviera",
    rating: 5
  }
] as const;
