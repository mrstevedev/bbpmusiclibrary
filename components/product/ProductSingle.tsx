import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Product.module.scss";

import AddCartButton from "@/components/product/AddCartButton";
import { Col, Row } from "react-bootstrap";
import { TProductSingle } from "@/types/types";

export default function ProductSingle({
  product,
  handleShowImageGallery,
  handleAddToCart,
}: TProductSingle) {
  const { name, description, salePrice, regularPrice } = product;
  const { mediaItemUrl } = product.image;

  const categories = product.productCategories.nodes;

  return (
    <Row className={styles.productTop}>
      <Col>
        <a href="#" onClick={handleShowImageGallery}>
          <div className={`product-img ${styles.product__Img}`}>
            <Image
              loading="eager"
              src={mediaItemUrl}
              width="490"
              height="490"
              alt={`Product Image - ${name}`}
            />
          </div>
        </a>
      </Col>
      <Col>
        <div className={styles.productDescription}>
          <h3 className={styles.productDescriptionTxt}>{name}</h3>
          <h4>
            {salePrice ? (
              <>
                <span className={styles.Product__RegularPrice}>
                  {regularPrice}
                </span>
                <span className={styles.Product__SaleTxt}> {salePrice}</span>
              </>
            ) : (
              regularPrice
            )}
          </h4>
          <p>{description}</p>
          <h4 className={styles.productCategoriesTxt}>
            Categories:{" "}
            {categories.map((obj) => (
              <Link
                key={obj.name}
                href={{
                  pathname: `/category/${obj["name"]
                    .toLowerCase()
                    .replace(" ", "-")}`,
                }}
                passHref
                className="link-blue"
              >
                <span
                  style={{
                    margin: "0 0.1rem",
                    cursor: "pointer",
                    color: "#446dd2",
                  }}
                >
                  {obj["name"]}
                </span>
              </Link>
            ))}
          </h4>
          <AddCartButton product={product} handleAddToCart={handleAddToCart} />
        </div>
      </Col>
    </Row>
  );
}
