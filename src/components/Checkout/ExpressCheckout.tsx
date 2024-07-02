import styles from "@/styles/Checkout.module.scss";
import { ExpressCart } from "@/types/types";
import { formatPhoneNumber } from "@/util/index";

import PayPalButtonExpress from "@/components/Buttons/PayPalButtonExpress";
import GooglePayButtonExpress from "@/components/Buttons/GooglePayButtonExpress";

export default function ExpressCheckout({
  price,
  databaseId,
  purchaseUnits,
}: ExpressCart) {
  return (
    <div className={styles.Checkout__express}>
      <h5 className={styles.Checkout__express_header}>
        <span style={{ background: "#fff", padding: "0 0.5rem" }}>
          Express Checkout
        </span>
      </h5>
      <PayPalButtonExpress
        purchaseUnits={purchaseUnits}
        formatPhoneNumber={formatPhoneNumber}
      />
      <GooglePayButtonExpress
        price={price}
        databaseId={databaseId}
        purchaseUnits={purchaseUnits}
      />
    </div>
  );
}
