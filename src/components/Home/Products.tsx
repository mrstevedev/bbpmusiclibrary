"use client";
import Image from "next/image";
import { delay } from "@/util/index";
import { Fragment, useCallback, useEffect, useState } from "react";
import styles from "@/styles/Products.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { GET_PRODUCTS } from "@/queries/index";
import { useQuery } from "@apollo/client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import amazonAd from "@/public/images/Amazon-Display-Ad-Arlo.png";
import ProductItem from "@/components/Home/ProductItem";
import Spinner from "@/components/Spinner/Spinner";
import ProductHeader from "@/components/Home/ProductHeader";

export default function Products({ params }) {
  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: { after: null },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { isIntersecting, observerRef } = useIntersectionObserver(data);

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
      <div className={styles.BBP_Products_Loading__Spinner}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.BBP_Products_Loading__Spinner}>
        <p>There was an error. Try again later</p>
      </div>
    );
  }

  const length = data?.products.edges?.length;

  return (
    <Fragment>
      <Container fluid className={`${styles.BBP__Products}`}>
        <ProductHeader length={length} />
        <Row>
          {/* Was ar 10 */}
          <Col lg="12">
            <Row>
              {data?.products.edges
                ? data?.products.edges?.map(({ node }) => {
                    return (
                      <ProductItem
                        id={node.databaseId}
                        key={node.databaseId}
                        product={node}
                      />
                    );
                  })
                : null}
            </Row>
          </Col>
          {/* Ad column */}
          {/* <Col className={styles.BBP_Products__Ad}>
            <Image
              src={amazonAd}
              alt="amazonAd"
              className={styles.BBP_Products_Ad__Image}
            />
          </Col> */}
        </Row>
      </Container>
      <div ref={observerRef} />
      {isLoading ? (
        <div className={styles.BBP_Load_More__Spinner}>
          <Spinner />
        </div>
      ) : (
        <div>
          <h2 className={styles.BBP_Load_More_Spinner__Text}>
            No more products
          </h2>
        </div>
      )}
    </Fragment>
  );
}
