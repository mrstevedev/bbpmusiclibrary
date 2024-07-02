"use client";
import Link from "next/link";
import Image from "react-bootstrap/Image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Fragment, useContext } from "react";
import { TCheckoutSidebarCartItem } from "@/types/types";
import { removeItemFromCart } from "@/util/index";
import styles from "@/styles/Checkout.module.scss";
import { ITEM_REMOVED_FROM_CART } from "@/constants/index";

import { AiOutlineTags } from "react-icons/ai";

export default function CartItem({
  product,
  products,
  couponApplied,
  couponPrice,
  couponCode,
  setCart,
}: TCheckoutSidebarCartItem) {
  const router = useRouter();

  const { databaseId, name, slug, price, qty, image } = product;

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
    <div
      data-testid="product-item"
      key={databaseId}
      className={styles.BBP_Checkout_Right__Product}
    >
      <div className={`product-img ${styles.BBP_Checkout_Right_Product_Image}`}>
        <Link href={`/product/${slug}`}>
          <span className={styles.BBP_Cart__Count}>{qty}</span>
          <Image src={image} width="65" height="65" alt={name} />
        </Link>
      </div>
      <div className={styles.BBP_Checkout_Right_Product_Name}>
        <h3 className={styles.BBP_Checkout_Right_Product_Name__Text}>
          <Link data-testid="product-name" href={`/product/${slug}`}>
            {name}
          </Link>
          <p>
            <a
              style={{ color: "#ababab", cursor: "pointer" }}
              onClick={() => handleRemoveItem(databaseId)}
            >
              Remove
            </a>
          </p>
        </h3>
        {couponApplied && (
          <Fragment>
            <AiOutlineTags fontSize={18} />
            <span
              data-testid="product-coupon"
              className={styles.BBP_Checkout_Coupon__Text}
            >
              {couponCode} (-${couponPrice.toFixed(2)})
            </span>
          </Fragment>
        )}
      </div>
      <div style={{ display: "grid", fontWeight: 100, fontSize: "0.9rem" }}>
        {couponApplied ? (
          <Fragment>
            <span className={styles.BBP_Checkout_Right_Regular__Price}>
              ${price.toFixed(2)}
            </span>
            <span data-testid="product-price">${price - couponPrice}</span>
          </Fragment>
        ) : (
          <span data-testid="product-price">${price.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
}
