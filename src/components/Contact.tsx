import { Icon } from "./Icon";
import { BROKER } from "@/data/properties";
import { InquiryForm } from "./InquiryForm";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="py-16 lg:py-32 bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal as="div">
            <span className="text-label-sm text-primary tracking-widest">GET IN TOUCH</span>
            <h2 className="font-display text-headline-md mt-3 mb-6">Let&apos;s find the right property for you.</h2>
            <p className="text-body-lg text-on-surface-variant mb-10">
              Tell me a bit about what you&apos;re looking for and I&apos;ll send back unit availability, a sample
              computation, and a few site-visit options.
            </p>

            <div className="space-y-5">
              <a href={BROKER.phoneHref} className="flex items-center gap-4 group">
                <span className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Icon name="call" />
                </span>
                <div>
                  <div className="text-label-sm uppercase text-on-surface-variant">Mobile</div>
                  <div className="font-display font-semibold text-body-lg">{BROKER.phone}</div>
                </div>
              </a>
              <a href={BROKER.emailHref} className="flex items-center gap-4 group">
                <span className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Icon name="mail" />
                </span>
                <div>
                  <div className="text-label-sm uppercase text-on-surface-variant">Email</div>
                  <div className="font-display font-semibold text-body-lg">{BROKER.email}</div>
                </div>
              </a>
              <a
                href={BROKER.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
              >
                <span className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Icon name="place" />
                </span>
                <div>
                  <div className="text-label-sm uppercase text-on-surface-variant">Branch Office</div>
                  <div className="font-display font-semibold text-body-lg group-hover:underline">{BROKER.address}</div>
                  <div className="text-label-sm text-on-surface-variant mt-0.5">Open in Google Maps ↗</div>
                </div>
              </a>
            </div>
          </Reveal>

          <Reveal as="div" delay={120}>
            <InquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
