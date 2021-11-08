import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import styles from "../../styles/Product.module.scss";
import Toast from "../../components/notifications/Toast";
import Head from "next/head";
import { AppContext } from "../../components/context/AppContext";
import { addFirstProduct, updateCart } from "../../util/index";
import Script from "next/script";
import RelatedProducts from '../../components/related/RelatedProducts';
import ProductTabs from '../../components/tabs/ProductTabs';
import ProductSingle from '../../components/product/ProductSingle';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import ProductGallery from '../../components/gallery/ProductGallery';

export default function Product(props) {
  const [addItemToast, setAddItemToast] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [gallery, showGallery] = useState(false);
  const [cart, setCart] = useContext(AppContext);

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    };
  }, [router.events]);

  const handleRouteChange = () => {
    setAddToCart(false)
  }

  const handleAddToCart = () => {

    if (process.browser) {
      let existingCart = localStorage.getItem("product");

      // If cart has item(s) already, update the existing
      if (existingCart) {
        existingCart = JSON.parse(existingCart);
        const qtyToBeAdded = 1;

        const updatedCart = updateCart(existingCart, product, qtyToBeAdded);
      } else {
        /**
         * Add first product
         */
        const newCart = addFirstProduct(product);
        setCart(newCart);
      }
      setAddItemToast(true);
      setAddToCart(true);
    }

    const cartCount = document.querySelector(".cart-count");

    cartCount.classList.add("pop");

    setTimeout(() => {
      setAddItemToast(false);
      cartCount.classList.remove("pop");
    }, 5000);
  };

  const handleCloseToast = () => {
    setAddToCart(false);
  };

  const handleShowImageGallery = (e) => {
    e.preventDefault();

    document.body.classList.add("showGallery");

    showGallery(true);
  };

  const handleCloseImageGallery = () => {
    showGallery(false);
    document.body.classList.remove("showGallery");
  };

  const handleToggleTab = (e) => {
    const $tabLinks = document.querySelectorAll(".nav-link");

    const $tabHome = document.getElementById("nav-home");
    const $tabProfile = document.getElementById("nav-profile");

    if (e.target.id === "nav-home-tab") {
      $tabProfile.classList.remove("show", "active");
      $tabHome.classList.add("show", "active");
    } else if (e.target.id === "nav-profile-tab") {
      $tabHome.classList.remove("show", "active");
      $tabProfile.classList.add("show", "active");
    }

    $tabLinks.forEach((node) => {
      node.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  };

  const handleSlidePrev = () => {
    const productRelated = document.querySelector('.Related_product__related__puyxI')
    const wrapperWidth = parseInt(productRelated.clientWidth)

    const maxScrollLeft = wrapperWidth / 2;

    productRelated.scrollLeft -= maxScrollLeft;
  }

  const handleSlideNext = () => {
    const productRelated = document.querySelector('.Related_product__related__puyxI')
    const wrapperWidth = parseInt(productRelated.clientWidth)

    const maxScrollLeft = wrapperWidth / 2;

    productRelated.scrollLeft += maxScrollLeft;
  }

  const { product } = props;
  const { name, description, price } = props.product;
  const { mediaItemUrl } = props.product.image;


  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.remove('Checkout__page')`,
        }}
      />
      <Head>
        <title>Bonita Basics Productions - {name}</title>
        <meta
          name="description"
          content="Boom Bap HipHop producer from Bonita, California making sample packs with various musicians in his home studio."
        />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="preload" href={mediaItemUrl} as="image" /> */}
      </Head>

      <Toast 
        addItemToast={addItemToast} 
        handleCloseToast={handleCloseToast}
      />

      <ProductGallery 
        product={product} 
        gallery={gallery} 
        handleCloseImageGallery={handleCloseImageGallery} 
      />

      <main className="container">
          <div className={ styles.product }>

          <Breadcrumb 
            product={product} 
            currentPage={ product.name } 
          />

          <ProductSingle 
            product={product}
            addToCart={addToCart}
            handleShowImageGallery={handleShowImageGallery}
            handleAddToCart={handleAddToCart}
          />

        <div className={styles.product__Btm}>
              
          <ProductTabs 
            product={product}
            handleToggleTab={handleToggleTab}
          />

          <RelatedProducts
            product={props.product}
            handleSlidePrev={handleSlidePrev}
            handleSlideNext={handleSlideNext}
          />

        </div>
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
            query SingleProduct($id: ID!, $idType: ProductIdTypeEnum!) {
              product(id: $id, idType: $idType) {
                ... on SimpleProduct {
                  name
                  downloadable
                  downloads {
                    file
                  },
                  databaseId
                  price
                  slug
                  sku
                  shortDescription(format: RAW)
                  productCategories {
                    nodes {
                      id
                      name
                    }
                  }
                  regularPrice
                  salePrice
                }
                description(format: RAW)
                image {
                  mediaItemUrl
                  id
                }
                related {
                  edges {
                    node {
                      id
                      name
                      slug
                      image {
                        mediaItemUrl
                      }
                    }
                  }
                }
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

  // //  Take all the data and return it
  return {
    props: {
      product: json.data.product,
    },
  };
}

export async function getStaticPaths() {

  const res = await fetch(process.env.SITE_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      query: `
        query AllProductsQuery {
          products {
            nodes {
              slug
            }
          }
        }
      `,
    }),
  });

  const json = await res.json();

  const products = json.data.products.nodes;

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: false };
}
