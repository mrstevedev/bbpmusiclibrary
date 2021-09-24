import styles from '../styles/Cart.module.scss'
import Footer from '../components/Footer'

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
                    </div>
                </div>
            </main>
        <Footer />
        </>
    )
} 
export default Cart