"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalButtonScriptProvider({ children }) {
  return (
    <PayPalScriptProvider
      options={{
        merchantId: "Q9DCN996UBRWG",
        clientId: "test",
        intent: "capture",
        currency: "USD",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
