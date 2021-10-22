import styles from '../../styles/SidebarCart.module.scss'
import { useContext } from 'react'
import Image from "next/image";
import cart__noItems from '../../public/images/cart__noItems.svg'
import CheckoutButton from '../../components/CheckoutButton'
import CartItem from '../../components/sidebar/CartItem'
import { AppContext } from '../context/AppContext'

export default function Cart(props) {

    const [cart, setCart] = useContext( AppContext )

    const products =
    ( cart && Object.keys( cart ).length ) ? cart.products : ""

    const productsCount =
    ( null != cart && Object.keys( cart ).length ) ? cart.totalProductsCount : "" 

    return (
        <>
            {products ? (
                <>
                    <div className={styles.Checkout__wrapper}>
                        <h3>You have { productsCount } item in your cart</h3>
                        <div className={styles.Checkout__product_wrapper}>

                        { products.map((product) => (

                            <CartItem 
                                key={product.databaseId}
                                product={product} 
                                productsCount={productsCount} 
                            />

                        ))}

                        </div> 
                        
                        <div className={styles.Checkout_btm}>
                        <CheckoutButton props={props}
                            handleCloseCart={props.handleCloseCart}
                            sideBar
                            />
                            <p style={{ fontWeight: '100', fontSize: '0.8rem', letterSpacing: '1px' }}>Taxes and shipping calculated at checkout</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h3>Your shopping cart is empty</h3>
                    <Image src={cart__noItems} width="42" height="31" alt="Cart is empty" />
                </>
            )}
        </>
    )
}