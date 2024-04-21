import styles from "@/styles/Header.module.scss";
import Image from "react-bootstrap/Image";

type Props = {
  cartCount: number;
  handleToggleCart: () => void;
};

export default function CartIcon({ handleToggleCart, cartCount }: Props) {
  return (
    <>
      <a
        onClick={handleToggleCart}
        className="cart-icon"
        data-effect="st-effect-1"
      >
        <span
          className={`cart-count ${cartCount > 0 ? styles.cart__count : null}`}
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
    </>
  );
}
