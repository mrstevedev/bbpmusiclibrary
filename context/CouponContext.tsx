import { useState, useEffect, createContext } from "react";

export type TCouponContext = {
  couponValue: string;
  setCouponValue: React.Dispatch<React.SetStateAction<string>>;
};

export const CouponContext = createContext<TCouponContext>({
  couponValue: "",
  setCouponValue: () => {},
});

type CouponProps = React.PropsWithChildren;

export const CouponProvider = ({ children }: CouponProps) => {
  const [couponValue, setCouponValue] = useState("");

  useEffect(() => {
    if (process.browser) {
      const cart = localStorage.getItem("bbp_product") as string;
      const parsed = JSON.parse(cart);
      if (parsed) {
        const coupon = parsed.coupon.code;
        setCouponValue(coupon);
      }
    }
  }, []);

  return (
    <CouponContext.Provider value={{ couponValue, setCouponValue }}>
      {children}
    </CouponContext.Provider>
  );
};
