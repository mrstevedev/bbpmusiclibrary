import styles from '../../styles/ACButton.module.scss'
import Image from 'next/image'
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
                  <button className={`add-to-cart-btn ${ !addToCart ? styles.addToCartBtn : styles.viewCartBtn }`}>
                    <span className={styles.cartBtnTxt}>
                      View cart
                    </span>
                  </button>
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
          <span className={styles.cartBtnTxt} style={{ fontWeight: 'bold', color: '#a9a9a9' }}>
            Not available. Please check back later
          </span>
        </>
      )  }
      </>
  );
}
