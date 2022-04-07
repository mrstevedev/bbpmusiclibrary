
import styles from '../../styles/Checkout.module.scss'
import CartItem from '../../components/checkout/CartItem'
import { useContext } from 'react'
import { AppContext } from '../../components/context/AppContext'

interface Product {
    databaseId: string,
    name: string,
    image: string
    totalProductsPrice: number,
    slug: string,
    qty: number,
    price: number
}

interface IProps {
    products: Product[]
    productsCount: number
    totalProductsPrice: number
}

export default function SidebarCart(props : IProps) {
    const { products, productsCount } = props
    const [cart, setCart] = useContext<any>( AppContext )

    const totalProductsPrice = 
    ( null != cart && Object.keys( cart ).length ) ? cart.totalProductsPrice : ""

    return (
        <>
            <div className={styles.Checkout__right}>
                <div className={styles.Checkout__right_top}>
                </div>
                <div className={styles.Checkout__right_btm}>

                {products ?
                    products.map((product: Product) => (
                        <CartItem 
                            key={product.databaseId}
                            totalProductsPrice={totalProductsPrice}
                            product={product}
                            productsCount={productsCount} 
                        />
                    ))
                    : 'There are no items in your cart'}

                </div>
                <div className={styles.Checkout__right_btm_total_container}>
                    <div className={styles.Checkout__right_btm_total}>
                    <h4>Total</h4>
                    </div>
                    <div>
                    <span className="Checkout_currency__ticker">USD</span> ${ totalProductsPrice }
                    </div>
                </div>
            </div>
        </>
    )
}