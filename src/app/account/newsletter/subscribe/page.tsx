import { Fragment } from "react";
import { Container } from "react-bootstrap";
import SubscribeForm from "@/components/Forms/Subscribe/SubscribeForm";
import styles from "@/styles/Subscribe.module.scss";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";
import { GET_MEDIA_ITEM_URL } from "@/queries/index";
import Banner from "@/components/Banner/Banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BBP Music Library | Subscribe",
};

export default async function Subscribe() {
  const data = await getPageData();
  const { content, featuredImage } = data.data.page;

  return (
    <Fragment>
      <Container as="main" fluid>
        <Banner profile mediaItemUrl={featuredImage.node.mediaItemUrl} />
        <Container as="main">
          <h4>Newsletter</h4>
          <p
            style={{ fontWeight: 100 }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <GoPreviousNavigate />
          <div className={styles.BBP_Subscribe__Container}>
            <SubscribeForm />
          </div>
        </Container>
      </Container>
    </Fragment>
  );
}

async function getPageData() {
  const graphql_url = `${process.env.GRAPHQL_URL}`;

  try {
    const res = await fetch(graphql_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_MEDIA_ITEM_URL,
        variables: { id: "22056" },
      }),
    });

    return res.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
    }
  }
}
