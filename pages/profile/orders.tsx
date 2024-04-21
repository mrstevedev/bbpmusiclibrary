import axios from "axios";
import ImageHero from "@/components/Hero/ImageHero";
import styles from "@/styles/Profile.module.scss";
import Image from "next/image";
import { Fragment, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext, TAuthContext } from "context/AuthContext";
import { GET_ORDERS_PAGE } from "@/query/getOrdersPage";
import Nav from "react-bootstrap/Nav";
import { format } from "date-fns";
import cookie from "cookie";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";
import { TOrders } from "@/types/types";
import { Container } from "react-bootstrap";

interface IProps {
  orders: [];
  page: {
    id: string;
    content: string;
    title: string;
    featuredImage: {
      node: {
        id: string;
        mediaItemUrl: string;
      };
    };
  };
}

export default function Orders({
  orders,
  page: {
    title,
    content,
    featuredImage: {
      node: { mediaItemUrl },
    },
  },
}: IProps) {
  const router = useRouter();
  const { auth } = useContext<TAuthContext>(AuthContext);

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth]);

  const stripped_content = content.replace(/<[^>]*>?/gm, "");

  console.log("orders:", orders);

  return (
    <Container as="main" fluid className={styles.profile__mainContainer}>
      <ImageHero profile mediaItemUrl={mediaItemUrl} />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 d-flex">
            <h4 className={styles.profile__text}>{title}</h4>
          </div>
        </div>

        <p style={{ fontWeight: 100 }}>{stripped_content}</p>

        <GoPreviousNavigate />

        <Nav
          as="ul"
          style={{
            listStyle: "none",
            padding: "0",
            fontWeight: "300",
            height: "1000px",
            display: "block",
          }}
        >
          {orders?.length ? (
            orders.map((order: TOrders) => {
              return (
                <Nav.Item
                  as="li"
                  key={order.id}
                  style={{ margin: "1rem 0", display: "flex" }}
                >
                  {order.line_items.map((data) => {
                    return (
                      <div key={data.id}>
                        <Image
                          className="Orders__image"
                          src={data.image.src}
                          width={200}
                          height={200}
                          alt={data.name}
                        />
                      </div>
                    );
                  })}
                  <Nav
                    as="ul"
                    style={{
                      display: "block",
                      padding: "0px 1rem",
                      listStyle: "none",
                    }}
                  >
                    {order.line_items.map((item) => (
                      <Fragment key={item.name}>
                        <Nav.Item>
                          <strong>Filename</strong>
                          <div>{item.name}</div>
                        </Nav.Item>
                        <Nav.Item>
                          <strong>Price</strong>
                          <div>${item.price}</div>
                        </Nav.Item>
                      </Fragment>
                    ))}

                    <Nav.Item>
                      <div>
                        <strong>Purchased</strong>
                      </div>
                      {format(new Date(order.date_paid), "LLL. dd, yyyy")}
                    </Nav.Item>
                  </Nav>
                </Nav.Item>
              );
            })
          ) : (
            <div style={{ margin: "2rem 0" }}>
              <h6>You have no orders</h6>
            </div>
          )}
        </Nav>
      </div>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const parsedCookies = cookie.parse(context.req?.headers?.cookie);
  const token = parsedCookies.bbp_token;
  const id = parsedCookies.bbp_customer_id;

  //!! This doesn't work if the user is NOT an ADMIN user.
  const get_orders_response = await fetch(process.env.ORDERS_URL as string, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const orders_response = await get_orders_response.json();

  const orders =
    orders_response.length > 0
      ? orders_response.filter((data) => data.customer_id == id)
      : null;

  const get_coupons_response = await fetch(process.env.COUPONS_URL as string, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const coupon = await get_coupons_response.json();

  const res = await axios.post(process.env.GRAPHQL_URL as string, {
    query: GET_ORDERS_PAGE,
  });
  const json = await res.data;

  const page = json.data.page;

  return {
    props: {
      page: page,
      coupon: coupon,
      orders: orders,
    },
  };
}
