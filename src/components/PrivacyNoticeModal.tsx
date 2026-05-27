"use client";

import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { BROKER } from "@/data/properties";

const HASH = "#privacy";
const LAST_UPDATED = "2026-05-27";

export function PrivacyNoticeModal() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;

    const syncFromHash = () => {
      if (typeof window === "undefined") return;
      if (window.location.hash === HASH) {
        if (!dlg.open) {
          // Guard for older Safari / WebViews that lack <dialog> support.
          if (typeof dlg.showModal === "function") {
            try {
              dlg.showModal();
            } catch {
              // dialog may already be open in some edge cases
            }
          } else {
            // Fallback: open as a regular (non-modal) panel
            dlg.setAttribute("open", "");
          }
        }
      } else if (dlg.open) {
        dlg.close();
      }
    };

    const onClose = () => {
      if (window.location.hash === HASH) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    dlg.addEventListener("close", onClose);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      dlg.removeEventListener("close", onClose);
    };
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="privacy-title"
      className="backdrop:bg-black/60 p-0 rounded-xl shadow-2xl max-w-3xl w-[min(100%-2rem,48rem)] max-h-[85vh] open:flex open:flex-col"
    >
      <header className="sticky top-0 bg-white border-b border-outline-variant/40 flex items-center justify-between px-6 py-4">
        <h2 id="privacy-title" className="font-display text-headline-sm">Privacy Notice</h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close privacy notice"
          className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <Icon name="close" />
        </button>
      </header>

      <div className="overflow-y-auto px-6 py-6 text-body-md text-on-surface-variant space-y-5">
        <div>
          <h3 className="font-display text-headline-sm text-on-surface">Avida by Abigail — Privacy Notice</h3>
          <p className="text-label-sm uppercase tracking-widest mt-1">
            Last updated:{" "}
            {new Date(LAST_UPDATED).toLocaleDateString("en-PH", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </p>
        </div>

        <p>
          This notice describes how <strong>{BROKER.name}</strong>, Licensed Real Estate Broker (REB Lic. No.{" "}
          {BROKER.reb}), collects and uses your personal information when you visit{" "}
          <em>phpropertiesonline.com</em> and contact her through this website. It is published in compliance with the
          Philippine <em>Data Privacy Act of 2012</em> (RA 10173).
        </p>

        <p className="bg-surface-container-low rounded-lg p-4 text-on-surface">
          <strong>Important:</strong> This is a <strong>broker-affiliate site</strong> operated by an authorized
          property specialist. It is <strong>not</strong> the official site of Avida Land Corp. Once you become a buyer
          and a reservation/sale is processed through Avida Land Corp., a separate notice applies — see{" "}
          <a
            href="https://www.avidaland.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            avidaland.com
          </a>{" "}
          and the{" "}
          <a
            href="https://www.ayalaland.com.ph/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Ayala Land Group Privacy Statement
          </a>
          .
        </p>

        <Section title="1. Who is responsible for your data">
          <p>
            <strong>{BROKER.name}</strong> is the <em>personal information controller</em> for data submitted through
            this website.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{BROKER.title}</li>
            <li>REB Lic. No. {BROKER.reb} (valid until {BROKER.rebValidUntil})</li>
            <li>
              <a
                href={BROKER.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {BROKER.address}
              </a>
            </li>
            <li>
              Email:{" "}
              <a href={BROKER.emailHref} className="text-primary hover:underline">
                {BROKER.email}
              </a>
            </li>
            <li>
              Mobile:{" "}
              <a href={BROKER.phoneHref} className="text-primary hover:underline">
                {BROKER.phone}
              </a>
            </li>
          </ul>
        </Section>

        <Section title="2. What we collect">
          <SubHeading>Information you give us</SubHeading>
          <p>When you submit the inquiry form on the Contact section, we collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>First and last name</li>
            <li>Email address</li>
            <li>Mobile number</li>
            <li>The property you&apos;re interested in</li>
            <li>Your message</li>
          </ul>

          <SubHeading>Information collected automatically</SubHeading>
          <p>
            Our hosting provider records standard server logs for every request (IP address, browser/user-agent,
            requested page, timestamp). These are used for security, abuse prevention, and basic operational
            diagnostics.
          </p>

          <p className="text-on-surface">
            <strong>What we do not collect:</strong> we do not request government IDs, financial information, credit
            card details, source of funding, or family-member data through this website. Those are only collected later
            — directly by Avida Land Corp. — if and when you proceed with a reservation or contract to sell.
          </p>
        </Section>

        <Section title="3. Why we use it (and our legal basis)">
          <p>We use your information only for these purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>To respond to your inquiry</strong> — send unit availability, sample computations, and site-visit
              options. <em>Legal basis: your consent and the necessity of pre-contractual steps you requested.</em>
            </li>
            <li>
              <strong>To schedule and conduct site visits and follow-ups.</strong> <em>Legal basis: your consent.</em>
            </li>
            <li>
              <strong>To submit a reservation on your behalf to Avida Land Corp.</strong> if you decide to proceed — at
              which point Avida Land Corp. becomes a separate controller and its own notice applies.{" "}
              <em>Legal basis: contract / your consent.</em>
            </li>
            <li>
              <strong>To keep records of our communications</strong> for legitimate business and legal-defense reasons.{" "}
              <em>Legal basis: legitimate interests.</em>
            </li>
          </ul>
          <p>
            We <strong>do not</strong> sell your data, send unsolicited marketing, or use it for automated
            decision-making or profiling.
          </p>
        </Section>

        <Section title="4. Who else processes it for us">
          <p>
            We share your information only with service providers strictly necessary to operate this site and respond
            to you. Each is bound by their own privacy and security commitments:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>GenXcript</strong> — website developer and technical operator. Handles deployment, maintenance,
              and incident response on the broker&apos;s behalf as a data processor.
            </li>
            <li>
              <strong>Vercel Inc.</strong> (USA) — hosting and content delivery for{" "}
              <em>phpropertiesonline.com</em>. Stores server logs and serves the site. See{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Vercel&apos;s privacy policy
              </a>
              .
            </li>
            <li>
              <strong>Resend</strong> (USA) — email delivery service used to forward inquiry-form submissions to the
              broker&apos;s inbox. See{" "}
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Resend&apos;s privacy policy
              </a>
              .
            </li>
            <li>
              <strong>Google LLC</strong> (USA) — Gmail is the broker&apos;s working inbox where inquiries land, and
              Google Fonts serves the site&apos;s typefaces.
            </li>
            <li>
              <strong>YouTube / Google</strong> — embedded property walkthroughs are loaded only after you click the
              play button. We use the privacy-enhanced{" "}
              <em>youtube-nocookie.com</em> domain.
            </li>
            <li>
              <strong>Avida Land Corp. and Ayala Land, Inc.</strong> — only if you ask us to submit a reservation,
              quote, or formal inquiry on your behalf.
            </li>
          </ul>
          <p>
            Some of these providers are based outside the Philippines. Where data is transferred abroad, it is
            protected by the provider&apos;s contractual commitments and the safeguards required by the Data Privacy
            Act.
          </p>
        </Section>

        <Section title="5. Cookies and similar technologies">
          <p>
            This site uses a small number of cookies and similar storage. You control them through the{" "}
            <strong>Privacy Settings</strong> banner that appears on your first visit:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Essential</strong> — required for the site to load and for your cookie choice itself to be
              remembered. Always on.
            </li>
            <li>
              <strong>Analytics</strong> — measures aggregate traffic so we can improve the site. Optional.
            </li>
            <li>
              <strong>Marketing</strong> — used to show relevant property offers and remarketing. Optional.
            </li>
          </ul>
          <p>
            You can change your choice at any time by clearing site data in your browser, or by emailing us at{" "}
            <a href={BROKER.emailHref} className="text-primary hover:underline">
              {BROKER.email}
            </a>
            .
          </p>
        </Section>

        <Section title="6. How long we keep it">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Inquiry-form submissions</strong> are kept in the broker&apos;s inbox for up to{" "}
              <strong>two (2) years</strong> from your last contact, then deleted — unless a transaction is in progress
              or records are required to defend a legal claim.
            </li>
            <li>
              <strong>Server logs</strong> are retained by Vercel for up to <strong>30 days</strong> for security and
              operational purposes.
            </li>
            <li>
              <strong>Email delivery logs</strong> at Resend follow that provider&apos;s default retention.
            </li>
            <li>
              <strong>Reservation/contract data</strong> handled by Avida Land Corp. follows their own retention
              schedule (typically 5–10 years for financial records under BIR regulations).
            </li>
          </ul>
        </Section>

        <Section title="7. How we protect it">
          <ul className="list-disc pl-5 space-y-1">
            <li>The site is served over HTTPS with TLS encryption.</li>
            <li>Inquiry data is transmitted directly to our hosting and email providers — no third-party scripts read your form input.</li>
            <li>Access to the broker&apos;s inbox is protected by Google two-step verification.</li>
            <li>Only the broker and authorized GenXcript technical staff have access to systems holding your data.</li>
          </ul>
          <p>
            No system is 100% secure. If you have reason to believe your data may have been compromised, please email
            us immediately at{" "}
            <a href={BROKER.emailHref} className="text-primary hover:underline">
              {BROKER.email}
            </a>
            .
          </p>
        </Section>

        <Section title="8. Your rights">
          <p>Under the Data Privacy Act, you may:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Be informed about how your data is processed (this notice).</li>
            <li>Access the data we hold about you.</li>
            <li>Have inaccurate or incomplete data corrected.</li>
            <li>Object to processing, withdraw consent, or request erasure (right to be forgotten), subject to legal limits.</li>
            <li>Request a portable copy of your data.</li>
            <li>Be compensated for damages caused by misuse of your data.</li>
            <li>
              Lodge a complaint with the{" "}
              <a
                href="https://www.privacy.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                National Privacy Commission
              </a>
              . We&apos;d appreciate the chance to address it first.
            </li>
          </ul>
          <p>
            To exercise any of these rights, email{" "}
            <a href={BROKER.emailHref} className="text-primary hover:underline">
              {BROKER.email}
            </a>{" "}
            with the subject line <strong>&ldquo;Data Privacy Request&rdquo;</strong>. We respond within a reasonable
            timeframe (typically 15 business days).
          </p>
        </Section>

        <Section title="9. Children">
          <p>
            This site is intended for adults evaluating property purchases. We do not knowingly collect data from
            anyone under 18. If you believe a minor has submitted information, contact us and we will delete it.
          </p>
        </Section>

        <Section title="10. Changes to this notice">
          <p>
            We may update this notice as our processing changes or as the law evolves. The &ldquo;Last updated&rdquo;
            date at the top reflects the most recent revision. Material changes will be highlighted in the cookie
            banner the next time you visit.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            For any privacy-related question or request, contact the broker directly:
          </p>
          <ul className="list-none pl-0 space-y-1">
            <li>
              <strong>{BROKER.name}</strong>
            </li>
            <li>
              <a
                href={BROKER.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {BROKER.address}
              </a>
            </li>
            <li>
              Email:{" "}
              <a href={BROKER.emailHref} className="text-primary hover:underline">
                {BROKER.email}
              </a>
            </li>
            <li>
              Mobile:{" "}
              <a href={BROKER.phoneHref} className="text-primary hover:underline">
                {BROKER.phone}
              </a>
            </li>
          </ul>
          <p className="text-label-sm italic mt-3">
            Website built and operated by{" "}
            <a
              href="https://m.me/genxcript"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GenXcript
            </a>{" "}
            on behalf of {BROKER.name}. Hosted on Vercel.
          </p>
        </Section>
      </div>

      <footer className="sticky bottom-0 bg-white border-t border-outline-variant/40 px-6 py-4 flex justify-end">
        <button
          type="button"
          onClick={close}
          className="bg-primary text-white px-6 py-2 rounded-lg font-display font-semibold text-label-md hover:bg-primary-container transition-all"
        >
          Close
        </button>
      </footer>
    </dialog>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 pt-2">
      <h3 className="font-display text-headline-sm text-on-surface">{title}</h3>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h4 className="font-display font-semibold text-on-surface mt-4">{children}</h4>;
}
