import styles from "../../styles/Related.module.scss";
import RelatedItem from "./RelatedItem";

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
    handleSlidePrev: () => void
    handleSlideNext: () => void
    databaseId: number
    description: string
    downloadable: boolean
    downloads: null
    image: {
        id: string
        mediaItemUrl: string
    }
    name: string 
    price: string
    productCategories: ICategories[]
    product: {
        related: {
            edges: IEdges[]
        }
    }
}

export default function RelatedProducts( props: IProduct ) {
  const { product } = props

    return (
        <>
         <div className={ styles.related }>
            <button onClick={props.handleSlidePrev} className={ `${ styles["carousel__control"] } ${ styles["carousel__control--prev"] }` }type="button" aria-describedby="carousel-status-s0-0-32-3-0-0[6]-4-match-media-0-ebay-carousel" aria-label="Go to previous slide - Samsung Cell Phones &amp; Smartphones" aria-disabled="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z" fill="currentColor" /></svg>
            </button>
            <button onClick={props.handleSlideNext} className={ `${ styles["carousel__control"] } ${ styles["carousel__control--next"] }` } type="button" aria-describedby="carousel-status-s0-0-32-3-0-0[6]-4-match-media-0-ebay-carousel" aria-label="Go to next slide - Samsung Cell Phones &amp; Smartphones" id="s0-0-32-3-0-0[6]-4-match-media-0-ebay-carousel-next">
              <svg style={{ margin: "0 0.19rem 0 0" }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z" fill="currentColor"/></svg>
            </button>
            <div className={ styles.product__related }>
              <h2 style={{ fontSize: '1rem', fontWeight: 'bold' }}>Related Products</h2>
              <div className={ styles.product__relatedGallery }>
                <RelatedItem product={product} />
              </div>
            </div>
          </div>
        </>
    )
}