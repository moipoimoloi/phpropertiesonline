import Image from "next/image";
import { Icon } from "./Icon";
import { BROKER, properties } from "@/data/properties";

const socialLinkClass =
  "w-11 h-11 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto">
        <div className="flex flex-col gap-6 md:col-span-1">
          <div className="flex items-center gap-3">
            <Image src="/assets/avida-logo.png" alt="Avida" width={120} height={36} className="h-9 w-auto object-contain" />
            <span className="flex flex-col leading-tight border-l border-outline-variant/60 pl-3">
              <span className="text-label-sm text-on-surface-variant">by</span>
              <span className="font-display font-semibold text-on-surface text-label-md -mt-0.5">{BROKER.name}</span>
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant">
            Authorized property specialist for Avida Land Corp. Site operated by {BROKER.name}, Licensed Real Estate
            Broker · REB Lic. No. {BROKER.reb}.
          </p>
          <ul className="flex gap-3 list-none p-0 m-0">
            <li>
              <a
                className={socialLinkClass}
                href="https://www.facebook.com/avidapropertiesph"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Avida by Abigail on Facebook (opens in new tab)"
              >
                <FacebookIcon />
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Featured properties" className="flex flex-col gap-4">
          <h4 className="text-label-md font-display font-bold text-on-surface">Properties</h4>
          <ul className="flex flex-col gap-2 list-none p-0">
            {properties.map((p) => (
              <li key={p.slug}>
                <a
                  className="text-body-md text-on-surface-variant hover:text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                  href="#properties"
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Site" className="flex flex-col gap-4">
          <h4 className="text-label-md font-display font-bold text-on-surface">Site</h4>
          <ul className="flex flex-col gap-2 list-none p-0">
            <li><a className="text-body-md text-on-surface-variant hover:text-primary hover:underline" href="#about">About</a></li>
            <li><a className="text-body-md text-on-surface-variant hover:text-primary hover:underline" href="#testimonials">Stories</a></li>
            <li><a className="text-body-md text-on-surface-variant hover:text-primary hover:underline" href="#faq">FAQ</a></li>
            <li><a className="text-body-md text-on-surface-variant hover:text-primary hover:underline" href="#contact">Contact</a></li>
            <li><a className="text-body-md text-on-surface-variant hover:text-primary hover:underline" href="#privacy">Privacy Notice</a></li>
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          <h4 className="text-label-md font-display font-bold text-on-surface">Reach Abigail</h4>
          <a
            href={BROKER.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-md text-on-surface-variant hover:text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          >
            {BROKER.address} <span className="text-label-sm">↗</span>
          </a>
          <div className="mt-2 flex flex-col gap-2">
            <a
              href={BROKER.phoneHref}
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary min-h-11"
            >
              <Icon name="call" className="text-base" />
              <span className="text-label-sm">{BROKER.phone}</span>
            </a>
            <a
              href={BROKER.emailHref}
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary min-h-11"
            >
              <Icon name="mail" className="text-base" />
              <span className="text-label-sm">{BROKER.email}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 border-t border-outline-variant/30 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <p className="text-label-sm text-on-surface-variant md:max-w-3xl">
          © {new Date().getFullYear()} Avida by Abigail · {BROKER.name}, Licensed Real Estate Broker. Avida is a
          trademark of Avida Land Corp.; this site is operated by an authorized property specialist. Project details
          are based on developer marketing materials and may change without notice.
        </p>
        <p className="text-xs text-on-surface-variant/70 shrink-0 md:text-right md:pt-0">
          Powered by{" "}
          <a
            href="https://m.me/genxcript"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant/80 hover:text-primary transition-colors underline-offset-2 hover:underline"
          >
            GenXcript
          </a>
        </p>
      </div>
    </footer>
  );
}
