import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/SidebarCart.module.scss";
import { Button } from "react-bootstrap";

type TProductItem = {
  product: {
    databaseId: number;
    image: string;
    name: string;
    price: number;
    qty: number;
    slug: string;
  };
  price: number;
  handleRemoveItem: (id: number) => void;
  couponApplied?: string | boolean;
  totalProductsPrice: number;
};

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
        <Image src={image} width="81" height="81" alt="Cart items" />
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
