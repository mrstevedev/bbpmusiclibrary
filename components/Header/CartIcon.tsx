import cartImg from "@/public/images/cart.svg";
import styles from "@/styles/Header.module.scss";
import Image from "react-bootstrap/Image";

type Props = {
  cartCount: number;
  handleToggleCart: () => void;
  noCartEvent: boolean;
};

export default function CartIcon({
  handleToggleCart,
  noCartEvent,
  cartCount,
}: Props) {
  return (
    <>
      {noCartEvent === true ? (
        <a className={styles.btn__hover_scale} data-effect="st-effect-1">
          <span className={`cart-count ${styles.cart__count}`}></span>
          <Image
            className="cart-icon"
            src={cartImg}
            width="19"
            height="18"
            alt="shopping cart"
          />
        </a>
      ) : (
        <a
          onClick={handleToggleCart}
          className="cart-icon"
          data-effect="st-effect-1"
        >
          <span
            className={`cart-count ${
              cartCount > 0 ? styles.cart__count : null
            }`}
          ></span>
          <Image
            src={"/images/cart.svg"}
            width="22"
            height="21"
            alt="shopping cart"
            style={{ display: "flex" }}
            className={styles.btn__hover_scale}
          />
        </a>
      )}
    </>
  );
}
