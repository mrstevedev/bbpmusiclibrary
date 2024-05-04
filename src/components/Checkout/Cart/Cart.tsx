"use client";
import { useContext, useState, Fragment, useEffect } from "react";
import styles from "@/styles/Checkout.module.scss";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import Coupon from "src/components/Checkout/Cart/Coupon/Coupon";
import { addCouponToCart, throttle } from "util/index";

import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { COUPON_NOT_PROVIDED } from "util/constants";

import { CartContext, TCartContext } from "src/context/CartContext";
import { AuthContext, TAuthContext } from "src/context/AuthContext";
import { CouponContext, TCouponContext } from "src/context/CouponContext";

import { TCoupon, TProduct, TSidebarCheckoutProps } from "@/types/types";
import { getAvailableCoupons } from "@/services/Api";

export default function SidebarCart({
  products,
  productsCount,
}: TSidebarCheckoutProps) {
  const { auth } = useContext<TAuthContext>(AuthContext);
  const { cart, setCart } = useContext<TCartContext>(CartContext);

  const { coupon, setCoupon } = useContext<TCouponContext>(CouponContext);
  const [_, setAmount] = useState<null | number>(null);
  const [isTokenValid, setIsTokenValid] = useState<null | boolean>(null);
  const [couponValue, setCouponValue] = useState<string>("");

  let totalProductsPrice =
    null != cart && Object.keys(cart).length ? cart.totalProductsPrice : 0;

  let coupon_applied =
    null != cart && Object.keys(cart).length ? cart.coupon?.applied : undefined;

  useEffect(() => {
    const parsed = JSON.parse(localStorage.getItem("bbp_product") as string);
    setCouponValue(parsed.coupon.code);
  }, []);

  const handleApplyCoupon = throttle(async () => {
    if (couponValue.length <= 0) {
      toast.warn(COUPON_NOT_PROVIDED);
      return;
    }
    try {
      const response_coupon = await getAvailableCoupons(
        auth.userId,
        couponValue
      );

      return response_coupon.data.coupon.forEach((data: TCoupon) => {
        if (data.code !== couponValue.toLocaleLowerCase()) {
          setAmount(null);
          setIsTokenValid(false);
        }
        setAmount(parseInt(data.amount));
        setCouponValue(data.code);
        setCoupon({
          code: data.code,
          description: data.description,
          isApplied: true,
        });
        setIsTokenValid(true);
        const existingCart = localStorage.getItem("bbp_product");
        const updateCart = addCouponToCart(
          existingCart,
          data.code,
          Number(data.amount)
        );
        setCart(updateCart);
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }, 6000);

  return (
    <Fragment>
      <div className={styles.Checkout__right}>
        <div className={styles.Checkout__right_top}></div>
        <div className={styles.Checkout__right_btm}>
          {products
            ? products.map((product: TProduct) => (
                <CartItem
                  key={product.databaseId}
                  product={product}
                  products={products}
                  productsCount={productsCount}
                  totalProductsPrice={totalProductsPrice}
                />
              ))
            : "There are no items in your cart"}
        </div>
        <CartTotal
          totalProductsPrice={totalProductsPrice}
          couponApplied={coupon_applied}
        />
        {auth ? (
          <div
            className="mt-5 px-5"
            style={{
              background: "#f8f8f8",
              padding: "3rem",
              boxShadow: "4px 1px 1px #e1e1e1",
            }}
          >
            <Coupon
              couponApplied={coupon_applied}
              handleApplyCoupon={handleApplyCoupon}
              couponValue={couponValue}
              setCouponValue={setCouponValue}
            />
          </div>
        ) : null}
      </div>
    </Fragment>
  );
}
