"use client";
import React, { useState, useMemo, useContext } from "react";

import styles from "@/styles/Checkout.module.scss";
import { useStates } from "react-us-states";

import { CartContext, TCartContext } from "@/context/CartContext";

import { Button } from "react-bootstrap";
import { TProduct } from "@/types/types";
import MobileCartItem from "./MobileCartItem";
export default function MobileCart({ price }) {
  const { cart } = useContext<TCartContext>(CartContext);
  const products = cart && Object.keys(cart).length ? cart.products : [];

  const [toggle, setToggle] = useState(false);

  const handleToggleOrderSummary = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div className={styles.Checkout__mobile_top}>
      <aside role="complementary">
        <Button
          onClick={handleToggleOrderSummary}
          className={`${styles["order__summary_toggle"]}`}
          aria-expanded="false"
          aria-controls="order-summary"
          data-drawer-toggle="[data-order-summary]"
          aria-hidden="false"
          variant="light"
        >
          <span className={styles.wrap}>
            <span className={styles.order__summary__toggle__inner}>
              <span className="order-summary-toggle__icon-wrapper">
                <svg
                  width="20"
                  height="19"
                  xmlns="http://www.w3.org/2000/svg"
                  className="order-summary-toggle__icon"
                >
                  <path d="M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z"></path>
                </svg>
              </span>
              {/* order-summary-toggle__text order-summary-toggle__text--show */}
              <span className={styles.order__summary__toggle__text}>
                <span className={styles.order__summary__toggle__text__inner}>
                  Show order summary
                </span>
                <svg
                  width="11"
                  height="6"
                  xmlns="http://www.w3.org/2000/svg"
                  className="order-summary-toggle__dropdown"
                  fill="#000"
                >
                  <path d="M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z"></path>
                </svg>
              </span>
              <span
                className={`${styles["order__summary__toggle__text"]} ${styles["Checkout__order__summary__toggle__text__hide"]}`}
              >
                <span className={styles.order__summary__toggle__text__inner}>
                  Hide order summary
                </span>
                <svg
                  width="11"
                  height="7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="order-summary-toggle__dropdown"
                  fill="#000"
                >
                  <path d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
                </svg>
              </span>
              <dl
                className="order-summary-toggle__total-recap total-recap"
                data-order-summary-section="toggle-total-recap"
              >
                <dt className="visually-hidden">
                  <span>Sale price</span>
                </dt>
                <dd>
                  <span
                    className="order-summary__emphasis total-recap__final-price skeleton-while-loading"
                    data-checkout-payment-due-target="2999"
                  >
                    ${price}
                  </span>
                </dd>
              </dl>
            </span>
          </span>
        </Button>
      </aside>
      <aside
        className={`${styles.Checkout__mobile_product_dropdown} dropdown ${
          toggle ? styles.Checkout__mobile_product_dropdown_show : ""
        }`}
        role="complementary"
      >
        <MobileCartItem products={products} />
      </aside>
    </div>
  );
}
