import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.scss";
import { TProduct } from "src/types/types";

export default function ProductItem({ product }: TProduct) {
  const { id, name, image, slug, salePrice, regularPrice } = product;
  return (
    <Fragment key={id}>
      <Link href={`/product/${slug}`} passHref>
        <div className={`${styles.Home__image} product-img`}>
          <Image
            key={id}
            src={image.mediaItemUrl}
            width="400"
            height="400"
            layout="responsive"
            loading="eager"
            alt={`Bonita Basics Productions Music Library, ${name}`}
          />
        </div>
      </Link>
      <div className={styles.productBtm}>
        <Link href={`/product/${slug}`} className="link">
          {name}
        </Link>
        <p>
          {salePrice ? (
            <Fragment>
              <span className={styles.product__regularPrice}>
                {regularPrice}{" "}
              </span>{" "}
              {salePrice}
              <span className={styles.product__salePrice}></span>
            </Fragment>
          ) : (
            regularPrice
          )}
        </p>
      </div>
    </Fragment>
  );
}
