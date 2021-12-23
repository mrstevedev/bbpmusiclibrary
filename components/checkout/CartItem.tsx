import styles from '../../styles/Checkout.module.scss'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
    product: {
        databaseId: string,
        name: string,
        image: string
        price: number,
        slug: string
    }
    productsCount: number
    price: number
}

export default function CartItem(props : IProps) {

    const { productsCount } = props
    const { databaseId, slug, image, name, price } = props.product

    return (
        <>
            <div key={ databaseId } className={styles.Checkout__right_product}>
                <div className={`product-img ${styles.Checkout__right_product_img}`}>
                    <Link href={`/product/${ slug }`}>
                        <a>
                            <span className={styles.cart__count}>{ productsCount }</span>
                            <Image src={image} width="91" height="91" alt={ name } />
                        </a>
                    </Link>
                </div>
                    <div className={styles.Checkout__right_product_name}>
                        <h3 className={styles.Checkout__right_product_name_txt}>
                            <Link href={`/product/${ slug }`}>
                                <a>
                                    { name }
                                </a>
                            </Link>
                        </h3>
                    </div>
                <span>{ price }</span>
            </div>
        </>
    )
}