import styles from "@/styles/Movies.module.scss";
import CoverImage from "@/components/CoverImage/CoverImage";
import { Container } from "react-bootstrap";
import cookie from "cookie";
import axios from "axios";
import { GET_VIDEOS_PAGE } from "@/query/getVideosPage";

export default function Videos({ page: { title } }) {
  return (
    <>
      <CoverImage />
      <Container as="main">
        <h1 className={styles.Movies__heading}>{title}</h1>

        <iframe
          width="960"
          height="615"
          src="https://www.youtube.com/embed/UJsgB1fWqQQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <iframe
          width="960"
          height="615"
          src="https://www.youtube.com/embed/Z0O6jRflTrI"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Container>
    </>
  );
}

export async function getServerSideProps<Promise>(context) {
  const parsedCookie = cookie.parse(context.req.headers.cookie);
  const token = parsedCookie.bbp_token;

  const get_coupon_response = await fetch(
    process.env.NEXT_PUBLIC_COUPONS_URL as string,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const coupon = await get_coupon_response.json();

  const res = await axios.post(process.env.GRAPHQL_URL as string, {
    query: GET_VIDEOS_PAGE,
  });
  const json = await res.data;

  return {
    props: {
      page: json.data.page,
      coupon: coupon,
    },
  };
}
