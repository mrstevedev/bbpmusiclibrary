"use client";
import { useState, useEffect, createContext } from "react";
import { USER } from "@/constants/index";

export type Coupon = {
  code?: string;
  description: string;
  isApplied?: boolean;
  isUsed: boolean;
};

export type TCouponContext = {
  coupon: Coupon | null;
  setCoupon: React.Dispatch<React.SetStateAction<Coupon | null>>;
};

export const CouponContext = createContext<TCouponContext>(
  {} as TCouponContext
);

type CouponProps = React.PropsWithChildren;

export const CouponProvider = ({ children }: CouponProps) => {
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    if (typeof window) {
      const cart = localStorage.getItem(USER.BBP_USER) as string;
      const parsed = JSON.parse(cart);
      if (parsed) {
        console.log("parsed:", parsed);
        const coupon = parsed.coupon;
        setCoupon({
          code: coupon.code,
          description: coupon.description,
          isApplied: false,
          isUsed: false,
        });
      }
    }
  }, []);

  return (
    <CouponContext.Provider value={{ coupon, setCoupon }}>
      {children}
    </CouponContext.Provider>
  );
};
