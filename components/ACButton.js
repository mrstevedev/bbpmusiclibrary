import styles from '../styles/ACButton.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function ACButton(props) {
    const { addToCart, product, sideBar, productPage } = props;

  return (
    <>
      { productPage ? (
          <button className={`add-to-cart-btn ${ !addToCart ? styles.addToCartBtn : styles.viewCartBtn }`} onClick={ props.handleAddToCart }>
            { addToCart === true ? (
              <>
              <span className={styles.cartBtnTxt}>
                Item added
              </span>
              <Image src="/images/shopping-cart_check_black.svg" width="30" height="28" alt="Add to Cart" />
              </>
            ): (
              <>
              <span className={styles.cartBtnTxt}>
                Add to cart
              </span>
              <Image src="/images/add-to-cart-btn.svg" width="24" height="22" alt="Add to Cart" />
              </>
            )}
           
          </button>
      ) : sideBar ? (
        <Link href="/checkout">
          <a>
          <button className={`add-to-cart-btn ${ styles.addToCartBtn }`} onClick={props.handleCloseCart}>
              <span className={styles.cartBtnTxt}>Checkout</span>
              <Image src="/images/cart__haveItems.svg" width="24" height="22" alt="Checkout Item" />
          </button>
          </a>
        </Link>
      ) : ''  }
    </>
  );
}
