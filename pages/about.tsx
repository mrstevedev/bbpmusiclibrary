import Head from "next/head";
import Script from "next/script";

import ImageHero from "@/components/Hero/ImageHero";
import AboutParagraph from "@/components/About/AboutParagraph";

import styles from "@/styles/About.module.scss";

import axios from "axios";
import cookie from "cookie";
import { GET_ABOUT_PAGE } from "@/query/index";

interface IProps {
  page: {
    id: string;
    content: string;
    featuredImage: {
      node: {
        id: string;
        mediaItemUrl: string;
      };
    };
    title: string;
  };
  coupon: {};
}

export default function About({ page }: IProps) {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.remove('Checkout__page')`,
        }}
      />
      <Head>
        <title>Bonita Basics Productions | About</title>
        <meta
          name="description"
          content="Boom Bap HipHop producer from Bonita, California making sample packs with various musicians in his home studio."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.about__mainContainer}>
        <ImageHero about mediaItemUrl={page.featuredImage.node.mediaItemUrl} />
        <div className="container">
          <div className={styles.about}>
            <h4 className={styles.about__text}>{page.title}</h4>
            <AboutParagraph page={page} />
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps<Promise>(context: any) {
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const token = parsedCookies.bbp_token;

  const get_coupons_response = await fetch(
    process.env.NEXT_PUBLIC_COUPONS_URL as string,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const coupon: Awaited<Promise> = await get_coupons_response.json();

  const res = await axios.post(process.env.GRAPHQL_URL as string, {
    query: GET_ABOUT_PAGE,
  });
  const json = await res.data;

  return {
    props: {
      page: json.data.page,
      coupon: coupon,
    },
  };
}
