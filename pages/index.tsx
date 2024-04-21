import React, { useState, useEffect } from "react";
import cookie from "cookie";
import Head from "next/head";
import Products from "@/components/Home/Products";
import { GET_PRODUCTS } from "@/query/index";
import Spinner from "@/components/Spinner/Spinner";
import styles from "@/styles/Spinner.module.scss";
import { useQuery } from "@apollo/client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Home() {
  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: { after: null },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { isIntersecting, observerRef } = useIntersectionObserver(data);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchMoreProducts = async () => {
    const { endCursor } = data.products.pageInfo;
    setIsLoading(true);
    await delay(1200);
    fetchMore({
      variables: { after: endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.products.edges = [
          ...prevResult.products.edges,
          ...fetchMoreResult.products.edges,
        ];
        setIsLoading(false);
        return fetchMoreResult;
      },
    });
  };

  useEffect(() => {
    if (isIntersecting && data.products.pageInfo.hasNextPage !== false) {
      fetchMoreProducts();
    }
  }, [isIntersecting]);

  const products = data?.products.edges;

  if (loading) {
    return (
      <div className={styles.Spinner__Container}>
        <Spinner />
      </div>
    );
  }

  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <Head>
        <title>
          Bonita Basics Productions Music Library - Purchase and Download
          Hip-Hop Sample Packs
        </title>
        <meta
          name="description"
          content="Boom Bap Hip-Hop producer from Bonita, California making sample packs with various musicians in his home studio."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Bonita Basics Productions Music Library - Purchase and Download Hip-Hop Sample Packs"
        />
        <meta
          property="og:description"
          content="Boom Bap Hip-Hop producer from Bonita, California making sample packs with various musicians in his home studio."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bbpmusiclibrary.com/" />
        <meta property="og:image" content="./images/img1200.webp" />
      </Head>

      <Products products={products} />

      <div ref={observerRef} />

      {isLoading ? (
        <div className={styles.Spinner__Container}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.Spinner__Container}>
          <h5
            style={{
              fontWeight: "bold",
              fontSize: "0.8rem",
            }}
          >
            No more products
          </h5>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({ req }) {
  const parsedCookies = cookie.parse(req.headers.cookie ?? "");
  const token = parsedCookies ? parsedCookies.bbp_token : null;
  const customerId = parsedCookies ? parsedCookies.customer_id : null;

  const auth_user_url = process.env.AUTH_USER_URL as string;

  const payload = {
    username: process.env.CREATE_USER_USERNAME,
    password: process.env.CREATE_USER_PASSWORD,
  };

  const response_generate_usable_jwt = token
    ? await fetch(auth_user_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    : null;

  const response_generate_usable_jwt_json =
    await response_generate_usable_jwt?.json();

  const usable_token = response_generate_usable_jwt_json?.token;

  const get_coupons_response = await fetch(process.env.COUPONS_URL as string, {
    headers: {
      Authorization: "Bearer " + usable_token,
    },
  });

  const coupon = await get_coupons_response.json();

  // Pass data to the page via props
  return {
    props: {
      coupon: coupon ? coupon : null,
      token: token ? token : null,
    },
  };
}
