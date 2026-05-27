export type Faq = {
  id: string;
  question: string;
  answer: string;
};

// Conservative, fact-based answers — nothing here commits the broker to specific terms
// outside what Avida Land / Ayala Land publish themselves. Update with her input as needed.
export const faqs: readonly Faq[] = [
  {
    id: "reservation",
    question: "How does the reservation process work?",
    answer:
      "Reservations start with a refundable reservation fee (commonly ₱25,000–₱50,000 depending on the project). Once paid, the unit is held in your name for a set period while you complete the buyer's requirements and choose a payment scheme. I'll walk you through each step and prepare the paperwork."
  },
  {
    id: "payment-terms",
    question: "What payment terms are available?",
    answer:
      "Most Avida Land projects offer Spot Cash, Spot Down Payment (with a discount), and Deferred Down Payment over 12–48 months. After the down-payment period, the balance is paid via bank financing, Pag-IBIG, in-house financing, or spot cash. I'll prepare sample computations so you can compare options side-by-side."
  },
  {
    id: "ofw-buyers",
    question: "Can OFWs and Filipinos living abroad buy property?",
    answer:
      "Yes. Filipino citizens — including OFWs and dual citizens — can purchase any property type. We can complete the entire process remotely: video site tours, e-signed reservation documents, online payments, and an authorized representative for personal handover. Most of my OFW clients close without flying home."
  },
  {
    id: "foreign-buyers",
    question: "Can foreign nationals buy property in the Philippines?",
    answer:
      "Foreign nationals can purchase condominium units in projects where foreign ownership has not yet reached the 40% legal cap. They cannot own land directly, which means house-and-lot units and residential lots are restricted to Filipino citizens (long-term lease structures are possible). I can confirm the current foreign quota for any condo project on request."
  },
  {
    id: "preselling-vs-rfo",
    question: "What's the difference between pre-selling and ready-for-occupancy (RFO)?",
    answer:
      "Pre-selling units are sold before or during construction, usually at lower introductory prices with longer down-payment terms. RFO units are completed and can be moved into (or rented out) immediately, but cost more and have shorter payment windows. Pre-selling suits investors and buyers with time; RFO suits buyers who need a home now."
  },
  {
    id: "requirements",
    question: "What documents are required to buy?",
    answer:
      "For Filipino buyers: two valid government-issued IDs, proof of income (payslips, ITR/BIR 2316, or company COE), and TIN. For married buyers: marriage certificate and spouse's IDs. OFWs: contract of employment and remittance proofs. Foreign buyers: passport plus the above income proofs. I'll send you the exact checklist for the project you choose."
  },
  {
    id: "closing-costs",
    question: "What are the typical closing costs?",
    answer:
      "Plan for roughly 5–8% of the contract price on top of the unit price. This covers documentary stamp tax, transfer tax, registration fees, notarial fees, and miscellaneous documentation. I'll itemize these in your sample computation so there are no surprises."
  },
  {
    id: "site-visit",
    question: "How do I schedule a site visit?",
    answer:
      "Send a message through the Contact form, call, or message me on Facebook with your preferred date and the project you'd like to see. The site visit is free, and I'll coordinate with the developer to arrange a unit tour, scale-model walkthrough, and an on-site sample computation."
  },
  {
    id: "loan-options",
    question: "What financing options are available after the down payment?",
    answer:
      "Most buyers use bank financing (BDO, BPI, Metrobank, Security Bank, RCBC, etc.), Pag-IBIG Housing Loan (up to ₱6M, lower fixed rates), or in-house financing from Avida Land. Each has different rate, term, and documentation requirements — I'll help you compare based on your eligibility and goals."
  },
  {
    id: "investment-protection",
    question: "What protects my investment if the developer delays or doesn't deliver?",
    answer:
      "Avida Land is a wholly-owned subsidiary of Ayala Land, Inc., one of the country's most established developers. All projects sold pre-selling are covered by DHSUD (formerly HLURB) Licenses to Sell and Certificates of Registration, which set legal turnover commitments and remedies. I'll show you the LTS/CR documents for any project before you commit."
  }
] as const;
