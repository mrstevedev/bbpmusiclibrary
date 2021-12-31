import styles from '../../styles/ACButton.module.scss'
import Link from 'next/link'

export default function ACButton(props) {
    const { addToCart, product, productPage } = props;
    const { downloads } = props.product;

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
