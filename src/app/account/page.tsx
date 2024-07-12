import Banner from "@/components/Banner/Banner";
import { Container } from "react-bootstrap";

import { GET_MEDIA_ITEM_URL } from "@/queries/index";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";

import AuthUserNiceName from "@/components/AuthUser/AuthUserNiceName";
import ProfileNavigation from "@/components/Navigation/ProfileNavigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BBP Music Library | Orders",
};

export default async function page() {
  const { data } = await getData();

  return (
    <Container as="main" fluid>
      <Banner
        profile
        mediaItemUrl={data.page.featuredImage.node.mediaItemUrl}
      />
      <Container as="div">
        <div className="col-sm-12 d-flex">
          <h4>
            Hello, <AuthUserNiceName />
          </h4>
        </div>
        <p style={{ fontWeight: 100 }}>
          View and update your profile information
        </p>
        <GoPreviousNavigate />
        <ProfileNavigation />
      </Container>
    </Container>
  );
}

async function getData() {
  const res = await fetch(process.env.GRAPHQL_URL as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: GET_MEDIA_ITEM_URL,
      variables: { id: 6933 },
    }),
  });

  return res.json();
}
