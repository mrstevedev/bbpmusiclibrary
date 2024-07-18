import { Fragment } from "react";
import { Line } from "react-chartjs-2";

export default function DownloadsTab({ downloads, options }) {
  return (
    <Fragment>
      {downloads.datasets[0].data.includes(undefined) ? (
        <h4 style={{ fontSize: "1rem", fontWeight: 100 }}>
          This item has not been downloaded yet. Be the first.
        </h4>
      ) : (
        <Line options={options} data={downloads} />
      )}
    </Fragment>
  );
}
