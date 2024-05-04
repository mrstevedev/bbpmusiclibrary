import styles from "@/styles/Related.module.scss";
import RelatedItem from "src/components/Product/Related/RelatedItem";

export default function RelatedItems({ product }) {
  return (
    <div className={styles.related}>
      <h2 className={styles.related__heading}>Related Products</h2>
      <RelatedItem product={product} />
    </div>
  );
}
