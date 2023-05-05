//don't need generic messages for auth since using Google

export const MESSAGES = {
  GOOGLE_OP_NOT_ENABLED: "Email/password accounts are not enabled.",
  GOOGLE_OP_NOT_SUPPORTED: "HTTP protocol is not supported. Please use HTTPS.",
  GOOGLE_POPUP_BLOCKED:
    "Popup has been blocked by the browser. Please allow popups for this website.",
  GOOGLE_POPUP_CLOSED: "Popup closed. Please try again to continue.",
  GOOGLE_LOGIN_ERROR:
    "Google login error. Please try again later. If the issue persists, please contact the admin.",
  GOOGLE_LOGOUT_ERROR:
    "Error logging you out. Please attempt browser troubleshooting: https://kb.iu.edu/d/ahic",
  SUCCESS_LOGIN: "Login successful",
  SUCCESS_LOGOUT: "Logout successful.",
  SUCCESS_CREATE_SHOW: "Show Added.",
  ERROR_CREATE_SHOW: "Error adding show.",
  SUCCESS_UPDATE_SHOW: "Show updated.",
  ERROR_UPDATE_SHOW: "Error updating show.",
  SUCCESS_DELETE_SHOW: "Show deleted.",
  ERROR_DELETE_SHOW: "Error deleting show.",
  INFO_CANCEL_DELETE_SHOW: "Delete show cancelled",
  SUCCESS_FETCH_SHOWS: "Fetched all shows",
  ERROR_FETCH_SHOWS: "Error fetching shows",
  SUCCESS_FETCH_SHOW_BY_ID: "Fetched show",
  ERROR_FETCH_SHOW_BY_ID: "Error fetching show",
  ERROR_VALIDATION_FAILED: "Unable to submit. See errors below.",
};

export const VALIDATION_MESSAGES = {
  valueMissing: {
    title: "Please enter a title",
    startYear: "Please enter a start year",
    character: "Please enter a character or remove it.",
  },
  patternMismatch: {
    startYear: "Please enter a year after 1927 in the yyyy format.",
    endYear: "Please enter a year after 1927 in the yyyy format.",
  },
  rangeUnderflow: {
    endYear: "End Year must be equal to or after Start Year.",
  },
};
