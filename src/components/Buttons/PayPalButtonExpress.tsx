"use client";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import { CouponContext, TCouponContext } from "@/context/CouponContext";
import { CART, ROUTE, METHOD } from "@/constants/index";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { generatePayPalAccessToken } from "@/util/generatePayPalAccessToken";

const initialOptions = {
  clientId:
    "AUO_v6th3x2ZiCyv7XRw3eMpd5u7W-51NE04Z6LCiNPd4E-k58dw_rTcCekgND-zdgTmfuQaKpGx6O_X",
  currency: "USD",
  intent: "capture",
};

export default function PayPalButtonExpress({
  purchaseUnits,
  formatPhoneNumber,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (
      success: string,
      successValue: string,
      email: string,
      emailValue: string,
      orderID: string,
      orderIDValue: string
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(success, successValue);
      params.set(email, emailValue);
      params.set(orderID, orderIDValue);

      return params.toString();
    },
    [searchParams]
  );

  const { coupon } = useContext<TCouponContext>(CouponContext);

  const orderURL = "https://api-m.sandbox.paypal.com/v2/checkout/orders";

  const handleCreateOrder = async () => {
    const response = await fetch(orderURL, {
      method: "POST",
      headers: {
        //!!TODO Add Authorization Header
        "Content-Type": "application/json",
        Authorization: "Bearer" + (await generatePayPalAccessToken()),
      },
      body: JSON.stringify({
        purchaseUnits,
      }),
    });
    const data = await response.json();
    console.log("data:", data);
    return data;
  };

  const handleOnAppove = async () => {};

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        fundingSource="paypal"
        style={{ height: 55, layout: "horizontal" }}
        createOrder={handleCreateOrder}
      />
    </PayPalScriptProvider>
  );
}
