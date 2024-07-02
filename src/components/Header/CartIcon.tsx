import styles from "@/styles/Header.module.scss";
import Image from "react-bootstrap/Image";

type Props = {
  cartCount: number;
  handleToggleCart: () => void;
};

export default function CartIcon({ handleToggleCart, cartCount }: Props) {
  return (
    <a
      data-testid="cart-button"
      onClick={handleToggleCart}
      className="cart-icon"
      data-effect="st-effect-1"
    >
      <span
        data-testid={cartCount > 0 ? "has-items" : null}
        className={`cart-count ${
          cartCount > 0 ? styles.BBP_Cart__Count : null
        }`}
      ></span>
      <Image
        src={"/images/cart.svg"}
        width="33"
        height="32"
        alt="shopping cart"
        style={{ display: "flex" }}
        className={styles.BBP_Button_Hover__Scale}
      />
    </a>
  );
}
