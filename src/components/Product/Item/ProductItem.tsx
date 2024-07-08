"use client";
import Image from "react-bootstrap/Image";
import Link from "next/link";
import styles from "@/styles/Product.module.scss";

import { addFirstProduct, updateCart } from "@/util/index";

import { Col, Row } from "react-bootstrap";
import AddToCartButton from "@/components/Buttons/AddToCartButton";
import ProductGallery from "@/components/Product/Gallery/Gallery";

import { CartContext, TCartContext } from "@/context/CartContext";
import { useContext, useState, MouseEvent, Fragment } from "react";

import { toast } from "react-toastify";
import { PRODUCT } from "@/constants/index";

export default function ProductItem({ product }) {
  const { name, description, salePrice, regularPrice } = product;
  const { mediaItemUrl } = product.image;
  const categories = product.productCategories.nodes;

  const { cart } = useContext<TCartContext>(CartContext);
  const { setCart } = useContext<TCartContext>(CartContext);

  const [gallery, showGallery] = useState(false);
  const [_, setAddToCart] = useState(false);

  /** Add AddToCartButton component isItemInCart logic here  */

  const isItemInCart = cart?.products?.some(
    (cartItem) => cartItem.databaseId === product.databaseId
  );

  const handleShowImageGallery = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.body.classList.add("showGallery");
    showGallery(true);
  };

  const handleCloseImageGallery = () => {
    showGallery(false);
    document.body.classList.remove("showGallery");
  };

  const handleAddToCart = () => {
    if (typeof window) {
      let existingCart = localStorage.getItem(PRODUCT.BBP_PRODUCT);

      /**
       * If cart has item(s) already, update the existing
       *  */
      if (existingCart) {
        existingCart = JSON.parse(existingCart);
        const qtyToBeAdded = 1;

        const updatedCart = updateCart(existingCart, product, qtyToBeAdded);

        setCart(updatedCart);
      } else {
        /**
         * Add first product
         */
        const newCart = addFirstProduct(product);

        setCart(newCart);
      }
      toast.success("Added item to cart");
      setAddToCart(true);

      const cartCount = document.querySelector(".cart-count");
      cartCount?.classList.add("pop");
    }
  };

  return (
    <Fragment>
      <Row className={styles.BBP__ProductTop}>
        <Col>
          <a href="#" onClick={handleShowImageGallery}>
            <div className={`product-img ${styles.BBP__ProductTop_Image}`}>
              <Image
                loading="eager"
                src={mediaItemUrl}
                width="100%"
                height="100%"
                alt={name}
              />
            </div>
          </a>
        </Col>
        <Col>
          <div className={styles.productDescription}>
            <h3
              data-testid="product-name"
              className={styles.productDescriptionTxt}
            >
              {name}
            </h3>
            <h4 data-testid="product-price">
              {salePrice ? (
                <Fragment>
                  <span className={styles.Product__RegularPrice}>
                    {regularPrice}
                  </span>
                  <span className={styles.Product__SaleTxt}> {salePrice}</span>
                </Fragment>
              ) : (
                regularPrice
              )}
            </h4>
            <p
              data-testid="product-description"
              // Move this to styles module
              style={{ maxHeight: "320px", overflow: "scroll" }}
            >
              {description}
            </p>
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
            <AddToCartButton
              product={product}
              handleAddToCart={handleAddToCart}
              isItemInCart={isItemInCart}
            />
          </div>
        </Col>
      </Row>
      <ProductGallery
        product={product}
        gallery={gallery}
        handleCloseImageGallery={handleCloseImageGallery}
      />
    </Fragment>
  );
}
