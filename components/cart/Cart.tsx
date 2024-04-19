import { Fragment, useContext } from "react";
import styles from "@/styles/Cart.module.scss";
import CartItem from "./CartItem";
import Link from "next/link";
import { Button, Table } from "react-bootstrap";
import { CartContext, TCartContext } from "context/CartContext";

interface Product {
  image: string;
  name: string;
  totalPrice: number;
  qty: number;
  price: number;
  slug: string;
  databaseId: number;
}

type TProducts = {
  products: Product[];
  totalProductsPrice: number;
  handleRemoveItem: (event: any, id: number) => void;
};

export default function Cart({
  products,
  totalProductsPrice,
  handleRemoveItem,
}: TProducts) {
  const { cart } = useContext<TCartContext>(CartContext);

  let coupon_applied =
    null != cart && Object.keys(cart).length ? cart.coupon?.applied : undefined;

  return (
    <>
      {products ? (
        <Fragment>
          <Table className={styles.cart__table}>
            <thead className={styles.cart__tHead}>
              <tr>
                <th colSpan={2}>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {products
                ? products.map((product: Product) => (
                    <CartItem
                      key={product.name}
                      product={product}
                      couponApplied={coupon_applied}
                      handleRemoveItem={handleRemoveItem}
                      totalProductsPrice={totalProductsPrice}
                    />
                  ))
                : "There are no item in your cart"}
            </tbody>
          </Table>

          <footer>
            <div className={styles.cart__grid}>
              <div className="cart__note"></div>
              <div className={styles.cart__right}>
                <div className="cart__coupon--container"></div>
                <div className={styles.cart__subtotal}>
                  <h5 className={styles.cart__subtotalText}>
                    Subtotal <span>${totalProductsPrice}</span>
                  </h5>
                </div>
                <p className={styles.cart__taxesTxt}>
                  Taxes calculated at checkout
                </p>
                <div className={styles.cart__checkoutBtnContainer}>
                  <Link href="/checkout" passHref>
                    <Button
                      className={`rounded-0 btn btn-primary ${styles.cart__button}`}
                    >
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </Fragment>
      ) : (
        <Fragment>
          <div className={styles.cart__empty}>
            <p>Your shopping cart is empty</p>
            <Link href="/" passHref>
              <Button
                className={`btn btn-primary rounded-0 ${styles.cart__button}`}
              >
                Continue browsing here
              </Button>
            </Link>
          </div>
        </Fragment>
      )}
    </>
  );
}
