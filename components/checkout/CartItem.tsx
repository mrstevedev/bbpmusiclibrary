import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { TCheckoutSidebarCartItem } from "@/types/types";
import { removeItemFromCart } from "@/util/index";
import styles from "@/styles/Checkout.module.scss";
import { CartContext, TCartContext } from "@/context/CartContext";

export default function CartItem({
  product: { databaseId, slug, image, name, qty, price },
}: TCheckoutSidebarCartItem) {
  const { setCart } = useContext<TCartContext>(CartContext);

  const handleRemoveItem = (id: number) => {
    removeItemFromCart(id);
    const existingCart = JSON.parse(
      localStorage.getItem("bbp_product") as string
    );
    setCart(existingCart);
  };
  return (
    <div key={databaseId} className={styles.Checkout__right_product}>
      <div className={`product-img ${styles.Checkout__right_product_img}`}>
        <Link href={`/product/${slug}`}>
          <a>
            <span className={styles.cart__count}>{qty}</span>
            <Image src={image} width="91" height="91" alt={name} />
          </a>
        </Link>
      </div>
      <div className={styles.Checkout__right_product_name}>
        <h3 className={styles.Checkout__right_product_name_txt}>
          <Link href={`/product/${slug}`}>{name}</Link>
          <p>
            <a
              style={{ color: "#ababab", cursor: "pointer" }}
              onClick={() => handleRemoveItem(databaseId)}
            >
              Remove
            </a>
          </p>
        </h3>
      </div>
      <span>${price}</span>
    </div>
  );
}
