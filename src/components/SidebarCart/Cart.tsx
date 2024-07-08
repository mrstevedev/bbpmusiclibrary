"use client";
import { Fragment } from "react";
import { TSidebarProduct } from "@/types/types";
import { removeItemFromCart } from "@/util/index";
import styles from "@/styles/SidebarCart.module.scss";
import CartItem from "@/components/SidebarCart/CartItem";
import CheckoutButton from "@/components/Buttons/CheckoutButtons";
import ContinueShoppingButton from "@/components/Buttons/ContinueShoppingButton";
import { PRODUCT, USER } from "@/constants/index";

export default function Cart({
  handleCloseCart,
  setCart,
  products,
  couponApplied,
  totalProductsPrice,
  couponAmount,
  couponCode,
}) {
  const handleRemoveItem = (id: number) => {
    removeItemFromCart(id);
    let existingCart = JSON.parse(
      localStorage.getItem(PRODUCT.BBP_PRODUCT) as string
    );
    setCart(existingCart);
  };

  return (
    <Fragment>
      {products.length > 0 ? (
        <Fragment>
          <div className={styles.BBP__SidebarCart_Wrapper}>
            <h3 data-testid="cart-count">
              You have{" "}
              {products.length > 1
                ? products.length + " items"
                : products.length + " item"}{" "}
              in your cart
            </h3>
            <div className={styles.BBP__SidebarCart_product_wrapper}>
              {products.map((product: TSidebarProduct) => {
                return (
                  <CartItem
                    product={product}
                    key={product.databaseId}
                    couponApplied={couponApplied}
                    handleRemoveItem={handleRemoveItem}
                    couponAmount={couponAmount}
                    couponCode={couponCode}
                  />
                );
              })}
            </div>
            <div>
              <div className={styles.BBP__SidebarCart_product_prices}>
                <h5 style={{ fontWeight: 100 }}>Subtotal</h5>
                <h5
                  data-testid="cart-subtotal"
                  style={{ fontWeight: 100, fontSize: "1rem" }}
                >
                  ${totalProductsPrice}
                </h5>
              </div>

              <div style={{ margin: "1rem 0" }}>
                <p style={{ fontWeight: 100 }}>
                  Taxes and shipping calculated at checkout
                </p>
              </div>

              <CheckoutButton handleCloseCart={handleCloseCart} />
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h3 className={styles.BBP__SidebarCart_empty}>
            Your shopping cart is empty
          </h3>

          <ContinueShoppingButton handleCloseCart={handleCloseCart} />
        </Fragment>
      )}
    </Fragment>
  );
}
