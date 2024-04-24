import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

import styles from "@/styles/Category.module.scss";
import CategoryItem from "@/components/category/CategoryItem";

import cookie from "cookie";

import { useRouter } from "next/router";

import { GET_CATEGORIES } from "@/query/getCategories";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";
import { Container } from "react-bootstrap";

interface IPageProps {
  category: {
    products: {
      nodes: IProduct[];
    };
  };
  name: string;
}

interface IProduct {
  description: string;
  image: { mediaItemUrl: string };
  name: string;
  price: string;
  slug: string;
}

export default function Category({ name, category }: IPageProps) {
  const router = useRouter();

  const { products } = category;
  const productLength = category.products.nodes.length;
  return (
    <>
      <Head>
        <title>Bonita Basics Productions | {name}</title>
        <meta
          name="description"
          content="Boom Bap HipHop producer from Bonita, California making sample packs with various musicians in his home studio."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container as="main" className="container">
        <div className={styles.category}>
          <GoPreviousNavigate />
          <h4 className={styles.category__results}>
            There are {productLength} matching{" "}
            <span className={styles.category__results_name}>{name}</span>
          </h4>
          <CategoryItem products={products.nodes} />
        </div>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const parsed = cookie.parse(context.req.headers.cookie);
  const token = parsed.bbp_token;

  const { slug } = context.query;

  const coupon_response = await fetch(
    process.env.NEXT_PUBLIC_COUPONS_URL as string,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const get_category_response = await fetch(process.env.GRAPHQL_URL as string, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      query: GET_CATEGORIES,
      variables: {
        id: slug,
        idType: "SLUG",
      },
    }),
  });

  const coupon = await coupon_response.json();
  const json = await get_category_response.json();
  const category = json.data.productCategory;

  return {
    props: {
      coupon: coupon,
      category: category,
    },
  };
}
