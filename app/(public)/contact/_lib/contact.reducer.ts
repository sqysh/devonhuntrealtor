import { Action, PageState } from "../_types/contact.types";

export const reducer = (state: PageState, action: Action): PageState => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        fields: { ...state.fields, [action.name]: action.value },
        errors: { ...state.errors, [action.name]: undefined },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SUBMIT_START":
      return { ...state, isLoading: true, errors: {} };
    case "SUBMIT_SUCCESS":
      return { ...state, isLoading: false, success: true };
    case "SUBMIT_ERROR":
      return {
        ...state,
        isLoading: false,
        errors: action.errors ?? {},
      };
    default:
      return state;
  }
};
