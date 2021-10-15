import { Fragment } from 'react'
import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/Home.module.scss"

interface IProduct {
  product: {
    node: {
      id: string
      name: string
      price: string
      slug: string
      image: {
        mediaItemUrl: string
      }
    }
  }
}

export default function ProductItem({ product } : IProduct) {
  return (
    <Fragment key={product.node.id}>
      <div className="col-md-3 d-flex flex-column justify-content-center">
        <Link href={`/product/${product.node.slug}`}>
          <a>
            <div className={`${styles.Home__image} product-img`}>
              <Image
                key={product.node.id}
                src={
                  product.node.image !== null
                    ? product.node.image.mediaItemUrl
                    : "http://localhost:10028/wp-content/uploads/2021/10/websiteplanet-dummy-640X640.webp"
                }
                width="266"
                height="266"
                loading="eager"
                alt={`Bonita Basics Productions Music Library, ${ product.node.name }`}
              />
            </div>
          </a>
        </Link>
        <div className={styles.productBtm}>
          <Link href={`/product/${product.node.slug}`}>
            <a className="link">{product.node.name}</a>
          </Link>
          <p>{product.node.price}</p>
        </div>
      </div>
    </Fragment>
  );
}
