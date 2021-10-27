import Link from "next/link"
import Head from "next/head"
import styles from '../../styles/Category.module.scss'
import Script from 'next/script'
import CategoryItem from '../../components/category/CategoryItem'

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
            <CategoryItem products={products} />
        </div>
      </main>
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
