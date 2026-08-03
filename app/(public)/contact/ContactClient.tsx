"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import Acknowledgements from "../(home)/_components/Acknowledgements";
import ContactForm from "./_components/ContactForm";
import { ContactFormState } from "./_types/contact.types";
import { reducer } from "./_lib/contact.reducer";
import { validate } from "./_lib/contact.validation";
import { createContact } from "@/lib/actions/public/contact/createContact";

const INITIAL_FIELDS: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  contactMethod: "",
  inquiryType: "",
  message: "",
  contactTime: "",
  website: "",
};

const PHONE_DISPLAY = "+1 (978) 818 5303";
const PHONE_HREF = "tel:+19788185303";
const EMAIL = "devon@thepropernest.com";
const ADDRESS = "257 Washington St #3, Marblehead, MA 01945";
const MAPS_HREF = `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`;

const directLink =
  "inline-flex min-h-11 min-w-0 items-center gap-3 rounded-control text-sm font-semibold text-foreground transition-colors duration-200 hover:text-primary-accessible focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export default function ContactClient({ formToken }: { formToken: string }) {
  const successRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, {
    fields: INITIAL_FIELDS,
    errors: {},
    isLoading: false,
    success: false,
  });

  // Swapping the form out for a confirmation is a silent change to anyone
  // not watching the screen — move focus so it gets announced.
  useEffect(() => {
    if (state.success) successRef.current?.focus();
  }, [state.success]);

  const onChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      dispatch({
        type: "SET_FIELD",
        name: e.target.name as keyof ContactFormState,
        value: e.target.value,
      });
    },
    [],
  );

  const onSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      const errors = validate(state.fields);
      if (Object.keys(errors).length > 0) {
        dispatch({ type: "SET_ERRORS", errors });
        // Move focus to the first error so keyboard and screen reader
        // users don't have to hunt for what went wrong.
        const firstError = Object.keys(errors)[0];
        document.getElementById(firstError)?.focus();
        return;
      }

      dispatch({ type: "SUBMIT_START" });

      const result = await createContact({ ...state.fields, formToken });

      if (result.ok) {
        dispatch({ type: "SUBMIT_SUCCESS" });
      } else {
        dispatch({ type: "SUBMIT_ERROR", errors: { message: result.error } });
      }
    },
    [formToken, state.fields],
  );

  return (
    <div className="bg-background">
      <header className="shell pb-12 pt-20 md:pb-16 md:pt-28 lg:pt-36">
        <p className="flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Get in touch
          <span aria-hidden="true" className="h-px w-14 bg-rule" />
        </p>

        <h1 className="mt-7 text-[clamp(2.75rem,9vw,6rem)] font-medium uppercase leading-[0.88] tracking-tight text-foreground">
          Contact
        </h1>

        <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
          Helping you get more for your real estate.
        </p>
      </header>

      {state.success ? (
        <>
          <section
            aria-labelledby="success-heading"
            className="shell border-t border-border py-16 md:py-24"
          >
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="border-l-2 border-rule py-2 pl-6 outline-none md:pl-8"
            >
              <h2
                id="success-heading"
                className="text-[clamp(1.75rem,4vw,3rem)] font-medium uppercase leading-tight tracking-tight text-foreground"
              >
                Message received
              </h2>
              <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-muted-foreground">
                Thank you for reaching out. I read every message myself and aim
                to respond within one business day. If it&rsquo;s time
                sensitive, calling is the fastest way to reach me.
              </p>

              <ul className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-10">
                <li>
                  <a href={PHONE_HREF} className={directLink}>
                    <Phone
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-rule"
                    />
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="min-w-0">
                  <a href={`mailto:${EMAIL}`} className={directLink}>
                    <Mail
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-rule"
                    />
                    <span className="truncate">{EMAIL}</span>
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <Acknowledgements />
        </>
      ) : (
        <div className="shell grid grid-cols-1 gap-y-12 border-t border-border pb-20 pt-12 md:pb-28 lg:grid-cols-12 lg:gap-x-16 lg:pt-16">
          {/* Direct routes, for anyone who would rather not use a form */}
          <aside className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-subtle-foreground">
              Reach me directly
            </h2>

            <ul className="mt-6 border-b border-border">
              <li className="border-t border-border py-3">
                <a href={PHONE_HREF} className={directLink}>
                  <Phone
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-rule"
                  />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="min-w-0 border-t border-border py-3">
                <a href={`mailto:${EMAIL}`} className={directLink}>
                  <Mail
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-rule"
                  />
                  <span className="truncate">{EMAIL}</span>
                </a>
              </li>
              <li className="border-t border-border py-3">
                <a
                  href={MAPS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={directLink}
                >
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 self-start text-rule"
                  />
                  <span>{ADDRESS}</span>
                </a>
              </li>
            </ul>

            <p className="mt-8 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              I read every message myself and aim to respond within one business
              day.
            </p>
          </aside>

          <div className="lg:col-span-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-subtle-foreground">
              Send a message
            </h2>

            <ContactForm
              fields={state.fields}
              errors={state.errors}
              isLoading={state.isLoading}
              onChange={onChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
