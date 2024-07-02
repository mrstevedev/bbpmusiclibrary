import { Container } from "react-bootstrap";
import styles from "@/styles/Category.module.scss";
import { GET_PRODUCTS_CATEGORY } from "@/query/getCategories";
import CategoryItem from "@/components/Category/CategoryItem";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "BBP Music Library | Bonita Basics Productions Music Library | Categories",
  description:
    "About BBPMusicLibrary, Sample Curator, Digital download Sample Packs for Hip Hop, Boom Bap music production",
};

export default async function Category({ params }) {
  const { data } = await getCategory(params);
  const { name } = data.productCategory;
  const { nodes: products } = data.productCategory.products;
  const length = products.length;

  return (
    <Container as="main" className="container">
      <div className={styles.BBP_Category}>
        <GoPreviousNavigate />
        <h4 className={styles.BBP_Category__Results}>
          There are {length} matching{" "}
          <span className={styles.BBP_Category_Results__Name}>{name}</span>
        </h4>
        <CategoryItem products={products} />
      </div>
    </Container>
  );
}

async function getCategory(params) {
  const slug = params.slug;
  const url = `${process.env.GRAPHQL_URL}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: GET_PRODUCTS_CATEGORY,
      variables: {
        id: slug,
        idType: "SLUG",
      },
    }),
  });

  return await res.json();
}
