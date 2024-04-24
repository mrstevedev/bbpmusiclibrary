import { useContext, useEffect } from "react";
import styles from "@/styles/Profile.module.scss";
import ImageHero from "@/components/Hero/ImageHero";
import { AuthContext, TAuthContext } from "context/AuthContext";
import { Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import cookie from "cookie";
import { GET_MEDIA_ITEM_URL } from "@/query/index";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";

interface IProps {
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
  coupon: {};
}

export default function Profile({ page }: IProps) {
  const router = useRouter();

  const { auth, setAuth } = useContext<TAuthContext>(AuthContext);

  const handleLogoutUser = () => {
    setAuth({});
    localStorage.removeItem("bbp_user");
    router.push("/");
  };

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  return (
    <Container as="main" fluid className={styles.profile__mainContainer}>
      <ImageHero profile mediaItemUrl={page.featuredImage.node.mediaItemUrl} />
      <Container as="div">
        <div className="col-sm-12 d-flex">
          <h4 className={styles.profile__text}>
            Hello,
            <span className={styles.profile__text} style={{ color: "#ccc" }}>
              {" "}
              {auth?.userNiceName}
            </span>
          </h4>
        </div>
        <p style={{ fontWeight: 100 }}>
          View and update your profile information
        </p>
        <GoPreviousNavigate />
        <div className={styles.profile__content} style={{ margin: "1.5rem 0" }}>
          <Nav
            as="ul"
            style={{
              listStyle: "none",
              padding: "0",
              lineHeight: 2,
              textTransform: "uppercase",
              fontSize: "0.7rem",
              display: "block",
            }}
          >
            <Nav.Item as="li" style={{ display: "flex" }}>
              <Nav.Link>
                <Link href="/profile/orders">
                  <span className="link">Orders</span>
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" style={{ display: "flex" }}>
              <Nav.Link>
                <Link href="/profile/downloads">
                  <span className="link">Downloads</span>
                </Link>
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item as="li" style={{ display: "flex" }}>
              <Nav.Link>
                <Link href="/profile/update">
                  <span className="link">Update Info</span>
                </Link>
              </Nav.Link>
            </Nav.Item> */}
            <Nav.Item as="li" style={{ display: "flex" }}>
              <Nav.Link>
                <Link href="/profile/update">
                  <span className="link" onClick={handleLogoutUser}>
                    Logout
                  </span>
                </Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </Container>
    </Container>
  );
}

export async function getServerSideProps<Promise>(context: any) {
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const token = parsedCookies.bbp_token;

  const get_coupons_response = await fetch(
    process.env.NEXT_PUBLIC_COUPONS_URL as string,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const coupon: Awaited<Promise> = await get_coupons_response.json();

  const res = await axios.post(process.env.GRAPHQL_URL as string, {
    query: GET_MEDIA_ITEM_URL,
  });
  const json = await res.data;

  return {
    props: {
      page: json.data.page,
      coupon: coupon,
    },
  };
}
