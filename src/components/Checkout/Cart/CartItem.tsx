"use client";
import Link from "next/link";
import Image from "react-bootstrap/Image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { TCheckoutSidebarCartItem } from "@/types/types";
import { removeItemFromCart } from "@/util/index";
import styles from "@/styles/Checkout.module.scss";
import { CART, PRODUCT } from "@/constants/index";

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
      localStorage.getItem(PRODUCT.BBP_PRODUCT) as string
    );
    if (products.length <= 1) {
      setTimeout(() => {
        toast.success(CART.CART_ITEM_REMOVED);
        setCart(existingCart);
      }, 400);
      router.push("/");
      return;
    }
    setCart(existingCart);
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
              style={{
                color: "rgb(227 26 26)",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.7rem",
              }}
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
