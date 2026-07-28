import { Loader2 } from "lucide-react";
import ContactInput from "./ContactInput";
import ContactSelect from "./ContactSelect";
import { ContactFormErrors, ContactFormState } from "../_types/contact.types";

const contactMethodOptions = [
  { textKey: "Choose one", value: "" },
  { textKey: "Email", value: "email" },
  { textKey: "Phone", value: "phone" },
  { textKey: "Text", value: "text" },
];

const inquiryTypeOptions = [
  { textKey: "Choose one", value: "" },
  { textKey: "Buying", value: "buying" },
  { textKey: "Selling", value: "selling" },
  { textKey: "Renting", value: "renting" },
  { textKey: "General question", value: "general" },
];

type ContactFormProps = {
  fields: ContactFormState;
  errors: ContactFormErrors;
  isLoading: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ContactForm({
  fields,
  errors,
  isLoading,
  onChange,
  onSubmit,
}: ContactFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="relative mt-6">
      {/* Paired fields: the column is wide enough that a single stack of
          seven inputs reads as much longer than the form actually is. */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
        <ContactInput
          label="Name"
          name="name"
          type="text"
          value={fields.name}
          onChange={onChange}
          error={errors.name}
          required
          autoComplete="name"
        />
        <ContactInput
          label="Email"
          name="email"
          type="email"
          value={fields.email}
          onChange={onChange}
          error={errors.email}
          required
          autoComplete="email"
        />
        <ContactInput
          label="Phone number"
          name="phone"
          type="tel"
          value={fields.phone}
          onChange={onChange}
          error={errors.phone}
          autoComplete="tel"
        />
        <ContactSelect
          label="Preferred contact method"
          name="contactMethod"
          value={fields.contactMethod}
          onChange={onChange}
          options={contactMethodOptions}
          error={errors.contactMethod}
          required
        />
        <ContactSelect
          label="Inquiry type"
          name="inquiryType"
          value={fields.inquiryType}
          onChange={onChange}
          options={inquiryTypeOptions}
          error={errors.inquiryType}
          required
        />
        <ContactInput
          label="Best time to contact"
          name="contactTime"
          type="text"
          value={fields.contactTime}
          onChange={onChange}
          error={errors.contactTime}
        />

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="message"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground"
          >
            Message
            <span aria-hidden="true" className="ml-1 text-rule">
              *
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={fields.message}
            onChange={onChange}
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="w-full resize-y border-b-2 border-border bg-transparent px-0 py-2 text-sm text-foreground transition-colors duration-200 focus:border-rule focus:outline-none"
          />
          {errors.message && (
            <p id="message-error" role="alert" className="text-xs text-danger">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — hidden from humans. Positioned against the form,
          which is why the form carries `relative`. */}
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute left-[-9999px] opacity-0"
      />

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="inline-flex min-h-12 w-full items-center justify-center border border-rule bg-rule px-12 text-xs font-bold uppercase tracking-[0.16em] text-on-rule transition-[background-color,border-color,color,transform] duration-200 ease-out hover:border-foreground hover:bg-foreground hover:text-background focus-visible:border-foreground focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.99] disabled:cursor-not-allowed disabled:border-border disabled:bg-border disabled:text-subtle-foreground disabled:hover:border-border disabled:hover:bg-border motion-reduce:active:scale-100 sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2
                aria-hidden="true"
                className="mr-2 h-4 w-4 animate-spin"
              />
              <span>Sending&hellip;</span>
            </>
          ) : (
            "Submit"
          )}
        </button>

        <p className="text-xs text-subtle-foreground">
          <span aria-hidden="true" className="text-rule">
            *
          </span>{" "}
          Required fields
        </p>
      </div>
    </form>
  );
}
