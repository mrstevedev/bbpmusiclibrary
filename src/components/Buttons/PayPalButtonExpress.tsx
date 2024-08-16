"use client";
import { toast } from "react-toastify";
import { useCallback, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { CouponContext, TCouponContext } from "@/context/CouponContext";
import { ROUTE } from "@/constants/index";
import { PayPalButtons } from "@paypal/react-paypal-js";
import PayPalButtonScriptProvider from "@/providers/PayPalScriptProvider";
import axios, { AxiosError } from "axios";

type Order = {
  id: string;
  links: [
    {
      href: string;
      method: string;
      rel: string;
    }
  ];
  purchase_units: PURCHASE_UNITS[];
  payer: {
    address: {
      country_code: string;
      email_address: string;
      name: {
        given_name: string;
        surname: string;
        payer_id: string;
      };
    };
    email_address: string;
    name: { given_name: string; surname: string };
  };
  status: string;
};

type PURCHASE_UNITS = {
  reference_id: string;
  amount: {
    currency_code: string;
  };
  payee: {};
  description: string;
  shipping: {
    address: {
      address_line_1: string;
      admin_area_2: string;
      admin_area_1: string;
      postal_code: string;
      country_code: string;
    };
  };
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

  const handleCreateOrder = async () => {
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
      const res = await axios.post(captureUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
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
        style={{ height: 55, layout: "horizontal" }}
        createOrder={handleCreateOrder}
        onApprove={handleOnAppove}
      />
    </PayPalButtonScriptProvider>
  );
}
