export type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  inquiryType: string;
  message: string;
  contactTime: string;
  website: string; // honeypot
};

export type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

export type PageState = {
  fields: ContactFormState;
  errors: ContactFormErrors;
  isLoading: boolean;
  success: boolean;
};

export type Action =
  | { type: "SET_FIELD"; name: keyof ContactFormState; value: string }
  | { type: "SET_ERRORS"; errors: ContactFormErrors }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; errors?: ContactFormErrors };
