import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Product.module.scss";
import Image from "next/image";
import ACButton from "../../components/ACButton";
import Toast from "../../components/Toast";
import Link from "next/link";
import Head from "next/head";
import { createLink } from "../../util";
import { AppContext } from "../../components/context/AppContext";
import { addFirstProduct, updateCart } from "../../util/index";
import Script from "next/script";
import Soundcloud from '../../components/soundcloud/Soundcloud';
import RelatedProducts from '../../components/related/RelatedProducts';

export default function Product(props) {
  const [addItemToast, setAddItemToast] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [gallery, showGallery] = useState(false);
  const [cart, setCart] = useContext(AppContext);

  console.log(props)


  const handleAddToCart = () => {
    // const addToCartBtn = document.querySelector('.add-to-cart-btn ')
    // addToCartBtn.onclick = function() {
    //   console.log('open sideBar')
    // }

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

  const categories = Object.values(props.product.productCategories.nodes);

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.remove('Checkout__page')`,
        }}
      />
      <Head>
        <title>Bonita Basics Productions | {name}</title>
        <meta
          name="description"
          content="Boom Bap HipHop producer from Bonita, California making sample packs with various musicians in his home studio."
        />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="preload" href={mediaItemUrl} as="image" /> */}
      </Head>

      <Toast addItemToast={addItemToast} handleCloseToast={handleCloseToast} />

      {gallery === true ? (
        <div
          className={`${styles.imageGallery}`}
          onClick={handleCloseImageGallery}
        >
          <div className={styles.imageGalleryTopBar}>
            <h3 className={styles.imageGalleryProductName}>{name}</h3>
          </div>
          <Image src={mediaItemUrl} width="700" height="700" alt={`Gallery Image - ${ name }`} />
        </div>
      ) : (
        ""
      )}

      <main className="container">
          <div className={ styles.product }>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Product</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  { product.name }
                </li>
              </ol>
            </nav>
            <div className={styles.productTop}>

            <a href="#" onClick={handleShowImageGallery}>
              <div className={`product-img ${styles.product__Img}`}>
                <Image
                  loading="eager"
                  src={mediaItemUrl}
                  width="490"
                  height="490"
                  alt={`Product Image - ${ name }`} 
                />
              </div>
            </a>


          <div className={styles.productDescription}>
            <h3 styles={styles.productDescriptionTxt}>{name}</h3>
            <h4>{ product.salePrice ? (
              <>
                <span style={{ textDecoration: 'line-through', color: 'red', padding: '0 0.2rem' }}>{ product.regularPrice }</span>
                <span style={{ color: 'grey' }}> { product.salePrice }</span>
              </>
            ) : product.regularPrice }</h4>
            <p>{description}</p>
            <h4 className={styles.productCategoriesTxt}>
              Categories:{" "}
              <span
                className="category__wrapper"
                style={{ color: "#1a1a1a" }}
                dangerouslySetInnerHTML={{
                  __html: createLink(categories, "a"),
                }}
              ></span>
            </h4>
            <ACButton product={product}
              addToCart={addToCart}
              handleAddToCart={handleAddToCart}
              productPage
              />
          </div>
        </div>

        <div className={styles.product__Btm}>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                onClick={handleToggleTab}
                className="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Listen
              </button>
              <button
                onClick={handleToggleTab}
                className="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Downloads
              </button>
              {/* <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button> */}
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
           {/* Soundcloud */}
            <Soundcloud
              product={product}
            />
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <p>
                Show a graph using a graph library of downloads that occur
                throughout a year.
              </p>

              <p>
                Donec sollicitudin molestie malesuada. Donec sollicitudin
                molestie malesuada. Praesent sapien massa, convallis a
                pellentesque nec, egestas non nisi. Praesent sapien massa,
                convallis a pellentesque nec, egestas non nisi. Pellentesque in
                ipsum id orci porta dapibus. Praesent sapien massa, convallis a
                pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.
                Nulla quis lorem ut libero malesuada feugiat. Curabitur aliquet
                quam id dui posuere blandit. Sed porttitor lectus nibh.
              </p>
            </div>
          </div>

            {/* Related Products Slideshow */}
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
  console.log('context', context)
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
