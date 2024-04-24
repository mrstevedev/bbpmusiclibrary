import { useContext, useEffect, useState, MouseEvent, useRef } from "react";

import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";

import cookie from "cookie";

import { addFirstProduct, updateCart } from "@/util/index";

import styles from "@/styles/Product.module.scss";

import RelatedProducts from "@/components/related/RelatedProducts";
import ProductTabs from "@/components/Tabs/ProductTabs";
import ProductSingle from "@/components/product/ProductSingle";
import ProductGallery from "@/components/gallery/ProductGallery";

import { CartContext } from "@/context/CartContext";
import { TCartContext } from "@/context/CartContext";

import { GET_SINGLE_PRODUCT } from "@/query/index";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";

import { TCoupon, TDownloads } from "@/types/types";

interface IProduct {
  coupon: TCoupon[];
  downloads: TDownloads[];
  product: {
    databaseId: number;
    description: string;
    downloadable: true;
    image: {
      mediaItemUrl: string;
      id: string;
    };
    name: string;
    price: string;
    productCategories: {
      nodes: INodes[];
    };
    regularPrice: string;
    related: { edges: IEdges[] };
    salePrice: string;
    shortDescription: string;
    sku: string;
    slug: string;
  };
}

interface INodes {
  name: string;
}

interface IEdges {
  node: {
    id: string;
    image: {
      mediaItemUrl: string;
    };
    name: string;
    slug: string;
  };
}

export default function Product({ product, downloads }: IProduct) {
  const router = useRouter();
  const curSlide = useRef(0);

  const [addToCart, setAddToCart] = useState(false);
  const [gallery, showGallery] = useState(false);

  const { setCart } = useContext<TCartContext>(CartContext);

  const { name, description } = product;
  const { mediaItemUrl } = product.image;

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const handleRouteChange = () => {
    setAddToCart(false);
  };

  const handleAddToCart = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem("bbp_product");

      /**
       * If cart has item(s) already, update the existing
       *  */
      if (existingCart) {
        existingCart = JSON.parse(existingCart);
        const qtyToBeAdded = 1;

        const updatedCart = updateCart(existingCart, product, qtyToBeAdded);

        setCart(updatedCart);
      } else {
        /**
         * Add first product
         */
        const newCart = addFirstProduct(product);

        setCart(newCart);
      }
      toast.success("Added item to cart");
      setAddToCart(true);

      const cartCount = document.querySelector(".cart-count");
      cartCount?.classList.add("pop");
    }
  };

  const handleShowImageGallery = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.body.classList.add("showGallery");
    showGallery(true);
  };

  const handleCloseImageGallery = () => {
    showGallery(false);
    document.body.classList.remove("showGallery");
  };

  const handleToggleTab = (event: any) => {
    const tabLinks = document.querySelectorAll(".nav-link");
    const tabHome = document.getElementById("nav-home");
    const tabProfile = document.getElementById("nav-profile");

    if (event.target.id === "nav-home-tab") {
      tabProfile?.classList.remove("show", "active");
      tabHome?.classList.add("show", "active");
    } else if (event.target.id === "nav-profile-tab") {
      tabHome?.classList.remove("show", "active");
      tabProfile?.classList.add("show", "active");
    }
    tabLinks.forEach((node) => {
      node.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
  };

  const handleSlidePrev = () => {
    const slides = document.querySelectorAll(".slide") as any;
    let maxSlide = slides.length - 1;
    if (curSlide.current === 0) {
      curSlide.current = maxSlide;
    } else {
      curSlide.current--;
    }

    slides.forEach((slide, index) => {
      console.log(index, curSlide);
      slide.style.transform = `translateX(${
        100 * (index - curSlide.current)
      }%)`;
    });
  };

  const handleSlideNext = () => {
    const slides = document.querySelectorAll(".slide") as any;
    let maxSlide = slides.length - 1;
    // console.log(curSlide, maxSlide);

    if (curSlide.current === maxSlide) {
      curSlide.current = 0;
    } else {
      curSlide.current++;
    }

    slides.forEach((slide, index) => {
      console.log(index, curSlide);
      slide.style.transform = `translateX(${
        100 * (index - curSlide.current)
      }%)`;
    });
  };

  return (
    <>
      <Head>
        <title>{`Bonita Basics Productions - ${name}`}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductGallery
        product={product}
        gallery={gallery}
        handleCloseImageGallery={handleCloseImageGallery}
      />

      <Container className={styles.product}>
        <ProductSingle
          product={product}
          addToCart={addToCart}
          handleShowImageGallery={handleShowImageGallery}
          handleAddToCart={handleAddToCart}
        />

        <ProductTabs
          downloads={downloads}
          product={product}
          handleToggleTab={handleToggleTab}
        />

        <RelatedProducts
          product={product}
          handleSlidePrev={handleSlidePrev}
          handleSlideNext={handleSlideNext}
        />
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const parsedCookies = cookie.parse(context.req.headers.cookie ?? "");
  const token = parsedCookies.bbp_token;
  const customerId = parsedCookies ? parsedCookies.customer_id : null;

  const auth_user_url = process.env.AUTH_USER_URL as string;

  const payload = {
    username: process.env.CREATE_USER_USERNAME,
    password: process.env.CREATE_USER_PASSWORD,
  };

  const response_generate_usable_jwt = token
    ? await fetch(auth_user_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    : null;

  const response_generate_usable_jwt_json =
    await response_generate_usable_jwt?.json();

  const usable_token = response_generate_usable_jwt_json?.token;

  const { slug } = context.query;

  const res = await fetch(process.env.DOWNLOADS_URL as string, {
    headers: {
      Authorization: "Bearer " + usable_token,
    },
  });
  const res2 = await fetch(process.env.GRAPHQL_URL as string, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      query: GET_SINGLE_PRODUCT,
      variables: {
        id: slug,
        idType: "SLUG",
      },
    }),
  });
  const res3 = await fetch(process.env.COUPONS_URL as string, {
    headers: {
      Authorization: "Bearer " + usable_token,
    },
  });
  const downloads = await res.json();
  const productJson = await res2.json();
  const product = productJson.data.product;
  const coupon = await res3.json();

  // Pass data to the page via props
  return { props: { downloads, product, coupon, slug } };
}
