"use client";
import { useContext, useState, Fragment, useEffect } from "react";
import styles from "@/styles/Checkout.module.scss";
import CartItem from "@/components/Checkout/Cart/CartItem";
import CartTotal from "@/components/Checkout/Cart/CartTotal";
import Coupon from "@/components/Checkout/Cart/Coupon/Coupon";
import { addCouponToCart, throttle } from "@/util/index";

import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { COUPON, PRODUCT } from "@/constants/index";

import { CartContext, TCartContext } from "@/context/CartContext";
import { AuthContext, TAuthContext } from "@/context/AuthContext";
import { CouponContext, TCouponContext } from "@/context/CouponContext";

import { Product, TCart, TCoupon } from "@/types/types";
import { getAvailableCoupons } from "@/services/Api";

export default function Cart({
  products,
  productsCount,
  totalProductsPrice,
  couponApplied,
}: TCart) {
  const { auth } = useContext<TAuthContext>(AuthContext);
  const { cart, setCart } = useContext<TCartContext>(CartContext);
  const { setCoupon } = useContext<TCouponContext>(CouponContext);

  const [_, setAmount] = useState<null | number>(null);
  // const [isTokenValid, setIsTokenValid] = useState<null | boolean>(null);
  const [couponValue, setCouponValue] = useState<string>("");

  const couponPrice = cart ? Number(cart.coupon?.amount) : 0;
  const couponCode = cart ? cart.coupon?.code : "";

  useEffect(() => {
    const parsed = JSON.parse(
      localStorage.getItem(PRODUCT.BBP_PRODUCT) as string
    );
    if (parsed) setCouponValue(parsed.coupon.code);
  }, []);

  const handleApplyCoupon = throttle(async () => {
    if (couponValue.length <= 0) {
      toast.warn(COUPON.COUPON_NOT_PROVIDED);
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
          // setIsTokenValid(false);
        }
        setAmount(parseInt(data.amount));
        setCouponValue(data.code);
        setCoupon({
          code: data.code,
          description: data.description,
          isApplied: true,
          isUsed: false,
        });
        // setIsTokenValid(true);
        const existingCart = localStorage.getItem(PRODUCT.BBP_PRODUCT);
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
      <div className={styles.BBP_Checkout__right}>
        <div className={styles.BBP_Checkout_right__top}></div>
        <div className={styles.BBP_Checkout_right__bottom}>
          {products.map((product: Product) => {
            return (
              <CartItem
                key={product.databaseId}
                product={product}
                products={products}
                productsCount={productsCount}
                couponApplied={couponApplied}
                couponPrice={couponPrice}
                couponCode={couponCode}
                setCart={setCart}
              />
            );
          })}
        </div>
        <CartTotal
          totalProductsPrice={totalProductsPrice}
          couponApplied={couponApplied}
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
              couponApplied={couponApplied}
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
