import styles from '../../styles/AddCartButton.module.scss'
import Link from 'next/link'
import { AppContext } from "../../components/context/AppContext";
import { useContext } from "react";

export default function ACButton(props) {
    const [cart, setCart] = useContext(AppContext);
    const { addToCart, product, productPage } = props;
    const { downloads } = props.product;
    
    // Check if current product databaseId matches the databaseId of a product in the context
    // console.log(product.databaseId);
    const hasItemInCart = cart?.products?.some(prod => prod.databaseId === product.databaseId);

  return (
    <>
    { downloads !== null ? (
            <>
            { addToCart === true ? (
              <>
                <Link href="/cart">
                  <a>
                    <button className={`add-to-cart-btn ${ !addToCart ? styles.addToCartBtn : styles.viewCartBtn }`}>
                      <span className={styles.cartBtnTxt}>
                        View cart
                      </span>
                    </button>
                  </a>
                </Link>
              </>
            ) : hasItemInCart ? (
              <>
              <button className={`add-to-cart-btn ${ !addToCart ? styles.addToCartBtn : styles.viewCartBtn }`}>
                <span className={styles.cartBtnTxt}>
                  Item is already in your cart
                </span>
              </button>
              </>
            ) : (
              <>
              <button className={`add-to-cart-btn ${ !addToCart ? styles.addToCartBtn : styles.viewCartBtn }`} onClick={ props.handleAddToCart }>
                <span className={styles.cartBtnTxt}>
                  Add to cart
                </span>
              </button>
              </>
            )}
          </>
      ) : (
        <>
          <span className={styles.cartBtnTxt__notAvailable}>
            Not available. Please check back later
          </span>
        </>
      )  }
      </>
  );
}
