import styles from "@/styles/Related.module.scss";
import RelatedItem from "@/components/Product/Related/RelatedItem";

export default function RelatedItems({ product }) {
  return (
    <div className={styles.BBP__Related}>
      <h2 className={styles.BBP_Related__Heading}>Related Products</h2>
      <RelatedItem product={product} />
    </div>
  );
}
