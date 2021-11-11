import styles from '../styles/Cart.module.scss'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AppContext } from '../components/context/AppContext'
import Cart from '../components/cart/Cart'
import Script from 'next/script'
import CoverImage from '../components/coverimages/CoverImage'

const CartPage = () => {
    const [cart, setCart] = useContext<any>( AppContext )
    
    const products =
    ( cart && Object.keys( cart ).length ) ? cart.products : ""

    const price = 
    ( null != cart && Object.keys( cart ).length ) ? cart.products[0].price : ""

    const productsCount =
    ( null != cart && Object.keys( cart ).length ) ? cart.totalProductsCount : "" 
    
    const [quantity, setQuantity] = useState(productsCount)

    const [totalStatePrice, setTotalStatePrice] = useState(price)

    useEffect(() => {
        setQuantity(productsCount)
    }, [setQuantity])

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
            <CoverImage />
                <div className="container">
                    <div className={ styles.cart }>
                        <div className={ styles.cart__header } >
                            <h3 className={ styles.cart__headerText }>Shopping Cart</h3>
                        </div>

                        <Cart 
                            products={products}
                            quantity={quantity}
                            handleChange={handleChange}
                            totalStatePrice={totalStatePrice}
                        />
                        
                    </div>
                </div>
            </main>
        </>
    )
} 
export default CartPage