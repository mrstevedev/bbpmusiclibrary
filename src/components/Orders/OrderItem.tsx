"use client";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import { format } from "date-fns";
import styles from "@/styles/Orders.module.scss";

export default function OrderItem({ orderNumber, date, lineItems }) {
  return (
    <Nav.Item as="li">
      {lineItems.map((data) => {
        return (
          <div key={data.product.databaseId} className={styles.BBP__OrderItems}>
            <Image
              width={200}
              height={200}
              alt={data.product.name}
              src={data.product.image.mediaItemUrl}
              className={styles.BBP__OrderItem_Image}
            />

            <Nav as="ul" className={styles.BBP__OrderItem_List}>
              <Nav.Item>
                <strong>Order ID</strong>
                <p>{orderNumber}</p>
              </Nav.Item>
              <Nav.Item>
                <strong>Filename</strong>
                <p>{data.product.name}</p>
              </Nav.Item>
              <Nav.Item>
                <strong>Price</strong>
                <p>{data.product.price}</p>
              </Nav.Item>
              <Nav.Item>
                <strong>Purchased</strong>
                <p>{format(new Date(date), "LLL. dd, yyyy")}</p>
              </Nav.Item>
            </Nav>
          </div>
        );
      })}
    </Nav.Item>
  );
}
