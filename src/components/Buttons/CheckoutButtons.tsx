import Link from "next/link";
import { Button } from "react-bootstrap";
import styles from "@/styles/AddToCartButton.module.scss";

export default function CheckoutButton({ handleCloseCart }) {
  return (
    <>
      <Link href="/checkout" passHref>
        <Button
          className={`${styles.BBP__AddToCart_Button}`}
          onClick={handleCloseCart}
        >
          <span className={styles.BBP__AddToCart_Button_Text}>
            Checkout
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
    </>
  );
}
