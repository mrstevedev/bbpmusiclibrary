import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { TProduct } from "@/types/types";
import styles from "@/styles/Checkout.module.scss";

export default function MobileCartItem({ products }) {
  return (
    <Fragment>
      {products
        ? products.map((product: TProduct) => (
            <div key={product["databaseId"]}>
              <div className={styles.Checkout__mobile_product}>
                <div className={`${styles.Checkout__mobile_product_img}`}>
                  <span className="cart-count-mobile">{product["qty"]}</span>
                  <Link href={`/product/${product["slug"]}`}>
                    <Image
                      src={product["image"]}
                      width="91"
                      height="91"
                      alt={product["name"]}
                    />
                  </Link>
                </div>
                <div className={styles.Checkout__mobile_product_name}>
                  <h3 className={styles.Checkout__right_product_name_txt}>
                    <Link href={`/product/${product["slug"]}`}>
                      {product.name}
                    </Link>
                    <span>${product["price"]}</span>
                  </h3>
                </div>
              </div>
            </div>
          ))
        : "There are no items in your cart"}
    </Fragment>
  );
}
