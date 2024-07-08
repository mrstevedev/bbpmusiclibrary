export const revalidate = 3600;
import { Fragment } from "react";
import { Container } from "react-bootstrap";
import styles from "@/styles/Product.module.scss";

import RelatedProducts from "@/components/Product/Related/RelatedItems";
import ProductItem from "@/components/Product/Item/ProductItem";
import ProductTabs from "@/components/Product/Tabs/ProductTabs";

import { TYPE } from "@/constants/index";
import { GET_SINGLE_PRODUCT } from "@/query/getSingleProduct";
import { generateJSONWebToken } from "@/util/generateJWTToken";
import { GET_MEDIA_ITEM_URL } from "@/query/getMediaItemUrl";

export default async function Product({ params }) {
  const { data: pageTerms } = await getTerms();
  const { data } = await getProduct(params);
  const downloads = await getDownloads();
  const product = data.product;

  const { content: terms } = pageTerms.page;

  return (
    <Fragment>
      <Container className={styles.BBP__Product}>
        <ProductItem product={product} />
        <ProductTabs downloads={downloads} product={product} terms={terms} />
        <RelatedProducts product={product} />
      </Container>
    </Fragment>
  );
}

// or Dynamic metadata
export async function generateMetadata({ params }) {
  const SLUG = params.slug;

  const product = await fetch(process.env.GRAPHQL_URL as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_SINGLE_PRODUCT,
      variables: { id: SLUG, idType: TYPE.ID_TYPE },
    }),
  });

  const { data } = await product.json();

  const { name, description } = data.product;

  return {
    title: `BBP Music Library | Bonita Basics Productions Music Library - ${name}`,
    description: description,
  };
}

async function getTerms() {
  const response = await fetch(process.env.GRAPHQL_URL as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_MEDIA_ITEM_URL,
      variables: { id: 22652 },
    }),
  });

  return response.json();
}

async function getProduct(params) {
  const SLUG = params.slug;
  const response_product = await fetch(process.env.GRAPHQL_URL as string, {
    method: "POST",
    /**
     * ? For some reason case insensitive "Content-type" returns incorrect databaseId
     *  */
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_SINGLE_PRODUCT,
      variables: { id: SLUG, idType: TYPE.ID_TYPE },
    }),
  });

  return await response_product.json();
}

async function getDownloads() {
  const downloads_url = process.env.DOWNLOADS_URL as string;

  const response_downloads = await fetch(downloads_url, {
    headers: {
      Authorization: "Bearer " + (await generateJSONWebToken()),
    },
  });
  const data = await response_downloads.json();

  return data;
}
