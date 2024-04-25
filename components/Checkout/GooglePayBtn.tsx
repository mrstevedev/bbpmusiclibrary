import { useContext } from "react";
import Router from "next/router";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import GooglePayButton from "@google-pay/button-react";

import { CouponContext, TCouponContext } from "@/context/CouponContext";

export default function GooglePayBtn({ price, databaseId, productName }) {
  const { couponValue } = useContext<TCouponContext>(CouponContext);

  return (
    <GooglePayButton
      environment="TEST"
      buttonSizeMode="fill"
      buttonType="buy"
      style={{
        width: "100%",
        height: 54,
        display: "block",
      }}
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "example",
                gatewayMerchantId: "exampleGatewayMerchantId",
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: "12345678901234567890",
          merchantName: "Demo Merchant",
        },
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPriceLabel: "Total",
          totalPrice: price.toString(),
          currencyCode: "USD",
          countryCode: "US",
        },
        shippingAddressRequired: true,
        callbackIntents: ["PAYMENT_AUTHORIZATION"],
        emailRequired: true,
      }}
      onLoadPaymentData={(paymentRequest) => {
        console.log("load payment data", paymentRequest);
      }}
      onPaymentAuthorized={(paymentData) => {
        console.log("Payment Authorized Success", paymentData);
        const email = paymentData["email"];

        console.log("paymentData::::::", paymentData["shippingAddress"]);

        const data = JSON.stringify({
          email: email,
          postal_code: paymentData["shippingAddress"]?.postalCode,
          country_code: paymentData["shippingAddress"]?.countryCode,
          name: paymentData["shippingAddress"]?.name,
          address: paymentData["shippingAddress"]?.address1,
          city: paymentData["shippingAddress"]?.locality,
          state: paymentData["shippingAddress"]?.administrativeArea,
          phone: paymentData["shippingAddress"]?.phoneNumber,
          price: price,
          databaseId: databaseId,
          product_name: productName,
          payment_method: "Google Pay",
          coupon: couponValue ? couponValue : null,
        });

        axios
          .post(process.env.NEXT_PUBLIC_REMOTE_URL + "/create", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res) {
              Router.push({
                pathname: "/confirm",
                query: `${`success=true&email=${email}&transaction_id=${"id"}`}`,
              });
            }
          })
          .catch((err) => {
            const error = err as Error | AxiosError;
            if (axios.isAxiosError(error)) {
              toast.error(error.response?.data.message);
            }
          });
        return { transactionState: "SUCCESS" };
      }}
    />
  );
}
