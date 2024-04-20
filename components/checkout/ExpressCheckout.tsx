import styles from "@/styles/Checkout.module.scss";
import { formatPhoneNumber } from "@/util/index";

import PayPalBtn from "./PayPalButton";
import GooglePayBtn from "./GooglePayBtn";

type TProps = {
  price: number;
  databaseId: number;
  productName: string;
  coupon: {
    id: number;
  };
};

export default function ExpressCheckout({
  price,
  databaseId,
  productName,
}: TProps) {
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

      <PayPalBtn
        price={price}
        productName={productName}
        formatPhoneNumber={formatPhoneNumber}
        databaseId={databaseId}
      />

      <GooglePayBtn
        price={price}
        productName={productName}
        databaseId={databaseId}
      />
    </div>
  );
}
