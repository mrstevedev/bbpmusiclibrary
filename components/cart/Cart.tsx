import { Fragment } from 'react'
import styles from '../../styles/Cart.module.scss'
import CartItem from './CartItem'
import Link from 'next/link'

interface IProduct {
    image: string
    name: string
    totalPrice: number
    qty: number
    price: number
    slug: string
    databaseId: number
}

interface IProducts {
    products: IProduct[]
    quantity: number
    totalStatePrice: number
    handleChange: (event: any) => void
    handleRemoveItem: (event: any, id: number) => void
}

export default function Cart(props : IProducts) {
    const { totalStatePrice, quantity } = props
    return (
        <>
            { props.products ? (
                <Fragment>
                <table className={styles.cart__table}>
                <thead className={styles.cart__tHead}>
                    <tr>
                        <th colSpan={2}>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>

                    <tbody>
                    { props.products ? props.products.map((product: IProduct) => (

                        <CartItem 
                            key={product.name}
                            totalStatePrice={totalStatePrice}
                            quantity={quantity}
                            product={product}
                            handleChange={props.handleChange}
                            handleRemoveItem={props.handleRemoveItem}
                        />
                        
                    )) : 'There are no item in your cart'}

                    </tbody>
                </table>

            <footer>
                <div className={styles.cart__grid}>
                    <div className="cart__note"></div>
                    <div className={styles.cart__right}>
                        <div className="cart__coupon--container"></div>
                        <div className={styles.cart__subtotal}>
                            <h5 className={styles.cart__subtotalText}>Subtotal <span>${ totalStatePrice * quantity }</span></h5>
                        </div>
                        <p className={styles.cart__taxesTxt}>Taxes calculated at checkout</p>
                        <div className={styles.cart__checkoutBtnContainer}>
                            <Link href="/checkout">
                                <a>
                                    <button className={`rounded-0 btn btn-primary ${ styles.cart__button }`}>Checkout</button>
                                </a>
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
                        <Link href="/">
                            <a>
                            <button className={`btn btn-primary rounded-0 ${ styles.cart__button }`}>Continue browsing here</button>
                        </a>
                        </Link>
                    </div>
                </Fragment>
            ) }
        </>
    )
}