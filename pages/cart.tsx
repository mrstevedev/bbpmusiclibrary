import { useContext } from "react";
import styles from "@/styles/Cart.module.scss";
import Script from "next/script";
import Cart from "@/components/cart/Cart";
import CoverImage from "@/components/CoverImage/CoverImage";
import { CartContext, TCartContext } from "@/context/CartContext";
import { removeItemFromCart } from "@/util/index";
import { Container } from "react-bootstrap";

const CartPage = () => {
  const { cart, setCart } = useContext<TCartContext>(CartContext);

  const products = cart && Object.keys(cart).length ? cart.products : [];

  const totalProductsPrice =
    null != cart && Object.keys(cart).length ? cart.totalProductsPrice : 0;

  const handleRemoveItem = (event: any, id: number) => {
    removeItemFromCart(id);
    setCart({});
  };

  return (
    <>
      <Container fluid>
        <CoverImage />
        <div className="container">
          <div className={styles.cart}>
            <div className={styles.cart__header}>
              <h3 className={styles.cart__headerText}>Shopping Cart</h3>
            </div>

            <Cart
              products={products}
              handleRemoveItem={handleRemoveItem}
              totalProductsPrice={totalProductsPrice}
            />
          </div>
        </div>
      </Container>
    </>
  );
};
export default CartPage;
