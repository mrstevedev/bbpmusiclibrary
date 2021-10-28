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
          <div className="row products">
            {products.map((product) => {
                return (
                    <ProductItem key={product.node.id} product={product} />
                  )
                })}
          </div>
        </>
    )
}