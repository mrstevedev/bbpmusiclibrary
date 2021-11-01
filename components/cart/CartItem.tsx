
import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Cart.module.scss'

interface IProduct {
    name: string
    image: string
    price: number
    qty: number
    totalPrice: number
    slug: string
}

interface IProducts {
    products: IProduct[]
    quantity: number
    totalStatePrice: number
    handleChange: (event: any) => void
}

export default function CartItem(props: IProducts) {
    return (
        <>
             { props.products ? props.products.map((product: IProduct) => (
                <Fragment key={product.name}>
                    <tr className={styles.cart__itemRow}>
                        <td className={ styles.cart__itemImg }>
                            <Link href={`product/${ product.slug }`}>
                                <a>
                                    <Image className="hero-img" src={ product.image } width="150" height="150" />
                                </a>
                            </Link>
                        </td>
                        <td>
                            <Link href={`product/${ product.slug }`}><a className="link">{ product.name }</a></Link> <br/>
                            <a href="#" className={styles.cart__itemRemove}>Remove</a>
                        </td>
                        <td>
                            ${ product.price }
                        </td>
                        <td>
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
                        <td>
                            <div>
                            ${ props.totalStatePrice * props.quantity }
                            </div>
                        </td>
                    </tr>
                </Fragment>
            )) : 'There are no items in your cart' }
        </>
    )
}