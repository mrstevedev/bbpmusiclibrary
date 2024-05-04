import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/SidebarCart.module.scss";
import { Button } from "react-bootstrap";

import type { TProductItem } from "../../types/types";

export default function CartItem({
  product: { slug, image, name, databaseId },
  price,
  handleRemoveItem,
  couponApplied,
  totalProductsPrice,
}: TProductItem) {
  return (
    <div className={styles.Checkout__product}>
      <div className={styles.Checkout_topImg}>
        <Image src={image} width="71" height="71" alt="Cart items" priority />
      </div>
      <div className={styles.Checkout__right}>
        <h3>
          <Link href={`/product/${slug}`} style={{ color: "#333" }}>
            {name}
          </Link>

          {!couponApplied ? (
            <span className={styles.Checkout__right_price}>${price}</span>
          ) : (
            <span className={styles.Checkout__right_price}>
              ${totalProductsPrice}
            </span>
          )}
        </h3>

        <Button
          onClick={() => handleRemoveItem(databaseId)}
          className={styles.SidebarCart__OffCanvas_button}
          variant="secondary"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
