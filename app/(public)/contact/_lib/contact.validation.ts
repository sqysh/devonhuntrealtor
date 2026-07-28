import { ContactFormErrors, ContactFormState } from "../_types/contact.types";

export function validate(fields: ContactFormState): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!fields.name.trim()) errors.name = "Name is required.";

  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!fields.contactMethod) errors.contactMethod = "Select a contact method.";
  if (!fields.inquiryType) errors.inquiryType = "Select an inquiry type.";
  if (!fields.message.trim()) errors.message = "Message is required.";

  return errors;
}
