import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import { cookies } from "next/headers";

import Banner from "@/components/Banner/Banner";
import OrderItem from "@/components/Orders/OrderItem";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";

import { GET_MEDIA_ITEM_URL, GET_CUSTOMER_ORDERS } from "@/queries/index";
import { generateJSONWebToken } from "@/util/generateJWTToken";
import { ProfileOrderItem } from "@/types/types";
import { Metadata } from "next";

import styles from "@/styles/Orders.module.scss";

export const metadata: Metadata = {
  title: "BBP Music Library | Orders",
};

export default async function Orders() {
  const { data } = await getPageData();
  const { title, featuredImage } = data.page;
  const { customer } = await getOrdersData();

  return (
    <Container as="main" fluid>
      <Banner profile mediaItemUrl={featuredImage.node.mediaItemUrl} />
      <Container as="main">
        <h4>{title}</h4>
        <p className={styles.BBP__Orders_SubHeading}>View your recent orders</p>
        <GoPreviousNavigate />
        <Nav as="ul" className={styles.BBP__Orders_Nav}>
          {customer.orders.edges.length ? (
            customer.orders.edges.map((order: ProfileOrderItem) => {
              return (
                <OrderItem
                  orderNumber={order.node.orderNumber}
                  date={order.node.datePaid}
                  key={order.node.datePaid}
                  lineItems={order.node.lineItems.nodes}
                />
              );
            })
          ) : (
            <h6 className={styles.BBP__No_Orders_Message}>
              You currently have no orders.
            </h6>
          )}
        </Nav>
      </Container>
    </Container>
  );
}

async function getPageData() {
  const res = await fetch(process.env.GRAPHQL_URL as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_MEDIA_ITEM_URL,
      variables: { id: "6861" },
    }),
  });

  return res.json();
}

async function getOrdersData() {
  const cookieStore = cookies();
  const id = cookieStore.get("bbp_customer_id")?.value;
  const graphql_url = `${process.env.GRAPHQL_URL}`;

  try {
    const GET_CUSTOMER_ORDERS_QUERY = JSON.stringify({
      query: GET_CUSTOMER_ORDERS,
      variables: { customerId: Number(id) },
    });

    const orders_response = await fetch(graphql_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await generateJSONWebToken()),
      },
      body: GET_CUSTOMER_ORDERS_QUERY,
    });
    const json = await orders_response.json();
    const data = json.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
