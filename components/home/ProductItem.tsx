import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.scss";

interface IProduct {
  product: {
    node: {
      id: string;
      name: string;
      price: string;
      slug: string;
      image: {
        mediaItemUrl: string;
      };
      salePrice: string;
      regularPrice: string;
    };
  };
}

export default function ProductItem({
  product: {
    node: { id, name, slug, image: img, salePrice, regularPrice },
  },
}: IProduct) {
  return (
    <Fragment key={id}>
      <Link href={`/product/${slug}`} passHref>
        <div className={`${styles.Home__image} product-img`}>
          <Image
            key={id}
            src={img.mediaItemUrl}
            width="400"
            height="400"
            loading="eager"
            alt={`Bonita Basics Productions Music Library, ${name}`}
          />
        </div>
      </Link>
      <div className={styles.productBtm}>
        <Link href={`/product/${slug}`}>
          <a className="link">{name}</a>
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
