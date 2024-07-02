import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CREATE } from "@/constants/index";
import { useCallback, useContext } from "react";
import GooglePayButton from "@google-pay/button-react";
import { CouponContext, TCouponContext } from "@/context/CouponContext";
import { useRouter, useSearchParams } from "next/navigation";
import { calculatePriceWithTax } from "@/util/index";

export default function GooglePayButtonExpress({
  price,
  databaseId,
  purchaseUnits,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (
      success: string,
      successValue: string,
      email: string,
      emailValue: string,
      orderId: string,
      orderIdValue: string
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(success, successValue);
      params.set(email, emailValue);
      params.set(orderId, orderIdValue);

      return params.toString();
    },
    [searchParams]
  );

  const { coupon } = useContext<TCouponContext>(CouponContext);

  return (
    <GooglePayButton
      environment="TEST"
      buttonSizeMode="fill"
      buttonType="buy"
      style={{
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
          totalPrice: calculatePriceWithTax(price),
          currencyCode: "USD",
          countryCode: "US",
        },
        shippingAddressRequired: true,
        callbackIntents: ["PAYMENT_AUTHORIZATION"],
        emailRequired: true,
      }}
      onLoadPaymentData={async (paymentRequest) => {
        console.log("load payment data", paymentRequest);
      }}
      onPaymentAuthorized={async (paymentData) => {
        console.log("Payment Authorized Success", paymentData);
        const email = paymentData["email"] as string;

        const data = JSON.stringify({
          email: email,
          databaseId: databaseId,
          payment_method: "Google Pay",
          postal_code: paymentData["shippingAddress"]?.postalCode,
          country_code: paymentData["shippingAddress"]?.countryCode,
          name: paymentData["shippingAddress"]?.name,
          address: paymentData["shippingAddress"]?.address1,
          city: paymentData["shippingAddress"]?.locality,
          state: paymentData["shippingAddress"]?.administrativeArea,
          phone: paymentData["shippingAddress"]?.phoneNumber,
          purchaseUnits: purchaseUnits,
          coupon: coupon?.isApplied ? coupon.code : null,
        });

        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + CREATE,
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
        } catch (err: unknown) {
          const error = err as Error | AxiosError;
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
          }
        }
        return { transactionState: "SUCCESS" };
      }}
    />
  );
}
