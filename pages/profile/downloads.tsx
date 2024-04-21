import { Fragment, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ImageHero from "@/components/Hero/ImageHero";
import { AuthContext, TAuthContext } from "context/AuthContext";
import styles from "@/styles/Profile.module.scss";
import { GET_DOWNLOADS_PAGE } from "@/query/index";
import cookie from "cookie";
import axios from "axios";
import { Container, Nav } from "react-bootstrap";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";
import { TDownload } from "@/types/types";

interface IPageProps {
  downloads: TDownload[];
  page: {
    id: string;
    content: string;
    featuredImage: {
      node: {
        id: string;
        mediaItemUrl: string;
      };
    };
    title: string;
  };
}

export default function Downloads({
  downloads,
  page: { content, featuredImage, title },
}: IPageProps) {
  const router = useRouter();
  const { auth } = useContext<TAuthContext>(AuthContext);

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth]);

  const stripped_content = content.replace(/<[^>]*>?/gm, "");
  return (
    <Container as="main" fluid className={styles.profile__mainContainer}>
      <ImageHero profile mediaItemUrl={featuredImage.node.mediaItemUrl} />
      <Container as="main">
        <div className="col-sm-12 d-flex">
          <h4 className={styles.profile__text}>{title}</h4>
        </div>
        <p style={{ fontWeight: 100 }}>{stripped_content}</p>
        <GoPreviousNavigate />
        <Nav as="ul" style={{ display: "block" }}>
          {downloads ? (
            downloads?.map((data: TDownload) => (
              <Fragment key={data["order_id"]}>
                <Nav.Item style={{ margin: "1rem 0" }}>
                  <h6 style={{ margin: 0 }}>Name</h6>
                  <span style={{ fontWeight: "100" }}>{data.product_name}</span>
                </Nav.Item>
                <Nav.Item style={{ margin: "0.6rem 0" }}>
                  <h6 style={{ margin: 0 }}>Expires</h6>
                  <span style={{ fontWeight: "100" }}>
                    <p>{data.access_expires}</p>
                  </span>
                </Nav.Item>
                <Nav.Item
                  style={{
                    margin: "0.6rem 0",
                    padding: "0 0 1rem 0",
                    borderBottom: "solid 1px #e2e2e2",
                  }}
                >
                  <h6 style={{ margin: 0 }}>File</h6>
                  <span style={{ fontWeight: "100" }}>
                    <Link href={data.download_url}>
                      <a className="link-blue">Download {data.product_name}</a>
                    </Link>
                  </span>
                </Nav.Item>
              </Fragment>
            ))
          ) : (
            <div style={{ margin: "2rem 0" }}>
              <h6>You have no downloads</h6>
            </div>
          )}
        </Nav>
        {downloads && (
          <div className="row">
            <div className="col-sm-12 mt-4">
              <p style={{ fontWeight: "bold", color: "#F00" }}>
                There was an error. Please try again
              </p>
            </div>
          </div>
        )}
      </Container>
    </Container>
  );
}

export async function getServerSideProps<Promise>(context: any) {
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const token = parsedCookies.bbp_token;
  const id = parsedCookies.bbp_customer_id;

  const get_coupons_response = await fetch(
    process.env.NEXT_PUBLIC_COUPONS_URL as string,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const coupon: Awaited<Promise> = await get_coupons_response.json();

  const get_downloads_response = await fetch(
    `${process.env.NEXT_PUBLIC_CUSTOMERS_URL}/${id}/downloads`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const data = await get_downloads_response.json();

  const downloads: Awaited<Promise> = data.length
    ? data.sort((a, b) => b.order_id - a.order_id)
    : null;

  const res = await axios.post(process.env.GRAPHQL_URL as string, {
    query: GET_DOWNLOADS_PAGE,
  });
  const json = await res.data;
  return {
    props: {
      page: json.data.page,
      downloads: downloads,
      coupon: coupon,
    },
  };
}
