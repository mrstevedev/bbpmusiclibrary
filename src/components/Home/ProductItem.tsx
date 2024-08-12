import { Fragment } from "react";
import Image from "react-bootstrap/Image";
import styles from "@/styles/Home.module.scss";
import { HomeProductItem } from "@/types/types";
import { Col } from "react-bootstrap";
import { useLocale } from "next-intl";
import CustomI18nLink from "../LangToggle/CustomI18nLink";

export default function ProductItem({ product, id }: HomeProductItem) {
  const locale = useLocale();
  const { databaseId, name, image, slug, salePrice, regularPrice } = product;
  return (
    <Col
      data-testid={`product-item-${id}`}
      key={databaseId}
      xs="12"
      sm="6"
      lg="4"
      xl="3"
    >
      <CustomI18nLink href={`/product/${slug}`} locale={locale} name={name}>
        <div className={`${styles.BBP_Home__Image}`}>
          <Image
            src={image.mediaItemUrl}
            width="400"
            height="400"
            loading="eager"
            className="product-img w-100 h-100"
            alt={`Bonita Basics Productions Music Library ${name}`}
          />
        </div>
      </CustomI18nLink>
      <div className={styles.BBP_Product__Bottom}>
        <CustomI18nLink href={`/product/${slug}`} locale={locale} name={name}>
          {name}
        </CustomI18nLink>
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
