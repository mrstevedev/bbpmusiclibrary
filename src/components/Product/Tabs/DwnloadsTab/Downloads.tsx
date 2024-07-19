import { labels } from "@/constants/index";
import { Fragment, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function DownloadsTab({ product, downloads }) {
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
      {data.datasets[0].data.includes(undefined) ? (
        <h4 style={{ fontSize: "1rem", fontWeight: 100 }}>
          This item has not been downloaded yet. Be the first.
        </h4>
      ) : (
        <Line options={options} data={data} />
      )}
    </Fragment>
  );
}
