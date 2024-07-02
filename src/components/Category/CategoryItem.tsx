import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { trimString } from "@/util/index";
import styles from "@/styles/Category.module.scss";
import { TProductsCategoryItems } from "@/types/types";

export default function CategoryItem({ products }: TProductsCategoryItems) {
  return (
    <Fragment>
      {products.map(
        ({
          databaseId,
          slug,
          price,
          description,
          name,
          image: { mediaItemUrl },
        }) => {
          return (
            <div key={databaseId} className={styles.BBP_Category__Row}>
              <div className="product-img">
                <Link href={{ pathname: `/product/${slug}` }}>
                  <Image
                    priority
                    src={mediaItemUrl}
                    alt={name}
                    width={350}
                    height={350}
                    className={styles.BBP_Category_Row__Image}
                  />
                </Link>
              </div>
              <div className={styles.BBP_Category_results_description}>
                <strong>{name}</strong>
                <p>
                  {description !== null ? trimString(description, 250) : ""}
                </p>
                <p>
                  <strong>Price:</strong> {price}
                </p>
                <Link href={{ pathname: `/product/${slug}` }}>
                  <Button>Go to product</Button>
                </Link>
              </div>
            </div>
          );
        }
      )}
    </Fragment>
  );
}
