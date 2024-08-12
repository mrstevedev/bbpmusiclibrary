"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId:
    "AUO_v6th3x2ZiCyv7XRw3eMpd5u7W-51NE04Z6LCiNPd4E-k58dw_rTcCekgND-zdgTmfuQaKpGx6O_X",
  currency: "USD",
  intent: "capture",
};

export default function PayPalButtonScriptProvider({ children }) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
}
