import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Cart.module.scss";
import { FormControl } from "react-bootstrap";

interface IProduct {
  totalProductsPrice: number;
  product: {
    name: string;
    image: string;
    price: number;
    totalPrice: number;
    slug: string;
    databaseId: number;
  };
  handleRemoveItem: (event: any, id: number) => void;
  couponApplied: boolean | undefined;
}

export default function CartItem({
  product,
  totalProductsPrice,
  handleRemoveItem,
  couponApplied,
}: IProduct) {
  return (
    <tr className={styles.cart__itemRow}>
      <td className={`${styles["cart__itemImg"]} ${styles["cart__cell"]}`}>
        <Link href={`product/${product.name}`} passHref>
          <Image
            alt={product.name}
            className="hero-img"
            src={product.image}
            width="150"
            height="150"
          />
        </Link>
      </td>
      <td className={styles.cart__cell}>
        <Link href={`product/${product.slug}`}>
          <a className="link">{product.name}</a>
        </Link>
        <br />
        <a
          href="#"
          className={styles.cart__itemRemove}
          onClick={(event) => handleRemoveItem(event, product.databaseId)}
        >
          Remove
        </a>
        <br />
        {couponApplied && (
          <span className="Checkout_currency__ticker__applied_coupon badge text-bg-success">
            Coupon applied{" "}
          </span>
        )}
      </td>
      <td className={styles.cart__cell}>${product.price}</td>
      <td className={styles.cart__cell}>
        <FormControl
          type="number"
          value={1}
          step="1"
          min="1"
          pattern="[0-9]*"
          className={styles.cart__qty}
          disabled
        />
      </td>
      <td className={styles.cart__cell}>
        <div>${totalProductsPrice}</div>
      </td>
    </tr>
  );
}
