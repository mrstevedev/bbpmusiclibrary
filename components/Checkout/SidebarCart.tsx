import { useContext, useState, Fragment } from "react";
import styles from "@/styles/Checkout.module.scss";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import Coupon from "./Coupon/Coupon";
import { addCouponToCart, throttle } from "@/util/index";

import { AxiosError } from "axios";
import AlertNotificationCart from "../Alert/AlertNotificationCart";
import { toast } from "react-toastify";
import { COUPON_INVALID, COUPON_NOT_PROVIDED } from "@/util/constants";

import { CartContext, TCartContext } from "@/context/CartContext";
import { AuthContext, TAuthContext } from "@/context/AuthContext";
import { CouponContext, TCouponContext } from "@/context/CouponContext";

import { TCoupon, TProduct, TSidebarCheckoutProps } from "@/types/types";
import { getAvailableCoupons } from "@/services/Api";

export default function SidebarCart({
  coupon,
  products,
  productsCount,
}: TSidebarCheckoutProps) {
  const { auth } = useContext<TAuthContext>(AuthContext);
  const { cart, setCart } = useContext<TCartContext>(CartContext);
  const { couponValue, setCouponValue } =
    useContext<TCouponContext>(CouponContext);

  const [_, setAmount] = useState<null | number>(null);
  const [isTokenValid, setIsTokenValid] = useState<null | boolean>(null);

  let totalProductsPrice =
    null != cart && Object.keys(cart).length ? cart.totalProductsPrice : 0;

  let coupon_applied =
    null != cart && Object.keys(cart).length ? cart.coupon?.applied : undefined;

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

      if (response_coupon.data.coupon.length <= 0) {
        toast.error(COUPON_INVALID);
      }

      return response_coupon.data.map((data: TCoupon) => {
        if (data.code !== couponValue.toLocaleLowerCase()) {
          setAmount(null);
          setIsTokenValid(false);
        }
        setAmount(parseInt(data.amount));
        setCouponValue(data.code);
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
        <div className={styles.Checkout__right_top}>
          {coupon ? (
            coupon.length > 0 ? (
              <AlertNotificationCart data={coupon} />
            ) : null
          ) : null}
        </div>
        <div className={styles.Checkout__right_btm}>
          {products
            ? products.map((product: TProduct) => (
                <CartItem
                  key={product.databaseId}
                  product={product}
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
              isTokenValid={isTokenValid}
              handleApplyCoupon={handleApplyCoupon}
            />
          </div>
        ) : null}
      </div>
    </Fragment>
  );
}
