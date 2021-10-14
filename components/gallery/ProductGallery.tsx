import styles from "../../styles/Product.module.scss";
import Image from "next/image";

interface IProduct {
  gallery: boolean
  handleCloseImageGallery: () => boolean
  product: {
    name: string
    image: {
      mediaItemUrl: string
    }
  }
}

export default function ProductGallery(props: IProduct) {

  const { product } = props;

  return (
    <>
      {props.gallery === true ? (
        <div
          className={`${styles.imageGallery}`}
          onClick={props.handleCloseImageGallery}
        >
          <div className={styles.imageGalleryTopBar}>
            <h3 className={styles.imageGalleryProductName}>{product.name}</h3>
          </div>
          <Image
            src={product.image.mediaItemUrl}
            width="700"
            height="700"
            alt={`Gallery Image - ${name}`}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
