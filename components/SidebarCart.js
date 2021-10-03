import styles from '../styles/SidebarCart.module.scss'
import Image from "next/image";
import closeBtn from '../public/images/closeBtn.svg'
import cart__noItems from '../public/images/cart__noItems.svg'
import Link from 'next/link'
import { Fragment, useContext, useEffect, useState } from 'react'
import { AppContext } from './context/AppContext'
import { removeProduct } from '../util'
import ACButton from '../components/ACButton'

// interface Props {
//     products: [],
//     showCart: boolean,
//     handleCloseCart: () => any
// }

export default function SidebarCart(props) {
    const [cart, setCart] = useContext( AppContext )

    const products =
    ( cart && Object.keys( cart ).length ) ? cart.products : ""

    const productsCount =
    ( null != cart && Object.keys( cart ).length ) ? cart.totalProductsCount : "" 

    const handleRemoveItem = (id) => {
        console.log('Remove item from cart', id)
        // products.filter(item => item.productId !== id)
        removeProduct( id )
    }

    // console.log(products)

    return (
        <>
        {/* <div className={styles.SidebarCart_overlay}></div> */}
            <div className={`cart ${styles.SidebarCart} ${ props.showCart === true ? (
                styles.SidebarCart__active
            ) : '' }`}>
                <div className={styles.SidebarCart_top}>
                    <h1>Your Shopping Cart</h1>

                    <a href="#" onClick={props.handleCloseCart} className={styles.close__cart_scale}>
                        <Image src={closeBtn} width="14" height="14" alt="Close cart" />
                    </a>
                </div>

                <div className={styles.SidebarCart_btm}>

                    {products ? (
                        <>
                            <div className={styles.Checkout__wrapper}>
                                <h3>You have { productsCount } item in your cart</h3>
                                <div className={styles.Checkout__product_wrapper}>


                                {/* Product */}

                                { products.map((product) => (
                                    <Fragment key={product.databaseId} >
                                    <div className={styles.Checkout__product}>
                                        <div className={styles.Checkout_topImg}>
                                            <Link href={`/product/${ product.slug }`}>
                                                <a className="product-img">
                                                    <span className={`cart-count ${ styles.cart__count }`}>{ productsCount }</span>
                                                    <Image src={ product.image } width="81" height="81" alt="Cart items" />
                                                </a>
                                            </Link>
                                        </div>
                                        <div className={styles.Checkout__right}>
                                            <h3>
                                                <Link href={` /product/${ product.slug } `}>
                                                    <a>
                                                    { product.name }
                                                    {/* { products[0] !== undefined ? products[0].name : "" } */}
                                                    </a>
                                                </Link>
                                                <span className={styles.Checkout__right_price}>${ product.price }</span>
                                                </h3>
                                            
                                            <a onClick={() => handleRemoveItem(product.productId)} href="#" className={styles.Checkout__right_btn}>Remove</a>
                                        </div>
                                    </div>
                                    </Fragment>
                                )) }

                                {/* End Product */}

                                </div> 
                                
                                <div className={styles.Checkout_btm}>
                                <ACButton props={props}
                                    handleCloseCart={props.handleCloseCart}
                                    sideBar
                                    />
                                    <p>Taxes and shipping calculated at checkout</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                         <h3>Your shopping cart is empty</h3>
                            <Image src={cart__noItems} width="42" height="31" alt="Cart is empty" />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}