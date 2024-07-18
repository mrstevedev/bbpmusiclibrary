import React from "react";
import { Button } from "react-bootstrap";
import { ROUTE } from "@/constants/index";
import Link from "next/link";
import styles from "@/styles/SingleItemBuyNowButton.module.scss";

export default function SingleItemBuyNowButton({
  item,
  cart,
  handleAddSingleItemTrackToCart,
}) {
  const isMatched = cart?.products?.some(
    (data) => data.databaseId === item.databaseId
  );

  return (
    <>
      {isMatched ? (
        <>
          <Link href={ROUTE.CHECKOUT}>
            <Button
              variant="sm"
              className={styles.SingleItemBuyNowButtonSelected}
            >
              In checkout
            </Button>
          </Link>
        </>
      ) : (
        <Button
          variant="sm"
          className={styles.SingleItemBuyNowButton}
          onClick={() => handleAddSingleItemTrackToCart(item)}
        >
          Buy
        </Button>
      )}
    </>
  );
}
