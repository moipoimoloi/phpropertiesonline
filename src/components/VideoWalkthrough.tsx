import { Icon } from "./Icon";
import { LiteYouTube } from "./LiteYouTube";
import { Reveal } from "./Reveal";

const VIDEO_ID = "NoatljiLVIM";
const VIDEO_TITLE = "Ayala Land property walkthrough";

export function VideoWalkthrough() {
  return (
    <section className="py-16 lg:py-32">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal as="div" className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary-container/30 rounded-full blur-3xl" aria-hidden />
            <LiteYouTube id={VIDEO_ID} title={VIDEO_TITLE} />
          </Reveal>
          <Reveal as="div" delay={120}>
            <span className="text-label-sm text-primary tracking-widest">VIDEO WALKTHROUGHS</span>
            <h2 className="font-display text-headline-md mt-3 mb-6">See the area, then decide</h2>
            <p className="text-body-lg text-on-surface-variant mb-8">
              Short walkthroughs of locations and developments — from Makati Southpoint accessibility to Alviera&apos;s
              growth corridor — so you can get a feel for the neighborhood before scheduling a site visit.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="bg-primary text-white px-8 py-4 rounded-lg font-display font-semibold text-label-md hover:bg-primary-container transition-all min-h-11 inline-flex items-center touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Book a Site Visit
              </a>
              <a
                href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-display font-semibold text-label-md inline-flex items-center gap-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
              >
                Open on YouTube <Icon name="open_in_new" className="text-base" />
              </a>
            </div>
            <p className="text-label-sm text-on-surface-variant mt-8 italic">
              Walkthroughs are general references and may not reflect specific unit assignments.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
