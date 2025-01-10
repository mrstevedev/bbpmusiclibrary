import { NextResponse } from "next/server";
import { BRAND, INTENT, PREFERENCE, ACTION } from "@/constants/index";
import { generatePayPalAccessToken } from "@/util/generatePayPalAccessToken";
import axios from "axios";

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const purchaseUnits = body.purchase_units;

  /**
   * CREATE ORDER
   */

  const payload = JSON.stringify({
    intent: INTENT.CAPTURE,
    purchase_units: purchaseUnits,
    payment_source: {
      paypal: {
        experience_context: {
          payment_method_preference: PREFERENCE.IMMEDIATE_PAYMENT_REQUIRED,
          brand_name: BRAND.BBP_MUSIC_LIBRARY,
          shipping_preference: "GET_FROM_FILE",
          user_action: ACTION.PAY_NOW,
          return_url: process.env.ORIGIN_URL + "/confirm",
          cancel_url: process.env.ORIGIN_URL + "/cancelUrl",
        },
      },
    },
  });

  const token = await generatePayPalAccessToken();
  const orderURL = "https://api-m.sandbox.paypal.com/v2/checkout/orders";
  const res = await axios.post(orderURL, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const data = await res.data;
  console.log(data);

  return NextResponse.json({ id: data.id });
}
