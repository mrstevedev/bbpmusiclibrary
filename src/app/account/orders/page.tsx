import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import { cookies } from "next/headers";

import Banner from "@/components/Banner/Banner";
import OrderItem from "@/components/Orders/OrderItem";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";

import { GET_CUSTOMER_ORDERS } from "@/query/getOrders";
import { generateJSONWebToken } from "@/util/generateJWTToken";
import { GET_MEDIA_ITEM_URL } from "@/query/getMediaItemUrl";
import { ProfileOrderItem } from "@/types/types";
import { Metadata } from "next";

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
        <div className="col-sm-12 d-flex">
          <h4>{title}</h4>
        </div>
        <div className="col-sm-12 d-flex">
          <p style={{ fontWeight: 100 }}>View your recent orders</p>
        </div>
        <GoPreviousNavigate />
        <Nav as="ul" style={{ display: "block", padding: "0 0 7rem" }}>
          {customer.orders.edges.length ? (
            customer.orders.edges.map((order: ProfileOrderItem) => {
              console.log("order:", order);
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
            <div style={{ margin: "1rem 0", fontWeight: 100 }}>
              <h6 style={{ fontWeight: 100 }}>You currently have no orders.</h6>
            </div>
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
