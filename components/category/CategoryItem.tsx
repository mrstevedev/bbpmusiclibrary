import styles from "../../styles/Category.module.scss";
import Link from "next/link";
import Image from "next/image";
import { trimString } from "../../util/index";
import { Button } from "react-bootstrap";

interface IProduct {
  description: string;
  image: { mediaItemUrl: string };
  name: string;
  price: string;
  slug: string;
}

interface IProducts {
  products: IProduct[];
}

export default function CategoryItem({ products }: IProducts) {
  return (
    <>
      {products.map((product: IProduct) => (
        <div className={styles.category__row} key={product.name}>
          <div className="product-img">
            <Link
              href={{
                pathname: `/product/${product.slug}`,
              }}
            >
              <a>
                <Image
                  src={product.image.mediaItemUrl}
                  alt="Category Image"
                  width="350"
                  height="350"
                  className={styles.category__row__img}
                />
              </a>
            </Link>
          </div>
          <div className={styles.category__results_row_description}>
            <strong>{product.name}</strong>
            <p>
              {product.description !== null
                ? trimString(product.description, 250)
                : ""}
            </p>
            <p className={styles.category__price}>Price: {product.price}</p>
            <Link
              href={{
                pathname: `/product/${product.slug}`,
              }}
            >
              <Button>Go to product</Button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
