export type PropertyStatus = "PRE-SELLING · TOWER 2" | "PRE-SELLING · 2027" | "NEW LAUNCH" | "HOUSE & LOT";

export type Property = {
  slug: string;
  name: string;
  location: string;
  developer: string;
  image: string;
  imageAlt: string;
  status: PropertyStatus;
  statusTone: "primary" | "neutral";
  specs: string[];
  priceLabel: string;
  price: string;
  priceFootnote: string;
};

export const properties: readonly Property[] = [
  {
    slug: "crescela-nuvali",
    name: "Crescela Nuvali",
    location: "Calamba, Laguna",
    developer: "Developed by Ayala Land",
    image: "/assets/crescela-nuvali.jpg",
    imageAlt: "Crescela Nuvali aerial view",
    status: "NEW LAUNCH",
    statusTone: "neutral",
    specs: ["Residential lots · 161–250 sqm", "Erin (3BR) & Solea (4BR) house & lot"],
    priceLabel: "Starting at",
    price: "₱8M – ₱19M",
    priceFootnote: "From approx. ₱32K / month"
  },
  {
    slug: "avida-towers-verge",
    name: "Avida Towers Verge",
    location: "EDSA, Mandaluyong",
    developer: "Developed by Avida Land",
    image: "/assets/avida-towers-verge.jpg",
    imageAlt: "Avida Towers Verge exterior",
    status: "PRE-SELLING · TOWER 2",
    statusTone: "primary",
    specs: ["Junior 1BR, 1BR, Parking", "Tower 2 turnover · December 2026"],
    priceLabel: "Monthly from",
    price: "₱11,400 / mo",
    priceFootnote: "Reservation fee ₱50,000"
  },
  {
    slug: "vermont-settings-alviera",
    name: "Vermont Settings Alviera",
    location: "Porac, Pampanga",
    developer: "Inside Alviera Estate",
    image: "/assets/vermont-settings-alviera.jpg",
    imageAlt: "Vermont Settings Alviera aerial view",
    status: "PRE-SELLING · 2027",
    statusTone: "primary",
    specs: ["Residential lots from 125 sqm", "10 min to Clark Global City"],
    priceLabel: "Monthly",
    price: "₱25K – ₱60K",
    priceFootnote: "Targeted turnover · 2027"
  },
  {
    slug: "avida-settings-greendale",
    name: "Avida Settings Greendale",
    location: "Porac, Pampanga",
    developer: "Inside Alviera Estate",
    image: "/assets/avida-settings-greendale.jpg",
    imageAlt: "Avida Settings Greendale entrance",
    status: "HOUSE & LOT",
    statusTone: "neutral",
    specs: ["Celine · Macy · Trista models", "52–85 sqm FA · 125–195 sqm lot"],
    priceLabel: "Flexible terms",
    price: "Inquire",
    priceFootnote: "For sample computation"
  }
] as const;

export const BROKER = {
  name: "Abigail S. Natan",
  title: "Branch Manager · Avida Land Corp.",
  reb: "0033432",
  rebValidUntil: "02/08/2026",
  phone: "+63 919 004 6498",
  phoneHref: "tel:+639190046498",
  email: "phpropertiesonline@gmail.com",
  emailHref: "mailto:phpropertiesonline@gmail.com",
  address: "Theater Drive, Circuit Corporate Tower 1, Makati 1207, Philippines",
  mapsUrl: "https://maps.app.goo.gl/5oGwMtC7DEK4iDuu8"
} as const;
