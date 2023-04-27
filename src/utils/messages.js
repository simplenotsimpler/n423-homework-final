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
  SUCCESS_CREATE_POST: "Post Added.",
  ERROR_CREATE_POST: "Error adding post.",
  SUCCESS_UPDATE_POST: "Post updated.",
  ERROR_UPDATE_POST: "Error updating post.",
  SUCCESS_DELETE_POST: "Post deleted.",
  ERROR_DELETE_POST: "Error deleting post.",
  SUCCESS_FETCH_POSTS: "Fetched all posts",
  ERROR_FETCH_POSTS: "Error fetching posts",
  SUCCESS_FETCH_POST_BY_ID: "Fetched post",
  ERROR_FETCH_POST_BY_ID: "Error fetching post",
};
