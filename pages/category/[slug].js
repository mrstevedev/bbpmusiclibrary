import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import styles from '../../styles/Category.module.scss'
import { trimString } from '../../util/index'
import Script from 'next/script'
import Footer from '../../components/Footer'

export default function Category(data) {
  const productLength = data.category.productCategory.products.nodes.length
  const products = data.category.productCategory.products.nodes;
  const { name } = data.category.productCategory;
  
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.remove('Checkout__page')`
      }} />
      <Head>
        <title>Bonita Basics Productions | { name }</title>
        <meta name="description" content="Boom Bap HipHop producer from Bonita, California making sample packs with various musicians in his home studio." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <div className={ styles.category }>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item"><a href="#">Category</a></li>
              <li className="breadcrumb-item active" aria-current="page">{name}</li>
            </ol>
          </nav>
          <h4 className={ styles.category__results }>
            There are { productLength } matching{" "}
            <span className={ styles.category__results_name }>{name}</span>
          </h4>
          {products.map((prod) => (
            <div className={styles.category__row} key={prod.name}>
              <div className="product-img">
                <Link href={{
                  pathname: `/product/${ prod.slug }`
                }}>
                  <a>
                    <Image
                      src={prod.image.mediaItemUrl}
                      alt="Category Image"
                      width="350"
                      height="350"
                    />
                  </a>
                </Link>
              </div>
              <div className={ styles.category__results_row_description }>
                {prod.name}
                <p>{ prod.shortDescription !== null ? trimString(prod.shortDescription, 250) : '' }</p>
                <p>Price: { prod.price }</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {

  const res = await fetch(process.env.SITE_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      query: `
        query allProducts($id: ID!, $idType: ProductCategoryIdType! ) {
          productCategory(id: $id, idType: $idType) {
            products {
              nodes {
                name
                image {
                  mediaItemUrl
                }
                description(format: RAW)
                slug
                ... on SimpleProduct {
                  price
                }
              }
            }
            name
          }
        }      
      `,
      variables: {
        id: context.params.slug,
        idType: "SLUG",
      },
    }),
  });

  const json = await res.json();

  return {
    props: {
      // products: json.data.productCategory.products.nodes,
      category: json.data,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(process.env.SITE_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      query: `
          query AllCategories {
            productCategories {
              nodes {
                slug
              }
            }
          }
        `,
    }),
  });

  const json = await res.json();

  const categories = json.data.productCategories.nodes;

  const paths = categories.map((cat) => ({
    params: { slug: cat.slug },
  }));

  return { paths, fallback: false };
}
