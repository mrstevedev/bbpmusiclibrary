import Link from "next/link";
import { useState, useEffect, useContext, Fragment } from "react";
import Soundcloud from "../Soundcloud/Soundcloud";
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
import { labels } from "@/util/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import Nav from "react-bootstrap/Nav";
import { TProductTabs } from "@/types/types";

export default function ProductTabs({
  product,
  downloads,
  handleToggleTab,
}: TProductTabs) {
  const { auth } = useContext<TAuthContext>(AuthContext);
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
  }, [downloads]);

  return (
    <Fragment>
      <Nav
        variant="underline"
        className="nav nav-tabs"
        id="nav-tab"
        role="tablist"
      >
        <Nav.Item id="nav-home-tab">
          <Nav.Link
            onClick={handleToggleTab}
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
            eventKey="link-1"
          >
            Listen
          </Nav.Link>
        </Nav.Item>
        <Nav.Item id="nav-profile-tab">
          <Nav.Link
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
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <Soundcloud product={product} />
        </div>
        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          {!auth?.userId && (
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
          )}
          {data.datasets[0].data.includes(undefined) ? (
            <h4>No downloads</h4>
          ) : (
            <Line options={options} data={data} />
          )}
        </div>
      </div>
    </Fragment>
  );
}
