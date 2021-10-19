import styles from '../styles/Cart.module.scss'
import { ChangeEvent, Fragment, useContext, useEffect, useState } from 'react'
import { AppContext } from '../components/context/AppContext'
import CartItem from '../components/cart/CartItem'
import Link from 'next/link'

// Use next/script to add dynamic class to body
import Script from 'next/script'

const Cart = () => {
    const [cart, setCart] = useContext<any>( AppContext )
    
    const products =
    ( cart && Object.keys( cart ).length ) ? cart.products : ""

    const productsCount =
    ( null != cart && Object.keys( cart ).length ) ? cart.totalProductsCount : "" 
    
    const [quantity, setQuantity] = useState(productsCount)
    const [totalStatePrice, setTotalStatePrice] = useState(29.99)

    useEffect(() => {
        setQuantity(productsCount)
    }, [setQuantity])

    console.log('products in cart', products)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value))

        console.log(quantity)

        // setTotalStatePrice(totalStatePrice * quantity)

    }

    return (
        <>
        <Script
            dangerouslySetInnerHTML={{
            __html: `document.body.classList.remove('Checkout__page');
                document.body.classList.add('Cart__page')`
            }}
        />
            <main>
            <div className="hero-img" style={{ backgroundImage: `url(${'./images/img1200.webp'})`, 
                height: '270px',
                width: '100%',
                backgroundPosition: 'center top',
                backgroundRepeat: 'no-repeat',
                margin: '2rem 0 2rem 0', borderRadius: '3px' }}></div>
                <div className="container">
                    <div className={ styles.cart }>
                        <div className={ styles.cart__header } >
                            <h3 className={ styles.cart__headerText }>Shopping Cart</h3>
                        </div>

                        { products ? (
                            <Fragment>

                            <table className={styles.cart__table}>
                            <thead style={{ borderBottom: 'solid 1px #e2e2e2', height: '60px' }}>
                                <tr>
                                    <th colSpan={2}>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            {/* Cart Items <CartItems /> */}
                                <tbody>
                                   {/* CartItem */}
                                    <CartItem 
                                        totalStatePrice={totalStatePrice}
                                        quantity={quantity}
                                        products={products}
                                        handleChange={handleChange}
                                    />
                                   {/* End CartItem */}
                                </tbody>
                            </table>

                        <footer>
                            <div className="grid" style={{ display: 'flex' }}>
                                <div className="cart__note" style={{ width: '100%' }}></div>
                                <div className="cart__right" style={{ width: '100%', padding: '2rem 0' }}>
                                    <div className="cart__coupon--container"></div>
                                    <div className="cart__subtotal">

                                    </div>
                                    <p style={{ textAlign: 'right', fontWeight: 100 }}>Taxes and shipping calculated at checkout</p>
                                    <div className="" style={{ width: '100%', textAlign: 'right' }}>
                                        <Link href="/checkout">
                                            <a>
                                                <button className="rounded-0 btn btn-primary" style={{ 
                                                    fontWeight: 100, 
                                                    textTransform: 'uppercase', 
                                                    fontSize: '0.7rem',
                                                    padding: '0.9rem 2rem',
                                                    letterSpacing: '2px',
                                                }}>Checkout</button>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </footer>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <div className="cart__empty" style={{ textAlign: 'center', fontWeight: 100 }}>
                                    <p>Your shopping cart is empty</p>
                                    <Link href="/">
                                        <a>
                                        <button className="btn btn-primary rounded-0" style={{ 
                                            fontWeight: 100, 
                                            textTransform: 'uppercase', 
                                            fontSize: '0.7rem',
                                            padding: '0.9rem 2rem',
                                            letterSpacing: '2px',
                                        }}>Continue browsing here</button>
                                    </a>
                                    </Link>
                                </div>
                            </Fragment>
                        ) }
                        
                    </div>
                </div>
            </main>
        </>
    )
} 
export default Cart