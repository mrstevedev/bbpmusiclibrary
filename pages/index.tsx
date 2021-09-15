import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import React, { Fragment, useEffect, useState } from "react"
import styles from "../styles/Home.module.scss"
import Footer from '../components/Footer'
import Script from 'next/script'

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
  }
}

export default function Home( { products } : Props ) {
  const [sampleProducts, setSampleProducts] = useState<Props[]>([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    let productImg = document.querySelectorAll(".products img"), i = 1;
    Array.prototype.forEach.call(productImg, (productImg) => { 
    setTimeout(() => { productImg.classList.add("img__visible") }, 400*i)
    i++;
    })
    setSampleProducts(products)

    setTimeout(() => {
      setIsLoading(true)
    }, 2200)    
  }, [products])

  return (
    <>
     <Script
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.remove('Checkout__page')`
      }} />
      <Head>
        <title>Bonita Basics Productions</title>
        <meta name="description" content="Boom Bap HipHop producer from Bonita, California making sample packs with various musicians in his home studio." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.content}>
        <div className="container">
          <div className="row products">
            {products.map((product) => {
                return (
                  <Fragment key={product.node.id}>
                    <div className="col-md-3 d-flex flex-column justify-content-center">
                        <Link href={ `/product/${ product.node.slug }` }>
                          <a>
                            <div className={`${ styles.Home__image } product-img`}>
                              <Image 
                                key={product.node.id} 
                                src={product.node.image.mediaItemUrl} 
                                width="266" 
                                height="266"
                                loading="eager"
                                alt="Product Image"
                                />
                              </div>
                            </a>
                        </Link>
                        <div className={styles.productBtm}>
                          <Link href={ `/product/${ product.node.slug }` }>
                            <a className="link">
                              { product.node.name }
                            </a>
                          </Link>
                          <p>{ product.node.price }</p>
                        </div>
                        </div>
                    </Fragment>
                  )
                })}
          </div>
        </div>
      </main>

      <Footer />
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
        products(first: 6) {
          edges {
            node {
              name
              link
              slug
              ... on SimpleProduct {
                id
                name
                price
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