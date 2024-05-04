import styles from "@/styles/Checkout.module.scss";
import { ExpressCart } from "src/types/types";
import { formatPhoneNumber } from "util/index";

import PayPalButton from "src/components/Buttons/PayPalButton";
import GooglePayButton from "src/components/Buttons/GooglePayButton";

export default function ExpressCheckout({
  price,
  databaseId,
  productName,
}: ExpressCart) {
  return (
    <div className={styles.Checkout__express}>
      <h5 className={styles.Checkout__express_header}>
        <span
          style={{
            background: "#fff",
            padding: "0 0.5rem",
          }}
        >
          Express Checkout
        </span>
      </h5>
      <PayPalButton
        price={price}
        productName={productName}
        formatPhoneNumber={formatPhoneNumber}
        databaseId={databaseId}
      />

      <GooglePayButton
        price={price}
        productName={productName}
        databaseId={databaseId}
      />
    </div>
  );
}
