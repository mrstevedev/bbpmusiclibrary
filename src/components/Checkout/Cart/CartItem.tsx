"use client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { TCheckoutSidebarCartItem } from "@/types/types";
import { removeItemFromCart } from "util/index";
import styles from "@/styles/Checkout.module.scss";
import { CartContext, TCartContext } from "src/context/CartContext";
import { ITEM_REMOVED_FROM_CART } from "src/constants";

export default function CartItem({
  product,
  products,
}: TCheckoutSidebarCartItem) {
  const router = useRouter();
  const { setCart } = useContext<TCartContext>(CartContext);

  const handleRemoveItem = (id: number) => {
    removeItemFromCart(id);
    const existingCart = JSON.parse(
      localStorage.getItem("bbp_product") as string
    );
    setCart(existingCart);
    toast.success(ITEM_REMOVED_FROM_CART);
    if (products.length <= 1) {
      router.push("/");
    }
  };

  return (
    <div key={product.databaseId} className={styles.Checkout__right_product}>
      <div className={`product-img ${styles.Checkout__right_product_img}`}>
        <Link href={`/product/${product.slug}`}>
          <span className={styles.cart__count}>{product.qty}</span>
          <Image
            src={product.image}
            width="71"
            height="71"
            alt={product.name}
          />
        </Link>
      </div>
      <div className={styles.Checkout__right_product_name}>
        <h3 className={styles.Checkout__right_product_name_txt}>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
          <p>
            <a
              style={{ color: "#ababab", cursor: "pointer" }}
              onClick={() => handleRemoveItem(product.databaseId)}
            >
              Remove
            </a>
          </p>
        </h3>
      </div>
      <span>${product.price}</span>
    </div>
  );
}
