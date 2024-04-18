import axios from "axios";

const coupons = async (req: any, res: any) => {
  const userId = req.body.userId;
  const username = process.env.CREATE_USER_USERNAME;
  const password = process.env.CREATE_USER_PASSWORD;

  const payload = JSON.stringify({ username, password });

  const generate_jwt = `${process.env.AUTH_USER_URL}`;
  const response_generate_jwt = await axios.post(generate_jwt, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const token = response_generate_jwt.data.token;

  const coupons_url = `${process.env.COUPONS_URL}`;

  const response_coupons = await axios.get(coupons_url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + token,
    },
  });

  const isCouponUsed = response_coupons.data.some(
    (data: { used_by: string | any[]; code: any }) => {
      return (
        data.used_by.includes(userId.toString()) &&
        data.code === req.body.coupon.toLowerCase()
      );
    }
  );

  console.log("response_coupons.data:", response_coupons.data);
  // console.log("isCouponUsed:", isCouponUsed);

  if (isCouponUsed) {
    return res.status(401).json({
      message: "Coupon has already been used",
    });
  }

  const filtered = response_coupons.data.filter((coupon: { code: string }) => {
    return coupon.code === req.body.coupon;
  });

  return res.status(response_generate_jwt.status).json({
    coupon: filtered,
  });
};

module.exports = { coupons };
