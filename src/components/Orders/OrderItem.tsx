"use client";
import Image from "next/image";
import { Order, TOrder } from "@/types/types";
import Nav from "react-bootstrap/Nav";
import { Fragment } from "react";
import { format } from "date-fns";

export default function OrderItem({ order }: TOrder) {
  return (
    <Nav.Item
      as="li"
      key={order.id}
      style={{ margin: "1rem 0", display: "flex" }}
    >
      {order.line_items.map((data) => {
        return (
          <div key={data.id}>
            <Image
              className="Orders__image"
              src={data.image.src}
              width={200}
              height={200}
              alt={order.line_items[0].name}
              style={{ borderRadius: "4px" }}
            />
          </div>
        );
      })}
      <Nav
        as="ul"
        style={{
          display: "block",
          padding: "0px 1rem",
          listStyle: "none",
          fontWeight: 100,
        }}
      >
        {order.line_items.map((item) => (
          <Fragment key={item.name}>
            <Nav.Item>
              <strong>Filename</strong>
              <div>
                <p>{item.name}</p>
              </div>
            </Nav.Item>
            <Nav.Item>
              <strong>Price</strong>
              <div>
                <p>${item.price}</p>
              </div>
            </Nav.Item>
          </Fragment>
        ))}
        <Nav.Item>
          <div>
            <strong>Purchased</strong>
          </div>
          <p>{format(new Date(order.date_paid), "LLL. dd, yyyy")}</p>
        </Nav.Item>
      </Nav>
    </Nav.Item>
  );
}
