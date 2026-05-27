"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "./Icon";
import { interestOptions, inquirySchema } from "@/lib/inquiry-schema";

type Status = { kind: "idle" } | { kind: "error"; message: string } | { kind: "success" };

const inputClass =
  "bg-white border border-outline-variant/60 rounded px-3 py-2 text-base focus:border-primary focus:ring-0 aria-[invalid=true]:border-primary";
const labelClass = "text-label-sm uppercase text-on-surface-variant";

type FieldName = "firstName" | "lastName" | "email" | "mobile" | "interest" | "message";

export function InquiryForm() {
  const searchParams = useSearchParams();
  const interestParam = searchParams?.get("interest") ?? undefined;
  const defaultInterest = interestOptions.find((o) => o === interestParam) ?? interestOptions[0];

  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isPending, startTransition] = useTransition();
  const abortRef = useRef<AbortController | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  // Scroll status into view when it transitions to success/error
  useEffect(() => {
    if (status.kind === "idle") return;
    statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Guard against double-submit. With aria-disabled the button stays focusable
    // (good for screen readers), so we need a JS-level check here too.
    if (isPending) return;
    setStatus({ kind: "idle" });
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const raw: Record<string, string> = {};
    fd.forEach((v, k) => {
      raw[k] = typeof v === "string" ? v : "";
    });

    const parsed = inquirySchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as FieldName | undefined;
        if (field && !errs[field]) errs[field] = issue.message;
      }
      setFieldErrors(errs);
      setStatus({ kind: "error", message: "Please check the highlighted fields and try again." });
      // Focus the first invalid field
      const firstField = Object.keys(errs)[0];
      if (firstField && formRef.current) {
        const el = formRef.current.elements.namedItem(firstField) as HTMLElement | null;
        el?.focus();
      }
      return;
    }

    const form = e.currentTarget;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    startTransition(async () => {
      try {
        const res = await fetch("/api/inquiry", {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...parsed.data, website: raw.website ?? "" })
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as { error?: string } | null;
          throw new Error(
            body?.error ?? "We couldn't send your inquiry right now. Please try again, or reach out by phone or email."
          );
        }
        setStatus({ kind: "success" });
        form.reset();
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        // Surface only the friendly server message; otherwise show a generic fallback.
        const message =
          err instanceof Error && err.message
            ? err.message
            : "We couldn't send your inquiry right now. Please try again, or reach out by phone or email.";
        setStatus({ kind: "error", message });
      }
    });
  }

  const fieldError = (name: FieldName) => fieldErrors[name];
  const ariaInvalid = (name: FieldName) => (fieldError(name) ? true : undefined);
  const ariaDescribedBy = (name: FieldName) => (fieldError(name) ? `${name}-error` : undefined);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="bg-surface-container-low rounded-xl p-8 shadow-sm space-y-5"
      noValidate
      aria-label="Inquiry form"
    >
      {/* Honeypot — wrapper hides it from sighted users + AT, while keeping the input focusable-but-tabbed-out */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="hp-website">Website (leave blank)</label>
        <input id="hp-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          name="firstName"
          label="First Name"
          required
          error={fieldError("firstName")}
        >
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={inputClass}
            placeholder="Maria"
            aria-invalid={ariaInvalid("firstName")}
            aria-describedby={ariaDescribedBy("firstName")}
          />
        </Field>
        <Field name="lastName" label="Last Name" required error={fieldError("lastName")}>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={inputClass}
            placeholder="Santos"
            aria-invalid={ariaInvalid("lastName")}
            aria-describedby={ariaDescribedBy("lastName")}
          />
        </Field>
      </div>

      <Field name="email" label="Email" required error={fieldError("email")}>
        <input
          id="email"
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          className={inputClass}
          placeholder="you@example.com"
          aria-invalid={ariaInvalid("email")}
          aria-describedby={ariaDescribedBy("email")}
        />
      </Field>

      <Field name="mobile" label="Mobile" required error={fieldError("mobile")}>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          className={inputClass}
          placeholder="+63"
          aria-invalid={ariaInvalid("mobile")}
          aria-describedby={ariaDescribedBy("mobile")}
        />
      </Field>

      <Field name="interest" label="I'm interested in" required error={fieldError("interest")}>
        <select
          id="interest"
          name="interest"
          defaultValue={defaultInterest}
          className={inputClass}
          aria-invalid={ariaInvalid("interest")}
          aria-describedby={ariaDescribedBy("interest")}
        >
          {interestOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field name="message" label="Message" required error={fieldError("message")}>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={inputClass}
          placeholder="Sample computation, site visit, available units…"
          aria-invalid={ariaInvalid("message")}
          aria-describedby={ariaDescribedBy("message")}
        />
      </Field>

      <div ref={statusRef} aria-live="polite">
        {status.kind === "error" && (
          <p role="alert" className="text-label-md text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
            {status.message}
          </p>
        )}
        {status.kind === "success" && (
          <p role="status" className="text-label-md text-green-800 bg-green-50 border border-green-200 rounded px-3 py-2">
            Thanks — your inquiry was sent. I&apos;ll be in touch within one business day.
          </p>
        )}
      </div>

      <button
        type="submit"
        aria-disabled={isPending}
        aria-busy={isPending}
        className="cta-hover-glow w-full bg-primary text-white py-4 rounded-xl font-display font-semibold text-label-md shadow-md hover:bg-primary-container hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center gap-2 touch-manipulation aria-disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {isPending ? (
          <>
            <Spinner /> <span>Sending…</span>
          </>
        ) : (
          <>
            <span>Request Free Computation</span>
            <Icon name="arrow_forward" className="text-base" />
          </>
        )}
      </button>
      <p className="text-label-sm text-on-surface-variant text-center flex items-center justify-center gap-1.5">
        <Icon name="verified" className="text-base text-primary" />
        <span>Reply within one business day · Your details are used only to respond.</span>
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Field({
  name,
  label,
  required,
  error,
  children
}: {
  name: FieldName;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className={`${labelClass} flex items-center gap-1`}>
        <span>{label}</span>
        {required && (
          <span aria-hidden="true" className="text-primary">
            *
          </span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-label-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
