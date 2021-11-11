import Head from "next/head"
import React, { useEffect, useState } from "react"
import styles from "../styles/Home.module.scss"
import Script from 'next/script'
import Products from '../components/home/Products'
import CoverImage from "../components/coverimages/CoverImage"

interface Props {
  products: Props[],
  node: {
    id: string,
    image: {
      mediaItemUrl: string
    },
    link: string,
    name: string,
    price: string, 
    slug: string
    regularPrice: string
    salePrice: string
  }
}

export default function Home( { products } : Props ) {
  const [sampleProducts, setSampleProducts] = useState<Props[]>([])

  useEffect(() => {
    setSampleProducts(products)
  }, [products])

  return (
    <>
     <Script
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.remove('Checkout__page')`
      }} />
      <Head>
        <title>Bonita Basics Productions Music Library - Purchase and Download Hip-Hop Sample Packs</title>
        <meta name="description" content="Boom Bap Hip-Hop producer from Bonita, California making sample packs with various musicians in his home studio." />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Bonita Basics Productions Music Library - Purchase and Download Hip-Hop Sample Packs"/>
        <meta property="og:description" content="Boom Bap Hip-Hop producer from Bonita, California making sample packs with various musicians in his home studio."/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://bbpmusiclibrary.com/"/>
        <meta property="og:image" content="./images/img1200.webp"/>

      </Head>

      <main className={styles.content}>

      <CoverImage />

        <div className="container">

          <h1 style={{ fontWeight: 100, margin: '3rem 0 2rem 0', fontSize: '0.7rem', textTransform: 'uppercase' }}>Latest Sample Pack Releases 
            <span style={{ color: '#939393' }}> Showing { products.length }</span></h1>

          <Products 
            products={products}
          />

        </div>
      </main>


    </>
  );
}

export async function getStaticProps() {

  const res = await fetch(process.env.SITE_URL as string, {
    method: 'POST',
    headers: { 
      'Content-type': 'application/json' 
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
        products {
          edges {
            node {
              name
              link
              slug
              ... on SimpleProduct {
                id
                name
                price
                regularPrice
                salePrice
              }
              image {
                mediaItemUrl
              }
            }
          }
        }
      }      
      `
    })
  });

  const json = await res.json()

  //  Take all the data and return it
  return {
    props: {
      products: json.data.products.edges
    }
  }
}