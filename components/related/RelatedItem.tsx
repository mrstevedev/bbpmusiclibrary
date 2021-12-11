import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Related.module.scss";

interface IEdges {
    node: {
        id: string
        image: {
            mediaItemUrl: string    
        }
        name: string
        slug: string
    }
}

interface ICategories {

}

interface IProduct {
    product: {
        related: {
            edges: IEdges[]
        }
    }
}

export default function RelatedItem(props: IProduct) {
    return (
        <>
            { props.product.related.edges.map((item: IEdges) => (
                <div key={item.node.id} className={ `product-img ${ styles.product__relatedItem } ` }>
                    <Link href={ `${ item.node.slug }` }>
                      <a>
                        <div className={styles.product__Img}>
                          <Image src={item.node.image !== null ? item.node.image.mediaItemUrl : 'http://localhost:10028/wp-content/uploads/2021/10/websiteplanet-dummy-640X640.webp' } width="400" height="400" alt={`Bonita Basics Productions Music Library - ${ item.node.name }`} />
                          
                        </div>
                      </a>
                    </Link>
                  <Link href={ `${ item.node.slug }` }>
                    <a className="link">
                      <p className={ styles.RelatedItem__name }>{ item.node.name }</p>
                    </a>
                  </Link>
                </div>
              )) }
        </>
    )
}