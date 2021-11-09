
import styles from '../../styles/Checkout.module.scss'
import CartItem from '../../components/checkout/CartItem'

interface Product {
    databaseId: string,
    name: string,
    image: string
    price: number,
    slug: string
}

interface IProps {
    products: Product[]
    productsCount: number
    price: number
}

export default function SidebarCart(props : IProps) {
    const { products, productsCount, price } = props

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
                            price={price}
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
                    <span className="Checkout_currency__ticker">USD</span> { price }
                    </div>
                </div>
            </div>
        </>
    )
}