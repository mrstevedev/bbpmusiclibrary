"use client";
import Link from "next/link";
import { useState, useEffect, useContext, Fragment } from "react";
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
import { Line } from "react-chartjs-2";
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

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import SoundcloudPlayer from "@/components/SoundCloud/SoundcloudPlayer";
import YouTubeEmbed from "@/components/YouTube/YouTubeEmbed";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { CartContext, TCartContext } from "@/context/CartContext";

export default function NavTab({ product, products, downloads, terms }) {
  const params = useParams();
  const { auth } = useContext<TAuthContext>(AuthContext);
  const { cart, setCart } = useContext<TCartContext>(CartContext);

  const [key, setKey] = useState("soundcloud");
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "",
        data: [] as (number | undefined)[],
        borderColor: "",
        backgroundColor: "",
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  });
  const [options, setOptions] = useState({});

  useEffect(() => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    };

    const filtered = downloads.length
      ? downloads.filter((download) => {
          return download.product_id === product.databaseId;
        })
      : null;

    const updateDownloads = filtered
      ? filtered?.length > 0
        ? filtered?.map(({ date, ...rest }) => {
            const locale =
              navigator.languages != undefined
                ? navigator.languages[0]
                : navigator.language;
            return {
              ...rest,
              month: new Date(date).toLocaleDateString(locale, {
                month: "long",
              }),
              year: new Date(date).getFullYear(),
            };
          })
        : null
      : null;

    const data = {
      labels,
      datasets: [
        {
          label: `Downloads In ${new Date().getFullYear()}`,
          data: generateData(),
          borderColor: "rgb(0, 0, 0)",
          backgroundColor: "rgba(0, 0, 0, 1)",
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };

    function generateData() {
      return labels.map(
        (month) => updateDownloads?.filter((obj) => obj.month === month).length
      );
    }

    setOptions(options);
    setData(data);
  }, [downloads, product.databaseId]);

  const handleAddSingleItemToCart = async (item) => {
    console.log(item);
    const existingCart = localStorage.getItem(PRODUCT.BBP_PRODUCT);

    if (existingCart) {
      const existingCartParsed = JSON.parse(existingCart);
      const qtyToBeAdded = 1;

      const isProductInCart = existingCartParsed.products.some(
        (item) => item.name.toLowerCase() === params.slug
      );

      if (isProductInCart) {
        toast.warn(MESSAGE.MESSAGE_PRODUCT_IN_CART);
        return;
      }
      console.log("Add another single product to cart");
    }
    console.log("Add single product to cart");
  };

  return (
    <Fragment>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k: any) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="soundcloud" title="SoundCloud">
          <SoundcloudPlayer product={product} />
        </Tab>
        <Tab eventKey="youtube" title="YouTube">
          <YouTubeEmbed product={product} />
        </Tab>
        <Tab eventKey="info" title="Track Info">
          <strong>Tracklist for {product.name}</strong>
          <ol>
            {products.nodes.map((item) => (
              <li key={item} className="pt-1">
                {item.name}{" "}
                <Button
                  variant="sm"
                  className="add-to-cart-btn"
                  style={{ fontSize: "0.7rem", background: "#f4f4f4" }}
                  onClick={() => handleAddSingleItemToCart(item)}
                >
                  Buy $3.99
                </Button>
              </li>
            ))}
          </ol>
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
            <Fragment>
              {data.datasets[0].data.includes(undefined) ? (
                <h4 style={{ fontSize: "1rem" }}>
                  This item has not been downloaded yet. Be the first.
                </h4>
              ) : (
                <Line options={options} data={data} />
              )}
            </Fragment>
          ) : null}
        </Tab>
      </Tabs>
    </Fragment>
  );
}
