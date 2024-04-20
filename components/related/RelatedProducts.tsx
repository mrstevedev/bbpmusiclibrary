import styles from "@/styles/Related.module.scss";
import RelatedItem from "../Related/RelatedItem";

interface IEdges {
  node: {
    id: string;
    image: {
      mediaItemUrl: string;
    };
    name: string;
    slug: string;
  };
}

interface IProduct {
  handleSlidePrev: () => void;
  handleSlideNext: () => void;
  product: {
    related: {
      edges: IEdges[];
    };
  };
}

export default function RelatedProducts({
  product,
  handleSlidePrev,
  handleSlideNext,
}: IProduct) {
  return (
    <>
      <div className={styles.related}>
        <h2 className={styles.related__heading}>Related Products</h2>
        <RelatedItem
          product={product}
          handleSlidePrev={handleSlidePrev}
          handleSlideNext={handleSlideNext}
        />
      </div>
    </>
  );
}
