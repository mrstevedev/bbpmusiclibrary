import styles from '../../styles/Products.module.scss'
import ProductItem from './ProductItem'

interface IProduct {
  node: {
    id: string
    image: {
      mediaItemUrl: string
    }
    name: string
    price: string
    slug: string
    salePrice: string
    regularPrice: string
  }
}

interface IProducts {
    products: IProduct[]
}

export default function Products({ products } : IProducts) {

    return (
        <>
          <div className={`row ${ styles.products }`}>
            <h1>
            Latest Sample Pack Releases 
            <span> Showing { products.length }</span></h1>
            {products.map((product) => {
                return (
                    <ProductItem key={product.node.id} product={product} />
                  )
                })}
          </div>
        </>
    )
}