import styles from '../../styles/SidebarCart.module.scss'
import Link from 'next/link'
import Image from "next/image";

export default function CartItem(props) {

    const { product } = props
    console.log(product)

    return (
        <>
            <div className={styles.Checkout__product}>
                <div className={styles.Checkout_topImg}>
                    <Link href={`/product/${ product.slug }`}>
                        <a className="product-img">
                            <span className={`cart-count ${ styles.cart__count }`}>{ product.qty }</span>
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
                    
                    <a onClick={() => props.handleRemoveItem(product.databaseId)} href="#" className={styles.Checkout__right_btn}>Remove</a>
                </div>
            </div>
        </>
    )
}