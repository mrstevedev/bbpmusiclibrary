
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Cart.module.scss'
import { removeProduct } from '../../util'

interface IProduct {
    quantity: number
    totalStatePrice: number
    product: {
        name: string
        image: string
        price: number
        qty: number
        totalPrice: number
        slug: string
    }
    handleChange: (event: any) => void
}

export default function CartItem(props: IProduct) {
    return (
        <>
            <tr className={styles.cart__itemRow}>
                <td className={ `${styles["cart__itemImg"]} ${styles["cart__cell"]}` }>
                    <Link href={`product/${ props.product.name }`}>
                        <a>
                            <Image className="hero-img" src={ props.product.image } width="150" height="150" />
                        </a>
                    </Link>
                </td>
                <td className={styles.cart__cell}>
                    <Link href={`product/${ props.product.slug }`}><a className="link">{ props.product.name }</a></Link> <br/>
                    <a href="#" className={styles.cart__itemRemove}>Remove</a>
                </td>
                <td className={styles.cart__cell}>
                    ${ props.product.price }
                </td>
                <td className={styles.cart__cell}>
                    <input 
                        onChange={props.handleChange} 
                        type="number" 
                        value={props.quantity} 
                        step="1" 
                        min="1" 
                        pattern="[0-9]*" 
                        className={styles.cart__qty}
                    />
                </td>
                <td className={styles.cart__cell}>
                    <div>
                    ${ props.totalStatePrice * props.quantity }
                    </div>
                </td>
            </tr>
        </>
    )
}