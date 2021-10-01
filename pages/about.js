import ImageHero from "../components/ImageHero";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import AboutParagraph from "../components/AboutParagraph";
import Footer from '../components/Footer'
import styles from '../styles/About.module.scss'

export default function About({ page }) {
  console.log(page);
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
      <main>
        <ImageHero mediaItemUrl={page.featuredImage.node.mediaItemUrl} />
        <div className="container">
          <div
            className={styles.about}>
            <h4 className={ styles.about__text }>
              {page.title}
            </h4>
            <AboutParagraph page={page} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(process.env.SITE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      query: `      
      query MyQuery {
        page(id: 28, idType: DATABASE_ID) {
          id
          title
          content
          featuredImage {
            node {
              id
              mediaItemUrl
            }
          }
        }
      }      
      `,
    }),
  });
  const json = await res.json();

  return {
    props: json.data,
    revalidate: 1
  }
}
