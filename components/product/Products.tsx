import React, { Fragment } from "react"
import ProductItem from '../../components/product/ProductItem'

interface IProduct {
  node: {
    id: string
    image: {
      mediaItemUrl: string
    }
    name: string
    price: string
    slug: string
  }
}

interface IProducts {
    products: IProduct[]
}

export default function Products({ products } : IProducts) {

    return (
        <>
          <div className="row products">
            {products.map((product) => {
                return (
                    <ProductItem product={product} />
                  )
                })}
          </div>
        </>
    )
}