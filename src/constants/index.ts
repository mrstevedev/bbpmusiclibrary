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

export enum PERMISSION {
  GRANTED = "granted",
  DENIED = "denied",
}

export enum NOTIFICATION {
  INFO = "This browser does not support desktop notifications",
}

export enum TOKEN {
  ERROR = "An error occurred while fetching the token",
}

export enum INTENT {
  CAPTURE = "CAPTURE",
}

export enum SHIPPING {
  NO_SHIPPING = "NO_SHIPPING",
}

export enum PREFERENCE {
  IMMEDIATE_PAYMENT_REQUIRED = "IMMEDIATE_PAYMENT_REQUIRED",
}

export enum ACTION {
  PAY_NOW = "PAY_NOW",
}

export enum BRAND {
  BBP_MUSIC_LIBRARY = "BBP_MUSIC_LIBRARY",
}

/**
 * URL MATCHER
 */

export enum MATCH {
  MATCH_URL = "(product|login|account|about|frequently-asked-questions|contact|checkout|forgot|confirm)",
}

/**
 * API ROUTES
 */

export enum ROUTE {
  RESET = "/reset",
  ORDER = "/order",
  LOGIN = "/login",
  LOGOUT = "/logout",
  RESEND = "/resend",
  CREATE = "/create",
  INTENT = "/intent",
  UPDATE = "/update",
  COUPON = "/coupon",
  REQUEST = "/request",
  CAPTURE = "/capture",
  CONTACT = "/contact",
  ACCOUNT = "/account",
  CHECKOUT = "/checkout",
  SUBSCRIBE = "/subscribe",
  UNSUBSCRIBE = "/unsubscribe",
}

/**
 * TRANSLATIONS
 */

export enum TRANSLATE {
  TRNASLATE_COUPON_NOTIFICATION = "CouponNotification",
  TRNASLATE_PRODUCT_TERMS = "ProductSingleTermsOfUse",
  TRNASLATE_PRODUCT_DESCRIPTION = "ProductSingleDescription",
}

/**
 * EXISTING PRODUCT MESSAGE
 */
export enum MESSAGE {
  MESSAGE_PRODUCT_IN_CART = "There is aready an item in your cart that conflicts with this product. Remove it first",
  MESSAGE_PRODUCT_ADDED = "Added item to cart",
}

/**
 * STATUS
 * 1. Newsletter
 * 2. Orders
 */

export enum STATUS {
  STATUS_CONFIRMED = "confirmed",
  STATUS_UNSUBSCRIBED = "unsubscribed",
  STATUS_COMPLETED = "COMPLETED",
  STATUS_PROCESSING = "PROCESSING",
}

export enum TYPE_PRODUCT {
  TYPE_SIMPLE = "SimpleProduct",
  TYPE_VARIABLE = "VariableProduct",
}

/**
 * PAYMENT METHODS
 */

export enum METHOD {
  METHOD_PAYPAL = "PayPal",
  METHOD_GOOGLEPAY = "GooglePay",
  METHOD_STRIPE = "Stripe",
}

/**
 * PRODUCT TYPE
 */

export enum TYPE {
  ID_TYPE = "SLUG",
}

/**
 * CURRENCY
 */

export enum CURRENCY {
  CURRENCY_CODE = "USD",
}

/**
 * DATE
 */

export enum DATE {
  DATE_FORMAT = "LLLL do, y",
}

/**
 * CARD
 */

export enum CARD {
  CREDIT_CARD = "Credit card",
}

/**
 * TRANSFER
 */

export enum TRANSFER {
  TRANSFER_GROUP = "ORDERBBP",
  TRANSFER_RECIPIENT_TYPE = "EMAIL",
  TRANSFER_DESTINATION = "acct_1PMeilP3cpIn7gPp",
}

/**
 * PURCHASE
 */

export enum PURCHASE {
  CANNOT_PURCHASE = "You cannot purchase this item again",
}

/**
 * PAYOUT
 */

export enum PAYOUT {
  PAYPAL_PAYOUT_ACCOUNT = "sb-gia54331046335@business.example.com",
}

/**
 * COUPON
 */

export enum COUPON {
  COUPON_USED = "Coupon has already been used",
  COUPON_INVALID = "Coupon provided is invalid",
  COUPON_NOT_PROVIDED = "No coupon was provided",
  COUPON_USED_DESCRIPTION = "You currently have no deals available. Keep checking back for new deals",
}

/**
 * PASSWORD
 */

export enum PASSWORD {
  PASSWORD_NOT_MATCH = "Passwords do not match",
}

/**
 * USER
 */
export enum USER {
  BBP_USER = "bbp_user",
}

/**
 * PRODUCT
 */

export enum PRODUCT {
  BBP_PRODUCT = "bbp_product",
}

/**
 * SESSION
 */

export enum SESSION {
  SESSION_BBP = "bbp_session",
  SESSION_EXPIRED = "Your session has expired.",
  SESSION_EXPIRED_EMAIL = "Your session has expired. Another email has been sent to create your password.",
}

/**
 * CART
 */

export enum CART {
  CART_USER_CART = "cart",
  CART_ITEM_REMOVED = "Item removed from your cart",
  CART_INVALID_MAX_ITEMS = "PayPal requires 10 items or less in your cart",
}

/**
 * DOWNLOAD
 */

export enum DOWNLOAD {
  REQUEST_DOWNLOAD_FAILED = "Your request to send a download failed. Please try again later",
}

/**
 * EMAIL
 */

export enum EMAIL {
  CHECK_EMAIL = "Check your email",
}

/**
 * COVER IMAGE
 */

export enum IMAGE {
  IMAGE_LOGO = "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/06/logo.png",
  IMAGE_SP1200 = "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/06/img1200.webp",
  IMAGE_SILHOUETTE = "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/07/bbpmusiclib_silhouette.webp",
}

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
