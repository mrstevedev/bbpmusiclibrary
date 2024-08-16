"use client";
import axios, { AxiosError } from "axios";
import { useCallback, useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { delay, formatPhoneNumber } from "@/util/index";
import { CouponContext, TCouponContext } from "@/context/CouponContext";
import { ROUTE, METHOD, CART } from "@/constants/index";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButtonScriptProvider from "@/providers/PayPalScriptProvider";

export default function PayPalButtonCheckout({
  values,
  purchaseUnits,
  handleSubmit,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (
      success: string,
      successValue: string,
      email: string,
      emailValue: string,
      orderID: string,
      orderIDValue: string,
      transactionID: string,
      transactionIDValue: string
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(success, successValue);
      params.set(email, emailValue);
      params.set(orderID, orderIDValue);
      params.set(transactionID, transactionIDValue);

      return params.toString();
    },
    [searchParams]
  );

  console.log(values);
  const { coupon } = useContext<TCouponContext>(CouponContext);

  const handleCreateOrder = async () => {
    for (const val in values) {
      if (values[val] === "") {
        await delay(2000);
        handleSubmit();
        return;
      }
    }

    const orderUrl = process.env.NEXT_PUBLIC_API_URL + ROUTE.ORDER;

    const payload = JSON.stringify({
      purchase_units: purchaseUnits,
    });

    const orderResponse = await axios.post(orderUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });

    const data = await orderResponse.data;
    return data.id;
  };

  const handleOnAppove = async (data): Promise<void> => {
    const captureUrl = process.env.NEXT_PUBLIC_API_URL + ROUTE.CAPTURE;
    const productIds = purchaseUnits.map((data) => data.reference_id);

    const payload = JSON.stringify({
      id: data.orderID,
      productIds,
      coupon: coupon?.isApplied ? coupon.code : null,
    });

    try {
      await axios.post(captureUrl, payload, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <PayPalButtonScriptProvider>
      <PayPalButtons
        fundingSource="paypal"
        style={{ height: 55, color: "blue", layout: "horizontal" }}
        createOrder={handleCreateOrder}
        onApprove={handleOnAppove}
      />
    </PayPalButtonScriptProvider>
  );
}
