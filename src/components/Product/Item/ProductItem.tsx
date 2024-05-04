"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Product.module.scss";

import { addFirstProduct, updateCart } from "util/index";

import { Col, Row } from "react-bootstrap";
import AddCartButton from "../../../components/Buttons/AddCartButton";
import ProductGallery from "../../../components/Product/Gallery/Gallery";

import { CartContext, TCartContext } from "../../../context/CartContext";
import {
  useContext,
  useEffect,
  useState,
  MouseEvent,
  useRef,
  Fragment,
} from "react";

import { toast } from "react-toastify";

export default function ProductItem({ product }) {
  const { name, description, salePrice, regularPrice } = product;
  const { mediaItemUrl } = product.image;
  const categories = product.productCategories.nodes;

  const [gallery, showGallery] = useState(false);
  const [addToCart, setAddToCart] = useState(false);

  const { setCart } = useContext<TCartContext>(CartContext);

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
      let existingCart = localStorage.getItem("bbp_product");

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
            <AddCartButton
              product={product}
              handleAddToCart={handleAddToCart}
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
