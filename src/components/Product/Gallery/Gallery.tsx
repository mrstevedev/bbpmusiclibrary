"use client";
import { Image } from "react-bootstrap";
import { Fragment } from "react";
import styles from "@/styles/Product.module.scss";

export default function Gallery({ product, gallery, handleCloseImageGallery }) {
  const { name } = product;
  const { mediaItemUrl } = product.image;

  return (
    <Fragment>
      {gallery ? (
        <div
          className={`${styles.imageGallery}`}
          onClick={handleCloseImageGallery}
        >
          <div className={styles.imageGalleryTopBar}>
            <h3 className={styles.imageGalleryProductName}>{name}</h3>
          </div>
          <Image
            src={mediaItemUrl}
            width="700"
            height="700"
            alt={`Gallery Image - ${name}`}
          />
        </div>
      ) : null}
    </Fragment>
  );
}
