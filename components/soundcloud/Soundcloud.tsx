import styles from "@/styles/Soundcloud.module.scss";

type Categories = {
  name: string;
};

type Related = {
  node: {
    id: string;
    image: {
      mediaItemUrl: string;
    };
    name: string;
    slug: string;
  };
};

type Product = {
  product: {
    databaseId: number;
    description: string;
    downloadable: true;
    image: {
      mediaItemUrl: string;
      id: string;
    };
    name: string;
    price: string;
    productCategories: {
      nodes: Categories[];
    };
    regularPrice: string;
    related: { edges: Related[] };
    salePrice: string;
    shortDescription: string;
    sku: string;
    slug: string;
  };
};

export default function Soundcloud({ product }: Product) {
  return (
    <>
      <iframe
        key={product.databaseId}
        width="100%"
        height="300"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${product.sku}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
      ></iframe>
      <div>
        <a
          href=""
          title="Polyphonic Music Library"
          target="_blank"
          rel="noreferrer"
          className={styles.Soundcloud__name}
        >
          Polyphonic Music Library
        </a>{" "}
        ·
        <a
          href={product.shortDescription}
          title="1.Soul Expressions (Kit Preview)"
          target="_blank"
          rel="noreferrer"
          className={styles.Soundcloud__shortDescription}
        >
          {" "}
          {product.name}
        </a>
      </div>
    </>
  );
}
