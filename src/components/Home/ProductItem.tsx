import { Fragment } from "react";
import Link from "next/link";
import Image from "react-bootstrap/Image";
import styles from "@/styles/Home.module.scss";
import { HomeProductItem } from "@/types/types";
import { Col } from "react-bootstrap";

export default function ProductItem({ product, id }: HomeProductItem) {
  const { databaseId, name, image, slug, salePrice, regularPrice } = product;
  return (
    <Col
      data-testid={`product-item-${id}`}
      key={databaseId}
      xs="12"
      sm="5"
      lg="4"
      xl="3"
    >
      <Link href={`/product/${slug}`} passHref>
        <div className={`${styles.BBP_Home__Image} product-img`}>
          <Image
            src={image.mediaItemUrl}
            width="400"
            height="400"
            loading="eager"
            className="w-100 h-100"
            alt={`Bonita Basics Productions Music Library ${name}`}
          />
        </div>
      </Link>
      <div className={styles.BBP_Product__Bottom}>
        <Link href={`/product/${slug}`} className="link">
          {name}
        </Link>
        <p>
          {salePrice ? (
            <Fragment>
              <span className={styles.BBP_Product__RegularPrice}>
                {regularPrice}{" "}
              </span>{" "}
              {salePrice}
              <span className={styles.BBP_Product__SalePrice}></span>
            </Fragment>
          ) : (
            regularPrice
          )}
        </p>
      </div>
    </Col>
  );
}
