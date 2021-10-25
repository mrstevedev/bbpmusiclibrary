import styles from '../../styles/Checkout.module.scss'
import Image from 'next/image'
import Link from 'next/link'

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

export default function CartItem(props : IProps) {

    const { products, productsCount } = props

    return (
        <>
            {products ?
                products.map((product: Product) => (
                    <div key={ product.databaseId } className={styles.Checkout__right_product}>
                    <div className={`product-img ${styles.Checkout__right_product_img}`}>
                    <Link href={`/product/${ product.slug }`}>
                        <a>
                        <span className="cart-count">{ productsCount }</span>
                        <Image src={product.image} width="91" height="91" alt={ product.name } />
                        </a>
                        </Link>
                        </div>
                        <div className={styles.Checkout__right_product_name}>
                        <h3 className={styles.Checkout__right_product_name_txt}>
                            <Link href={`/product/${ product.slug }`}>
                            <a style={{ color: '#333', fontWeight: 100 }}>
                                { product.name }
                            </a>
                            </Link>
                        </h3>
                        </div>
                    <span>{ product.price }</span>
                </div>
            ))
            : 'There are no items in your cart'}
        </>
    )
}