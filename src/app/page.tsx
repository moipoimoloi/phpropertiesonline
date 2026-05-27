import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsAndWhy } from "@/components/StatsAndWhy";
import { PropertyGrid } from "@/components/PropertyGrid";
import { AboutAbigail } from "@/components/AboutAbigail";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PrivacyNoticeModal } from "@/components/PrivacyNoticeModal";
import { CookieConsent } from "@/components/CookieConsent";

type SearchParams = {
  location?: string;
  status?: string;
};

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <StatsAndWhy />
        <PropertyGrid filters={{ location: params.location, status: params.status }} />
        <AboutAbigail />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <PrivacyNoticeModal />
      <CookieConsent />
    </>
  );
}
