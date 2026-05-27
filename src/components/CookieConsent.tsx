"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

const STORAGE_KEY = "avida-by-abigail.consent";

type Categories = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

type Stored = {
  version: 1;
  decidedAt: string;
  categories: Categories;
};

function loadConsent(): Stored | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (parsed?.version === 1 && parsed.categories) return parsed;
    return null;
  } catch {
    return null;
  }
}

function saveConsent(categories: Categories): boolean {
  if (typeof window === "undefined") return false;
  try {
    const payload: Stored = { version: 1, decidedAt: new Date().toISOString(), categories };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<Categories>({ essential: true, analytics: true, marketing: true });
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!loadConsent()) setVisible(true);
  }, []);

  // Move focus to the default action when the banner first appears (keeps keyboard users
  // out of the dead zone before the banner buttons).
  useEffect(() => {
    if (visible && !showPrefs) {
      acceptRef.current?.focus();
    }
  }, [visible, showPrefs]);

  if (!visible) return null;

  const finish = (categories: Categories) => {
    saveConsent(categories);
    setVisible(false);
  };

  return (
    <aside
      role="region"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-body"
      className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-md z-40 px-3 pb-3 sm:px-0 sm:pb-0 pointer-events-none"
    >
      <div className="mx-auto sm:mx-0 pointer-events-auto bg-white rounded-xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Icon name="cookie" />
            </span>
            <div className="flex-1 min-w-0">
              <h2 id="cookie-title" className="font-display font-semibold text-on-surface text-body-lg">
                Privacy Settings
              </h2>
              <p id="cookie-body" className="text-body-md text-on-surface-variant mt-1">
                This site uses cookies to provide our services and improve them over time. You may revoke or change
                your consent at any time.{" "}
                <a
                  href="#privacy"
                  className="text-primary hover:underline whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                >
                  Privacy Notice
                </a>
                .
              </p>
            </div>
          </div>

          {showPrefs && (
            <fieldset className="mt-5 space-y-3 border-t border-outline-variant/40 pt-4">
              <legend className="sr-only">Cookie categories</legend>
              <PrefRow label="Essential" description="Required for the site to function. Always on." checked disabled />
              <PrefRow
                label="Analytics"
                description="Helps us understand traffic and improve the experience."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <PrefRow
                label="Marketing"
                description="Used to show relevant property offers and remarketing."
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </fieldset>
          )}

          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
            {showPrefs ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowPrefs(false)}
                  className="text-label-md font-display font-semibold text-on-surface-variant hover:text-primary px-4 py-3 sm:py-2 transition-colors min-h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => finish(prefs)}
                  className="bg-primary text-white px-5 py-3 sm:py-2 rounded-lg font-display font-semibold text-label-md hover:bg-primary-container transition-all min-h-11 touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Save Preferences
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowPrefs(true)}
                  className="text-label-md font-display font-semibold text-on-surface-variant hover:text-primary px-4 py-3 sm:py-2 transition-colors text-left sm:text-center min-h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                >
                  Manage Preferences
                </button>
                <button
                  type="button"
                  onClick={() => finish({ essential: true, analytics: false, marketing: false })}
                  className="border-2 border-primary text-primary px-5 py-3 sm:py-2 rounded-lg font-display font-semibold text-label-md hover:bg-primary/5 transition-all min-h-11 touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Reject Non-Essential
                </button>
                <button
                  ref={acceptRef}
                  type="button"
                  onClick={() => finish({ essential: true, analytics: true, marketing: true })}
                  className="bg-primary text-white px-5 py-3 sm:py-2 rounded-lg font-display font-semibold text-label-md hover:bg-primary-container transition-all min-h-11 touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Accept All
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

function PrefRow({
  label,
  description,
  checked,
  disabled,
  onChange
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const id = `cookie-${label.toLowerCase()}`;
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary disabled:opacity-60"
      />
      <label htmlFor={id} className="flex-1 cursor-pointer">
        <span className="block font-display font-semibold text-on-surface text-label-md">{label}</span>
        <span className="block text-body-md text-on-surface-variant">{description}</span>
      </label>
    </div>
  );
}
