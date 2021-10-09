import styles from "../styles/ACButton.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutButton(props) {
  return (
    <>
      <Link href="/checkout">
        <a>
          <button
            className={`add-to-cart-btn ${styles.addToCartBtn}`}
            onClick={props.handleCloseCart}
          >
            <span className={styles.cartBtnTxt}>Checkout</span>
            <Image
              src="/images/cart__haveItems.svg"
              width="24"
              height="22"
              alt="Checkout Item"
            />
          </button>
        </a>
      </Link>
    </>
  );
}
