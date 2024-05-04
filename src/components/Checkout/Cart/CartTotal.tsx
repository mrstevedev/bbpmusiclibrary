import { Fragment } from "react";
import styles from "@/styles/Checkout.module.scss";
import { TCartTotal } from "src/types/types";

export default function CartTotal({
  totalProductsPrice,
  couponApplied,
}: TCartTotal) {
  return (
    <Fragment>
      <div className={styles.Checkout__right_btm_total_container}>
        <div className={styles.Checkout__right_btm_total}>
          <h4>Total</h4>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {couponApplied && (
            <span className="badge text-bg-success">Coupon applied </span>
          )}
          <span
            className="Checkout_currency__ticker"
            style={{ margin: "0 0.4rem" }}
          >
            ${totalProductsPrice} USD
          </span>
        </div>
      </div>
    </Fragment>
  );
}
