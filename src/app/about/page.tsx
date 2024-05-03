import Banner from "src/components/Banner/Banner";
import AboutParagraph from "src/components/About/About";

import styles from "@/styles/About.module.scss";

import { GET_ABOUT_PAGE } from "src/query/index";
import { Metadata } from "next";

async function getData() {
  const res = await fetch(process.env.GRAPHQL_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_ABOUT_PAGE,
    }),
  });

  return res.json();
}

export const metadata: Metadata = {
  title: "About Bonita Basics Productions Music Library",
  description:
    "Download Sample Packs - Hip Hop, Boom Bap, Soul, Jazz - Sample Curator",
};

export default async function page() {
  const { data } = await getData();

  return (
    <main className={styles.about__mainContainer}>
      <Banner about mediaItemUrl={data.page.featuredImage.node.mediaItemUrl} />
      <div className="container">
        <div className={styles.about}>
          <h4 className={styles.about__text}>{data.page.title}</h4>
          <AboutParagraph page={data.page} />
        </div>
      </div>
    </main>
  );
}
