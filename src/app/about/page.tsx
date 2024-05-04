import Banner from "@/components/Banner/Banner";
import AboutParagraph from "@/components/About/About";
import styles from "@/styles/About.module.scss";
import { GET_ABOUT_PAGE } from "@/query/getAboutPage";

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

export default async function page() {
  const { data } = await getData();
  console.log(data.page.featuredImage.node.mediaItemUrl);

  return (
    <>
      <Banner about mediaItemUrl={data.page.featuredImage.node.mediaItemUrl} />
      <div className="container">
        <div className={styles.about}>
          <h4 className={styles.about__text}>{data.page.title}</h4>
          <AboutParagraph page={data.page} />
        </div>
      </div>
    </>
  );
}
