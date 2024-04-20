import { Fragment, useContext } from "react";
import { CartContext, Product } from "@/context/CartContext";
import styles from "@/styles/SidebarCart.module.scss";
import Image from "next/image";
import cart__noItems from "@/public/images/cart__noItems.svg";
import CheckoutButton from "../Buttons/CheckoutButton";
import ContinueShoppingButton from "../Buttons/ContinueShoppingButton";
import CartItem from "./CartItem";
import { removeItemFromCart } from "@/util/index";
import { Alert } from "react-bootstrap";

import { TCartContext } from "@/context/CartContext";

export default function Cart({ handleCloseCart }) {
  const { cart, setCart } = useContext<TCartContext>(CartContext);

  const products = cart && Object.keys(cart).length ? cart.products : [];

  const totalProductsPrice =
    cart && Object.keys(cart).length ? cart.totalProductsPrice : 0;

  const couponApplied =
    undefined != cart?.coupon && Object.keys(cart).length
      ? cart.coupon.applied
      : "";

  const handleRemoveItem = (id: number) => {
    removeItemFromCart(id);
    let existingCart = JSON.parse(
      localStorage.getItem("bbp_product") as string
    );
    setCart(existingCart);
  };

  return (
    <Fragment>
      {products.length > 0 ? (
        <Fragment>
          <div className={styles.Checkout__wrapper}>
            <h3>
              You have{" "}
              {products.length > 1
                ? products.length + " items"
                : products.length + " item"}{" "}
              in your cart
            </h3>
            {couponApplied && (
              <Alert key="success" variant="success">
                A coupon was added to your order.
              </Alert>
            )}
            <div className={styles.Checkout__product_wrapper}>
              {products.map((product: Product) => (
                <CartItem
                  product={product}
                  price={product.price}
                  key={product.databaseId}
                  couponApplied={couponApplied}
                  handleRemoveItem={handleRemoveItem}
                  totalProductsPrice={totalProductsPrice}
                />
              ))}
            </div>
            <div className={styles.Checkout_btm}>
              <CheckoutButton handleCloseCart={handleCloseCart} />
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h3 className={styles.SidebarCart_empty}>
            Your shopping cart is empty
          </h3>

          <ContinueShoppingButton handleCloseCart={handleCloseCart} />
        </Fragment>
      )}
    </Fragment>
  );
}
