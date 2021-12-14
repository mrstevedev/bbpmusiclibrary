import styles from "../../styles/Product.module.scss";
import Image from "next/image";
import ACButton from "../product/ACButton";
import { createLink } from "../../util";

interface IProduct {
    addToCart: boolean
    handleAddToCart: () => boolean
    handleShowImageGallery: () => boolean
    product: {
        name: string,
        description: string
        price: string
        image: {
            mediaItemUrl: string
        }
        productCategories: {
            nodes: {

            }
        }
        salePrice: string
        regularPrice: string
    }
}

export default function ProductSingle(props: IProduct) {

    const { product } = props;
    const { name, description, price } = props.product;
    const { mediaItemUrl } = props.product.image;

    const categories = Object.values(props.product.productCategories.nodes);

    return (
        <>
            <div className={styles.productTop}>
                <a href="#" onClick={props.handleShowImageGallery}>
                <div className={`product-img ${styles.product__Img}`}>
                    <Image
                    loading="eager"
                    src={mediaItemUrl}
                    width="490"
                    height="490"
                    alt={`Product Image - ${ name }`} 
                    />
                </div>
                </a>
                    <div className={styles.productDescription}>
                    <h3 className={styles.productDescriptionTxt}>{name}</h3>
                    <h4>{ product.salePrice ? (
                    <>
                        <span className={styles.Product__RegularPrice}>{ product.regularPrice }</span>
                        <span className={styles.Product__SaleTxt}> { product.salePrice }</span>
                    </>
                    ) : product.regularPrice }</h4>
                    <p>{description}</p>
                    <h4 className={styles.productCategoriesTxt}>
                    Categories:{" "}
                    <span
                        className="category__wrapper"
                        style={{ color: "#1a1a1a" }}
                        dangerouslySetInnerHTML={{
                        __html: createLink(categories, "a"),
                        }}
                    ></span>
                    </h4>
                    <ACButton product={product}
                        addToCart={props.addToCart}
                        handleAddToCart={props.handleAddToCart}
                        productPage
                    />
                    </div>
                    </div>
        </>
    )
}