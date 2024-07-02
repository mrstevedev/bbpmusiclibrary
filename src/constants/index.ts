export const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const COUPON_USED = "Coupon has already been used";
export const COUPON_INVALID = "Coupon provided is invalid";
export const COUPON_NOT_PROVIDED = "No coupon was provided";
export const EMAIL_NOT_PROVIDED = "No email was provided";
export const PASSWORD_NOT_MATCH = "Passwords do not match";

export const SESSION_EXPIRED =
  "Your session has expired. Another email has been sent to create your password.";
export const ITEM_REMOVED_FROM_CART = "Item removed from your cart";

export const LOGIN = "/login";
export const LOGOUT = "/logout";
export const RESET = "/reset";
export const RESEND = "/resend";
export const UPDATE = "/update";
export const COUPON = "/coupon";
export const REQUEST = "/request";
export const CONTACT = "/contact";
export const CREATE = "/create";
export const INTENT = "/intent";
export const SUBSCRIBE = "subscribe";
export const UNSUBSCRIBE = "unsubscribe";

export const USER = "bbp_user";

export const STATUS_CONFIRMED = "confirmed";
export const STATUS_UNSUBSCRIBED = "unsubscribed";
export const STATUS_COMPLETED = "COMPLETED";
export const STATUS_PROCESSING = "PROCESSING";
export const CANNOT_PURCHASE = "You cannot purchase this item again";

export const DATE_FORMAT = "LLLL do, y";
export const ID_TYPE = "SLUG";

export const CURRENCY_CODE = "USD";

export const REQUEST_DOWNLOAD_FAILED =
  "Your request to send a download failed. Please try again later";

export const CHECK_EMAIL = "Check your email";

export const COUPON_USED_DESCRIPTION =
  "You currently have no deals available. Keep checking back for new deals";

export const CREDIT_CARD = "Credit card";
export const METHOD_PAYPAL = "PayPal";
export const METHOD_GOOGLEPAY = "GooglePay";
export const METHOD_STRIPE = "Stripe";
export const INVALID_MAX_ITEMS =
  "PayPal requires 10 items or less in your cart";

export const TRANSFER_DESTINATION = "acct_1PMeilP3cpIn7gPp";
export const TRANSFER_GROUP = "ORDERBBP";
export const RECIPIENT_TYPE = "EMAIL";

export const PAYPAL_PAYOUT_ACCOUNT = "sb-gia54331046335@business.example.com";

export const FORM_ISSUES_OPTIONS = [
  {
    label: "Unable to download file after initial purchase",
    value: "Unable to download file after initial purchase",
  },
  {
    label: "Never received purchased file",
    value: "Never received purchased file",
  },
  {
    label: "Request new download link not sent to my email",
    value: "Request new download link not sent to my email",
  },
  {
    label: "Unable to request a new download link",
    value: "Unable to request a new download link",
  },
];
