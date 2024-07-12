import { Container } from "react-bootstrap";
import { GET_CONTACT_PAGE } from "@/queries/index";
import Banner from "@/components/Banner/Banner";
import ContactForm from "@/components/Forms/Contact/ContactForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "BBP Music Library | Bonita Basics Productions Music Library | Contact",
  description:
    "About BBPMusicLibrary, Sample Curator, Digital download Sample Packs for Hip Hop, Boom Bap music production",
};

export default async function Contact() {
  const { data } = await getData();
  const imgUrl = data.page.featuredImage.node.mediaItemUrl;

  return (
    <Container as="main" fluid>
      <Banner contact mediaItemUrl={imgUrl} />
      <ContactForm />
    </Container>
  );
}

async function getData() {
  const res = await fetch(process.env.GRAPHQL_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_CONTACT_PAGE,
      variables: { id: 18649 },
    }),
  });
  return res.json();
}
