import { Fragment, useState } from "react";
import styles from "@/styles/Checkout.module.scss";
import { TCartTotal } from "@/types/types";
import CartItemDisplaySalesTax from "./CartItemDisplaySalesTax";

export default function CartTotal({ totalProductsPrice }: TCartTotal) {
  const [priceWithSalesTax, setPriceWithSalesTax] = useState(0);

  return (
    <Fragment>
      <div className={styles.BBP_Checkout_Right_Bottom_Total__Container}>
        <div className={styles.BBP_Checkout_Right_Bottom_Inner}>
          <div className={styles.BBP_Checkout_Right_Bottom_Inner__Item}>
            <h4 style={{ fontWeight: 100, fontSize: "0.8rem" }}>Subtotal</h4>
            <span
              data-testid="product-subtotal"
              style={{ fontWeight: 100, fontSize: "0.8rem" }}
            >
              ${totalProductsPrice}
            </span>
          </div>
          <div className={styles.BBP_Checkout_Right_Bottom_Inner__Item}>
            <h4 style={{ fontWeight: 100, fontSize: "0.8rem" }}>
              Estimated Taxes
            </h4>
            <span
              data-testid="product-subtotal"
              style={{ fontWeight: 100, fontSize: "0.8rem" }}
            >
              <CartItemDisplaySalesTax
                price={totalProductsPrice}
                setPriceWithSalesTax={setPriceWithSalesTax}
              />
            </span>
          </div>
          <div className={styles.BBP_Checkout_Right_Bottom_Inner__Item}>
            <div className={styles.BBP_Checkout_Right_Bottom__Total}>
              <h4>Total</h4>
            </div>
            <div>
              <span data-testid="product-total">
                <span style={{ fontWeight: 100, fontSize: "0.8rem" }}>USD</span>{" "}
                ${priceWithSalesTax}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
