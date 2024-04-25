import { Image } from "react-bootstrap";
import styles from "@/styles/Product.module.scss";

interface IProduct {
  gallery: boolean;
  handleCloseImageGallery: () => void;
  product: {
    name: string;
    image: {
      mediaItemUrl: string;
    };
  };
}

export default function ProductGallery({
  gallery,
  handleCloseImageGallery,
  product: {
    name,
    image: { mediaItemUrl },
  },
}: IProduct) {
  return (
    <>
      {gallery === true ? (
        <div
          className={`${styles.imageGallery}`}
          onClick={handleCloseImageGallery}
        >
          <div className={styles.imageGalleryTopBar}>
            <h3 className={styles.imageGalleryProductName}>{name}</h3>
          </div>
          <Image
            src={mediaItemUrl}
            width="700"
            height="700"
            alt={`Gallery Image - ${name}`}
          />
        </div>
      ) : null}
    </>
  );
}
