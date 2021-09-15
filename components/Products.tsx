

interface Props {
  products: Props[]
}

export default function Product(products : Props) {
  console.log(products)
    return (
        <>
            <div className="row products">
            {/* {products.map((product) => {
                return (
                  <Fragment key={product.node.id}>
                    <div className="col-md-3 d-flex flex-column justify-content-center">
                        <Link href={ `/product/${ product.node.slug }` }>
                          <a>
                            <div className={styles.image}>
                              <Image 
                                key={product.node.id} 
                                src={product.node.image.mediaItemUrl} 
                                width="266" 
                                height="266"
                                loading="eager"
                                />
                              </div>
                            </a>
                        </Link>
                      <div className={styles.productBtm}>
                        <Link href={ `/product/${ product.node.slug }` }>
                          <a className={styles.link}>
                            { product.node.name }
                          </a>
                        </Link>
                        <p>{ product.node.price }</p>
                        </div>
                        </div>
                    </Fragment>
                  )
                })} */}
          </div>
        </>
    )
}