import styles from "../../styles/ACButton.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutButton(props) {
  return (
    <>
      <Link href="/checkout">
        <a>
          <button
            className={`${styles.addToCartBtn}`}
            onClick={props.handleCloseCart}
          >
            <span className={styles.cartBtnTxt}>Checkout</span>
            <Image
              src="/images/cart__haveItems.svg"
              width="22"
              height="20"
              alt="Checkout Item"
            />
          </button>
        </a>
      </Link>
    </>
  );
}
