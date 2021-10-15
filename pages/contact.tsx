import Head from 'next/head'
import ImageHero from "../components/ImageHero";
import styles from '../styles/Contact.module.scss'
import AboutParagraph from "../components/AboutParagraph";

interface IPage {
    page: {
        id: string
        content: string | null
        title: string
        featuredImage: {
            node: {
                id: string | null
                mediaItemUrl: string | null
            }
        }
    }
}

export default function Contact( { page } : IPage ) {
    console.log('contact page props', page)
    return (
        <>
            <Head>
                <title>Bonita Basics Productions | Contact</title>
                    <meta
                    name="description"
                    content="Boom Bap HipHop producer from Bonita, California making sample packs with various musicians in his home studio."
                    />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={ styles.contact__mainContainer }>
                <ImageHero contact mediaItemUrl={page.featuredImage.node.mediaItemUrl} />
                <div className="container">
                    <div
                        className={styles.contact}>
                        <h4 className={ styles.contact__text }>
                        {page.title}
                        </h4>
                        <AboutParagraph page={page} />
                    </div>
                    </div>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch(process.env.SITE_URL as string, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        query: `      
        query MyQuery {
          page(id: 1946, idType: DATABASE_ID) {
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