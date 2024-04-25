import styles from "@/styles/Products.module.scss";
import ProductItem from "./ProductItem";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";

import amazonAd from "../../public/images/Amazon-Display-Ad-Arlo.png";

interface IProduct {
  node: {
    id: string;
    image: {
      mediaItemUrl: string;
    };
    name: string;
    price: string;
    slug: string;
    salePrice: string;
    regularPrice: string;
  };
}

interface IProducts {
  products: IProduct[];
}

export default function Products({ products }: IProducts) {
  return (
    <Container fluid className={`${styles.Products}`}>
      <h1>
        Latest Releases
        <span> Showing {products?.length}</span>
      </h1>
      <Row>
        <Col lg="10">
          <Row>
            {products?.map((product) => {
              return (
                <Col key={product.node.name} xs="12" sm="5" lg="4" xl="3">
                  <ProductItem key={product.node.id} product={product} />
                </Col>
              );
            })}
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
  );
}
