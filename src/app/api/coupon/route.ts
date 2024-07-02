import { TCoupon } from "@/types/types";
import axios from "axios";
import { NextResponse } from "next/server";
import { generateJSONWebToken } from "@/util/generateJWTToken";
import { COUPON_INVALID, COUPON_USED } from "@/constants/index";

export async function POST(request: Request, response: Response) {
  const res = await request.json();
  const userId = res.userId;
  const coupon = res.coupon;

  if (!userId || !coupon) {
    return NextResponse.json({
      error: "Missing a userId or coupon in request",
    });
  }

  const coupons_url = `${process.env.COUPONS_URL}`;
  const response_coupons = await axios.get(coupons_url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + (await generateJSONWebToken()),
    },
  });

  const filteredCoupons = response_coupons.data.filter(
    (data) => data.code === coupon.toLowerCase()
  );

  const isInvalid = filteredCoupons.length <= 0;

  if (isInvalid) {
    return NextResponse.json({ message: COUPON_INVALID }, { status: 403 });
  }

  const isCouponUsed = response_coupons.data.some(
    (data: { used_by: string[]; code: string }) => {
      return (
        data.used_by.includes(userId.toString()) &&
        data.code === coupon.toLowerCase()
      );
    }
  );

  if (isCouponUsed) {
    return NextResponse.json({ message: COUPON_USED }, { status: 401 });
  }

  const filtered = response_coupons.data.filter(
    (data: TCoupon) => data.code === coupon.toLowerCase()
  );

  return NextResponse.json(
    { coupon: filtered },
    { status: response_coupons.status }
  );
}
