"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const ElementsProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
