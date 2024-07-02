import Link from "next/link";
import { Fragment, useContext } from "react";
import { Badge, Button } from "react-bootstrap";
import styles from "@/styles/AddToCartButton.module.scss";
import { CartContext, TCartContext } from "@/context/CartContext";

export default function AddToCartButton({
  handleAddToCart,
  product,
  isItemInCart,
}) {
  // const { cart } = useContext<TCartContext>(CartContext);
  const { addToCart } = product;
  const { downloadable } = product;

  // const isItemInCart = cart?.products?.some(
  //   (cartItem) => cartItem.databaseId === product.databaseId
  // );

  return (
    <Fragment>
      {downloadable ? (
        <Fragment>
          {isItemInCart ? (
            <Link href="/checkout">
              <Button
                size="lg"
                className={`add-to-cart-btn ${
                  !addToCart
                    ? styles.BBP__AddToCart_Button
                    : styles.BBP__ViewCart_Button
                }`}
                style={{ cursor: "pointer" }}
              >
                <span className={styles.BBP__AddToCart_Button_Text}>
                  View in checkout{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="21"
                    viewBox="0 0 28 21"
                  >
                    <path
                      id="iconmonstr-checkout-8"
                      d="M22.75,3A5.25,5.25,0,1,0,28,8.25,5.25,5.25,0,0,0,22.75,3Zm-.583,8.167V8.833H19.833V7.667h2.333V5.333l3.5,2.917ZM9.044,8.833,8.386,6.5h6.992a7.525,7.525,0,0,0-.211,1.75l.029.583ZM16.333,22.25a1.75,1.75,0,1,0,1.75-1.75A1.75,1.75,0,0,0,16.333,22.25ZM0,3,.867,5.333h2.25l4.053,14H22.616L24.141,15.7a7.594,7.594,0,0,1-1.391.133,7.687,7.687,0,0,1-1.155-.1L21.064,17H8.9l-4-14H0ZM10.5,22.25a1.75,1.75,0,1,0,1.75-1.75A1.75,1.75,0,0,0,10.5,22.25Z"
                      transform="translate(0 -3)"
                    />
                  </svg>
                </span>
              </Button>
            </Link>
          ) : (
            <Button
              className={`${
                !addToCart
                  ? styles.BBP__AddToCart_Button
                  : styles.BBP__ViewCart_Button
              }`}
              onClick={handleAddToCart}
            >
              <span className={styles.BBP__AddToCart_Button_Text}>
                Add to cart{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="22"
                  viewBox="0 0 24 22"
                >
                  <path
                    id="iconmonstr-shopping-cart-9"
                    d="M10,21.5A1.5,1.5,0,1,1,8.5,20,1.5,1.5,0,0,1,10,21.5ZM13.5,20A1.5,1.5,0,1,0,15,21.5,1.5,1.5,0,0,0,13.5,20ZM19.805,5,16.373,17H5.945L2.168,8H0L4.615,19H17.854L21.328,7h1.929L24,5ZM6,1c6.712,1.617,7,9,7,9h2l-4,4L7,10H9S9.94,3.58,6,1Z"
                    transform="translate(0 -1)"
                    fill="#fff"
                  />
                </svg>
              </span>
            </Button>
          )}
        </Fragment>
      ) : (
        <Badge bg="danger" text="light">
          This product is currently not available. Please check back later
        </Badge>
      )}
    </Fragment>
  );
}
