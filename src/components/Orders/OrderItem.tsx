"use client";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import { Fragment } from "react";
import { format } from "date-fns";

export default function OrderItem({ orderNumber, date, lineItems }) {
  return (
    <Nav.Item as="li" style={{ margin: "1rem 0" }}>
      {lineItems.map((data) => {
        return (
          <div
            key={data.product.databaseId}
            style={{ display: "flex", margin: "1rem 0" }}
          >
            <Image
              className="Orders__image"
              src={data.product.image.mediaItemUrl}
              width={200}
              height={200}
              alt={data.product.name}
              style={{ borderRadius: "4px" }}
            />

            <Nav
              as="ul"
              style={{
                display: "block",
                padding: "0px 1rem",
                listStyle: "none",
                fontWeight: 100,
                lineHeight: "1.15",
              }}
            >
              <Fragment>
                <Nav.Item>
                  <strong>Order ID</strong>
                  <div>
                    <p>{orderNumber}</p>
                  </div>
                </Nav.Item>
                <Nav.Item>
                  <strong>Filename</strong>
                  <div>
                    <p>{data.product.name}</p>
                  </div>
                </Nav.Item>
                <Nav.Item>
                  <strong>Price</strong>
                  <div>
                    <p>{data.product.price}</p>
                  </div>
                </Nav.Item>
              </Fragment>
              <Nav.Item>
                <div>
                  <strong>Purchased</strong>
                </div>
                <p>{format(new Date(date), "LLL. dd, yyyy")}</p>
              </Nav.Item>
            </Nav>
          </div>
        );
      })}
    </Nav.Item>
  );
}
