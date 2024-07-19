"use client";
import Link from "next/link";
import { useState, useContext, Fragment } from "react";
import { useParams } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AuthContext, TAuthContext } from "@/context/AuthContext";
import { MESSAGE, PRODUCT, labels } from "@/constants/index";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type IsProductInCart = boolean;

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import SoundcloudEmbed from "@/components/Product/Tabs/SoundCloudTab/SoundcloudEmbed";
import YouTubeEmbed from "@/components/Product/Tabs/YoutubeTab/YouTubeEmbed";
import { toast } from "react-toastify";
import { CartContext, TCartContext } from "@/context/CartContext";
import { addFirstProduct, updateCart } from "@/util/index";
import TracksTab from "./TracksTab/TracksTab";
import DownloadsTab from "./DwnloadsTab/Downloads";

export default function NavTab({ product, products, downloads, terms }) {
  const params = useParams();
  const { auth } = useContext<TAuthContext>(AuthContext);
  const { cart, setCart } = useContext<TCartContext>(CartContext);

  const [key, setKey] = useState("soundcloud");

  const handleAddSingleItemTrackToCart = async (item) => {
    const existingCart = localStorage.getItem(PRODUCT.BBP_PRODUCT);

    if (existingCart) {
      const existingCartParsed = JSON.parse(existingCart);
      const qtyToBeAdded = 1;

      const isProductInCart: IsProductInCart = existingCartParsed.products.some(
        (item) => item.name.toLowerCase() === params.slug
      );

      if (isProductInCart) {
        toast.warn(MESSAGE.MESSAGE_PRODUCT_IN_CART);
        return;
      }

      const updatedCart = updateCart(existingCartParsed, item, qtyToBeAdded);
      setCart(updatedCart);
      toast.success(MESSAGE.MESSAGE_PRODUCT_ADDED);

      return;
    }
    toast.success(MESSAGE.MESSAGE_PRODUCT_ADDED);
    const newCart = addFirstProduct(item);
    setCart(newCart);
  };

  return (
    <Fragment>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(tab: any) => setKey(tab)}
        className="mb-3"
      >
        <Tab eventKey="soundcloud" title="SoundCloud">
          <SoundcloudEmbed product={product} />
        </Tab>
        <Tab eventKey="youtube" title="YouTube">
          <YouTubeEmbed product={product} />
        </Tab>
        <Tab eventKey="info" title="Track Info">
          <TracksTab
            cart={cart}
            product={product}
            products={products}
            handleAddSingleItemTrackToCart={handleAddSingleItemTrackToCart}
          />
        </Tab>
        <Tab eventKey="legal" title="Terms Of Use">
          <p dangerouslySetInnerHTML={{ __html: terms }} />
        </Tab>
        <Tab eventKey="downloads" title="Downloads">
          {!auth?.userId ? (
            <Fragment>
              <h6>
                Downloads only available for logged in users{" "}
                <Link href="/login" className="link-blue">
                  Log in
                </Link>
              </h6>
              <h6 style={{ fontSize: "0.9rem", fontWeight: "100" }}>
                See how many times this sample pack has been downloaded.
              </h6>
            </Fragment>
          ) : null}

          {auth?.userId ? (
            <DownloadsTab product={product} downloads={downloads} />
          ) : null}
        </Tab>
      </Tabs>
    </Fragment>
  );
}
