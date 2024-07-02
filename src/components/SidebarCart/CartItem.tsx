"use client";
import Link from "next/link";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
import { Fragment } from "react";
import type { TSidebarCartItem } from "@/types/types";
import styles from "@/styles/SidebarCart.module.scss";
import { AiOutlineTags } from "react-icons/ai";

export default function CartItem({
  product: { databaseId, image, name, price, slug },
  handleRemoveItem,
  couponApplied,
  couponAmount,
  couponCode,
}: TSidebarCartItem) {
  const couponPrice = price - couponAmount;

  return (
    <div data-testid="cart-item" className={styles.BBP__SidebarCart_product}>
      <div className={styles.BBP__SidebarCart_Image}>
        <Image src={image} width="71" height="71" alt="Cart items" />
      </div>
      <div className={styles.BBP__SidebarCart_right}>
        <h3>
          <Link href={`/product/${slug}`} style={{ color: "#333" }}>
            {name}
          </Link>

          {!couponApplied ? (
            <Fragment>
              <span className={styles.BBP__SidebarCart_price}>${price}</span>
            </Fragment>
          ) : (
            <Fragment>
              <span
                className={styles.BBP__SidebarCart_price}
                style={{ fontWeight: 100, textDecoration: "line-through" }}
              >
                ${price}
              </span>
              <span className={styles.BBP__SidebarCart_price}>
                ${couponPrice}
              </span>

              {couponApplied && (
                <Fragment>
                  <AiOutlineTags fontSize={18} />
                  <span
                    style={{ fontSize: "0.7rem" }}
                    className={styles.BBP__SidebarCart_Coupon_Text}
                  >
                    {couponCode} (-${couponAmount.toFixed(2)})
                  </span>
                </Fragment>
              )}
            </Fragment>
          )}
        </h3>

        <Button
          onClick={() => handleRemoveItem(databaseId)}
          variant="secondary"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
