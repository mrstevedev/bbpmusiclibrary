import { Container } from "react-bootstrap";
import Banner from "@/components/Banner/Banner";
import { GET_MEDIA_ITEM_URL } from "@/query/getMediaItemUrl";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";
import UnsubscribeButton from "@/components/Buttons/UnsubscribeButton";
import { toast } from "react-toastify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BBP Music Library | Unsubscribe",
};

export default async function page() {
  const data = await getPageData();
  const { featuredImage } = data.data.page;
  return (
    <Container as="main" fluid>
      <Banner profile mediaItemUrl={featuredImage.node.mediaItemUrl} />
      <Container as="main">
        <h4>Newsletter</h4>
        <p style={{ fontWeight: 100 }}>
          To unsubscribe from the newsletter click the unsubscribe button below
        </p>
        <GoPreviousNavigate />
        <UnsubscribeButton />
      </Container>
    </Container>
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
        variables: { id: "22078" },
      }),
    });
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
}
