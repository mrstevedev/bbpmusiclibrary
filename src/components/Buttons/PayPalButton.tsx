import Router from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { PayPalButton } from "react-paypal-button-v2";

import { CouponContext, TCouponContext } from "src/context/CouponContext";

export default function PayPalBtn({
  price,
  productName,
  formatPhoneNumber,
  databaseId,
}) {
  const { coupon } = useContext<TCouponContext>(CouponContext);
  return (
    <PayPalButton
      style={{
        height: 55,
      }}
      options={{
        // merchantId: "H3E758JAU25R6",
        clientId: "sb",
        currency: "USD",
        disableFunding: "venmo,card,credit,ideal,sofort",
      }}
      createOrder={(data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              description: productName,
              amount: {
                currency_code: "USD",
                value: price,
              },
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING",
          },
        });
      }}
      onSuccess={async (details: any) => {
        const email = details.payer.email_address;
        const address_line_1 = details.payer.address.address_line_1;
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
        const price = details.purchase_units[0].amount.value;
        const data = JSON.stringify({
          id: id,
          email: email,
          admin_area_1: admin_area_1,
          admin_area_2: admin_area_2,
          postal_code: postal_code,
          country_code: country_code,
          address_line_1: address_line_1,
          phone: phone,
          name: first_name + " " + last_name,
          product_name: product_name,
          price: price,
          databaseId: databaseId,
          payment_method: "Paypal",
          coupon: coupon?.isApplied ? coupon.code : null,
        });

        try {
          const create_customer_response = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + "/create",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (create_customer_response.data) {
            Router.push({
              pathname: "/confirm",
              query: `${`success=true&email=${email}&transaction_id=${id}`}`,
            });
          }
        } catch (err) {
          const error = err as Error | AxiosError;
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
          }
        }
      }}
      onError={(err: unknown) => {
        if (err instanceof Error) {
          console.log("err:", err.message);
        }
      }}
    />
  );
}
