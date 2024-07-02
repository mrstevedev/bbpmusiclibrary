"use client";
import Link from "next/link";
import { useState, useEffect, useContext, Fragment } from "react";
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
import { labels } from "@/constants/index";

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

export default function NavTab({ product, downloads, terms }) {
  const { auth } = useContext<TAuthContext>(AuthContext);

  const { shortDescription } = product;

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
          <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
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
