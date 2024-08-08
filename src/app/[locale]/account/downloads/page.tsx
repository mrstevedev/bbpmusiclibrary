import axios from "axios";
import { Fragment } from "react";
import { format } from "date-fns";
import { cookies } from "next/headers";
import styles from "@/styles/Downloads.module.scss";
import { Container, ListGroup, Nav } from "react-bootstrap";
import { generateJSONWebToken } from "@/util/generateJWTToken";
import Banner from "@/components/Banner/Banner";
import DownloadRequestItem from "@/components/Downloads/DownloadRequestItem";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";
import { GET_CUSTOMER_DOWNLOADS, GET_MEDIA_ITEM_URL } from "@/queries/index";
import { DATE } from "@/constants/index";
import { groupDownloadItems } from "@/util/index";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BBP Music Library | Downloads",
};

export default async function page() {
  const { data } = await getPageData();
  const { customer } = await getCustomerDownloads();
  const downloads = await getDownloadAnalytics();
  const cookieStore = cookies();
  const user = cookieStore.get("bbp_customer_id");
  const userId = user?.value;

  const { title, featuredImage } = data.page;

  const len = customer.downloadableItems.edges.length;
  const downloadItems = customer.downloadableItems.edges;
  const groupedDownloades = Object.entries(groupDownloadItems(downloads)).sort(
    (a, b) => b[0].localeCompare(a[0])
  );

  return (
    <Container as="main" fluid>
      <Banner profile mediaItemUrl={featuredImage.node.mediaItemUrl} />
      <Container as="main">
        <h4>{title}</h4>
        <p className={styles.BBP__Downloads_Subheading}>
          Download your purchased files.
        </p>

        <GoPreviousNavigate />
        <Nav as="ul" className={styles.BBP__Downloads}>
          {groupedDownloades.map(([key, value]: any) => {
            const user_id = value[0].user_id;
            if (user_id === Number(userId)) {
              return (
                <Fragment key={key}>
                  <h6 className={styles.BBP__Downloads_Heading}>
                    Order#: {key}
                  </h6>
                  <div className={styles.BBP_Downloads__Row}>
                    {value.map((data) => {
                      return (
                        <DownloadRequestItem
                          key={data.id}
                          customer={customer}
                          downloads={data}
                        />
                      );
                    })}
                  </div>
                </Fragment>
              );
            }
          })}

          {downloads.length >= 1 ? null : (
            <Fragment>
              {len > 0 ? (
                <h6 className={styles.BBP__Downloads_Downloads_Message}>
                  You have {len} {len === 1 ? "item" : "items"} sent to{" "}
                  <strong>{customer.email}</strong> that{" "}
                  {len === 1 ? "has" : "have"} not been downloaded.
                </h6>
              ) : (
                <Fragment>
                  <p className={styles.BBP__Downloads_No_Downloads_Message}>
                    You have no downloads.
                  </p>
                  <p className={styles.BBP__Downloads_No_Downloads_Message}>
                    Request downloads will be available 8 hours after first
                    download.
                  </p>
                </Fragment>
              )}
            </Fragment>
          )}

          {downloadItems.map((order) => {
            return (
              <h6 key={order.node.downloadId}>
                Files have been sent to your email
              </h6>
            );
          })}

          <ListGroup>
            {downloadItems.map((order) => {
              return (
                <ListGroup.Item key={order.node.downloadId}>
                  {order.node.product.name}{" "}
                  <span className={styles.BBP__Downloads_Downloads_Expires}>
                    (expires on{" "}
                    {format(order.node.accessExpires, DATE.DATE_FORMAT)})
                  </span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Nav>
      </Container>
    </Container>
  );
}

async function getPageData() {
  const response = await fetch(process.env.GRAPHQL_URL as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_MEDIA_ITEM_URL,
      variables: { id: 6832 },
    }),
  });

  return response.json();
}

async function getDownloadAnalytics() {
  const downloads_url = `${process.env.DOWNLOADS_URL}`;
  const response_downloads_analytics = await fetch(downloads_url, {
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + (await generateJSONWebToken()),
    },
  });

  const data = await response_downloads_analytics.json();
  return data;
}

async function getCustomerDownloads() {
  const cookieStore = cookies();
  const id = cookieStore.get("bbp_customer_id")?.value;
  const graphql_url = `${process.env.GRAPHQL_URL}`;

  const GET_CUSTOMER_DOWNLOADS_QUERY = JSON.stringify({
    query: GET_CUSTOMER_DOWNLOADS,
    variables: { customerId: Number(id) },
  });

  const response = await axios.post(graphql_url, GET_CUSTOMER_DOWNLOADS_QUERY, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await generateJSONWebToken()),
    },
  });

  return response.data.data;
}
