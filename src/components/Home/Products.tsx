"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import styles from "@/styles/Products.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";

import { GET_PRODUCTS } from "src/query/index";
import { useQuery } from "@apollo/client";

import { useIntersectionObserver } from "src/hooks/useIntersectionObserver";

import amazonAd from "@/public/images/Amazon-Display-Ad-Arlo.png";
import { TProducts } from "src/types/types";

import ProductItem from "./ProductItem";
import Spinner from "../Spinner/Spinner";

export default function Products() {
  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: { after: null },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { isIntersecting, observerRef } = useIntersectionObserver(data);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchMoreProducts = useCallback(async () => {
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
  }, [data?.products.pageInfo, fetchMore]);

  useEffect(() => {
    if (isIntersecting && data.products.pageInfo.hasNextPage !== false) {
      fetchMoreProducts();
    }
  }, [isIntersecting, data?.products.pageInfo.hasNextPage, fetchMoreProducts]);

  if (loading) {
    return (
      <div
        className={styles.Spinner__Container}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <Fragment>
      <Container fluid className={`${styles.Products}`}>
        <h1>
          Latest Releases
          <span> Showing {data?.products.edges.length}</span>
        </h1>
        <Row>
          <Col lg="10">
            <Row>
              {data?.products.edges
                ? data?.products?.edges.map(({ node }) => {
                    return (
                      <Col key={node.name} xs="12" sm="5" lg="4" xl="3">
                        <ProductItem key={node.id} product={node} />
                      </Col>
                    );
                  })
                : null}
            </Row>
          </Col>
          <Col className={styles.Products__ad}>
            <Image
              src={amazonAd}
              alt="amazonAd"
              className={styles.Products_ad__img}
            />
          </Col>
        </Row>
      </Container>
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
    </Fragment>
  );
}
