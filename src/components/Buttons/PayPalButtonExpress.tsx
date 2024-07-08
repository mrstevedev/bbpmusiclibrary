"use client";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { PayPalButton } from "react-paypal-button-v2";
import { CouponContext, TCouponContext } from "@/context/CouponContext";
import { CART } from "@/constants/index";
import { ROUTE, METHOD } from "@/constants/index";

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
  const style = { height: 55 };
  return (
    <PayPalButton
      style={style}
      options={{
        // Live merchantId
        // merchantId: "IDRP5GEJ9Q6B4NG"
        merchantId: "SVNDVQ7UVZEBE",
        // Live Credentials for REST API
        // clientId: "AcKBIn299K6i0Q4_bOV1JgxcSphc475Kr-yk3Oon45JP_NuzUi_b364xkOq7icivXgr4tbH2O-urvdvk"
        // secret: EI-gxMRCYQqfGFPAGZUrKowjnAK9c-vigewSTCK8cgZV_9kg6NuT9rSOSiRXgCA9BfWJ9McjB0VOZNvh
        clientId: "sb",
        currency: "USD",
        disableFunding: "venmo,card,credit,ideal,sofort,sepa,giropay",
      }}
      createOrder={(data: any, actions: any) => {
        return actions.order.create({
          purchase_units: purchaseUnits,
          application_context: {
            shipping_preference: "NO_SHIPPING",
          },
        });
      }}
      onSuccess={async (details: any) => {
        const email = details.payer.email_address;
        const address = details.payer.address.address_line_1;
        const admin_area_1 = details.payer.address.admin_area_1;
        const admin_area_2 = details.payer.address.admin_area_2;
        const postal_code = details.payer.address.postal_code;
        const country_code = details.payer.address.country_code;
        const phone = formatPhoneNumber(
          details.payer.phone.phone_number.national_number
        );
        const id = details.id;
        const first_name = details.payer.name.given_name;
        const last_name = details.payer.name.surname;
        const product_name = details.purchase_units[0].description;
        const purchase_units = details.purchase_units;

        console.log("details:", details);

        const data = JSON.stringify({
          id: id,
          email: email,
          phone: phone,
          payment_method: METHOD.METHOD_PAYPAL,
          admin_area_1: admin_area_1,
          admin_area_2: admin_area_2,
          postal_code: postal_code,
          country_code: country_code,
          product_name: product_name,
          purchaseUnits: purchase_units,
          address: address,
          name: first_name + " " + last_name,
          coupon: coupon?.isApplied ? coupon.code : null,
        });

        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + ROUTE.CREATE,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data) {
            router.push(
              "/confirm" +
                "?" +
                createQueryString(
                  "success",
                  "true",
                  "email",
                  email,
                  "orderID",
                  response.data.orderId
                )
            );
          }
        } catch (err) {
          const error = err as Error | AxiosError;
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
          }
        }
      }}
      onError={(error: unknown) => {
        if (error instanceof Error) {
          if (purchaseUnits.length > 10) {
            toast.error(CART.CART_INVALID_MAX_ITEMS);
          }
        }
      }}
    />
  );
}
