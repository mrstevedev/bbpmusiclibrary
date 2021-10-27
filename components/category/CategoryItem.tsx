
import styles from '../../styles/Category.module.scss'
import Link from "next/link"
import Image from "next/image"
import { trimString } from '../../util/index'

interface IProduct {
    name: string
    slug: string
    image: {
        mediaItemUrl: string
    }
    description: string 
    price: number
}

interface IProducts {
    products: IProduct[]
}

export default function CategoryItem({ products } : IProducts) {
    return (
        <>
            {products.map((product : IProduct) => (
                <div className={styles.category__row} key={product.name}>
                    <div className="product-img">
                        <Link href={{
                            pathname: `/product/${ product.slug }`
                        }}>
                            <a>
                                <Image
                                    src={product.image.mediaItemUrl}
                                    alt="Category Image"
                                    width="350"
                                    height="350"
                                />
                            </a>
                        </Link>
                    </div>
                <div className={ styles.category__results_row_description }>
                    {product.name}
                    <p>{ product.description !== null ? trimString(product.description, 250) : '' }</p>
                    <p>Price: { product.price }</p>
                </div>
            </div>
          ))}
        </>
    )
}