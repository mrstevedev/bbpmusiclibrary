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
          <h1 style={{ fontWeight: 100, margin: '0 0 2rem 0', fontSize: '0.7rem', textTransform: 'uppercase' }}>
            Latest Sample Pack Releases 
            <span style={{ color: '#939393' }}> Showing { products.length }</span></h1>
            {products.map((product) => {
                return (
                    <ProductItem key={product.node.id} product={product} />
                  )
                })}
          </div>
        </>
    )
}