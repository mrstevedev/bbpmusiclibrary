import styles from '../styles/Cart.module.scss'

// Use next/script to add dynamic class to body
import Script from 'next/script'

const Cart = () => {
    return (
        <>
        <Script
            dangerouslySetInnerHTML={{
            __html: `document.body.classList.remove('Checkout__page');
                document.body.classList.add('Cart__page')`
            }}
        />
            <main>
                <div className="container">
                    <div className={ styles.cart }>
                        <div className={ styles.cart__header } >
                            <h3 className={ styles.cart__headerText }>Shopping Cart</h3>
                        </div>
                        <table className={styles.cart__table}>
                            <thead>
                                <tr>
                                    <th colSpan={2}>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
} 
export default Cart