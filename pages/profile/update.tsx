import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import ImageHero from "@/components/Hero/ImageHero";
import { AuthContext, TAuthContext } from "context/AuthContext";
import styles from "@/styles/Profile.module.scss";
import profileStyles from "@/styles/Profile.module.scss";
import { GET_UPDATE_INFO_PAGE } from "@/query/index";
import cookie from "cookie";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import GoPreviousNavigate from "@/components/Navigation/GoPreviousNavigate";
import Select from "react-select";

interface IPageProps {
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

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  status: string;
}

export default function IPageProps({
  page: {
    content,
    featuredImage: {
      node: { mediaItemUrl },
    },
    title,
  },
}: IPageProps) {
  const router = useRouter();
  const { auth, setAuth } = useContext<TAuthContext>(AuthContext);

  useEffect(() => {
    if (auth) {
      setUser({
        firstName: auth.firstName,
        lastName: auth.lastName,
        email: auth.userEmail,
        username: auth.userNiceName,
        status: auth.status,
      });
    }
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  const [user, setUser] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    status: "",
  });

  const [edited, setEdited] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    status: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fieldsFilled, setFieldsFilled] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [subscription, _] = useState({
    newsletter: "",
  });

  const { values, handleSubmit, touched, errors, setFieldValue } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      status: "",
    },

    onSubmit: async (values) => {
      setFormSubmitted(true);
      setIsLoading(true);

      console.log("fieldsFilled::", fieldsFilled);

      const payload = {
        ...user,
        email: edited.email ? values.email : user.email,
        name:
          edited.firstName ||
          (edited.lastName && values.firstName && values.lastName)
            ? values.firstName + " " + values.lastName
            : values.firstName
            ? values.firstName + " " + user.lastName
            : values.lastName
            ? user.firstName + " " + values.lastName
            : null,
      };

      const token = JSON.parse(localStorage.getItem("bbp_token") as string);

      try {
        if (!fieldsFilled.includes("Newsletter")) {
          const update_user_response = await axios.patch(
            `${process.env.NEXT_PUBLIC_USERS_URL}/${auth.userId}`,
            payload,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + " " + token,
              },
            }
          );
          if (update_user_response.status === 200) {
            toast.success(successMsg);
            const { id, name, username, email } = update_user_response.data;
            const first_name = name.split(" ")[0];
            const last_name = name.split(" ")[1];
            localStorage.setItem(
              "bbp_user",
              JSON.stringify({
                userId: id,
                firstName: first_name,
                lastName: last_name,
                userEmail: email,
                userNiceName: username,
                // token: auth.token,
                status: auth.status,
              })
            );
            setAuth({
              userId: id,
              firstName: first_name,
              lastName: last_name,
              userEmail: email,
              userNiceName: username,
              // token: auth.token,
              status: auth.status,
            });
          }
        } else {
          const update_user_response = await axios.patch(
            `${process.env.NEXT_PUBLIC_USERS_URL}/${auth.userId}`,
            payload,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + " " + token,
              },
            }
          );
          if (update_user_response.status === 200) {
            const { id, first_name, last_name, username, email } =
              update_user_response.data;

            localStorage.setItem(
              "bbp_user",
              JSON.stringify({
                userId: id,
                firstName: first_name,
                lastName: last_name,
                userEmail: email,
                userNiceName: username,
                // token: auth.token,
                status: auth.status,
              })
            );

            setAuth({
              userId: id,
              firstName: first_name,
              lastName: last_name,
              userEmail: email,
              userNiceName: username,
              // token: auth.token,
              status: auth.status,
            });
          }

          const update_subscriber_response = await axios.put(
            `${process.env.NEXT_PUBLIC_NEWSLETTER_URL}/${auth.userEmail}/?client_key=${process.env.NEXT_PUBLIC_CLIENT_KEY}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&callback?path=token/validate&status=${subscription.newsletter}`,
            {
              headers: {
                "Content-Type": "application/json",
                // Authorization: {
                //   client_key: CLIENT_KEY,
                //   client_secret: CLIENT_SECRET,
                // },
              },
            }
          );
          if (update_subscriber_response.status === 200) {
            console.log(
              "update_subscriber_response::::",
              update_subscriber_response
            );
            toast.success(successMsg);
          }
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again later");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const stripped_content = content.replace(/<[^>]*>?/gm, "");

  const handleChange = (event) => {
    setEdited((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    const fields: any = [];
    for (const key in edited) {
      if (edited[key] !== "") {
        fields.push(key);
      }
    }
    for (const key in subscription) {
      if (subscription[key] !== "") {
        fields.push(key);
      }
    }

    const newStr = fields.map(
      (field) => field[0].toUpperCase() + field.substr(1)
    );

    const splitNewStr = newStr.map((str) => str.split(/(?=[A-Z])/).join(" "));
    const msgToString = splitNewStr.toString();
    const addSpace = msgToString.replace(/,/g, ", ");
    const formatMsg = addSpace + " " + "has been updated";
    setFieldsFilled(splitNewStr);
    setSuccessMsg(formatMsg);
  }, [edited, subscription]);

  // useEffect(() => {
  //   if (auth) {
  //     const newsletter = document.getElementById(
  //       "newsletter"
  //     ) as HTMLSelectElement;
  //     for (let i = 0; i < newsletter.options.length; i++) {
  //       const vals = newsletter.options[i].value;
  //       if (vals === auth.status) {
  //         newsletter.options[i].setAttribute("selected", "selected");
  //       }
  //     }
  //   }
  // }, [auth]);

  const resetData = () => {
    setTimeout(() => {
      setFormSubmitted(false);
      setFieldsFilled([]);
      setSuccessMsg("");
      setEdited({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        status: "",
      });
    }, 6000);
  };

  useEffect(() => {
    if (formSubmitted) {
      resetData();
    }
  }, [formSubmitted]);

  return (
    <Container as="main" fluid className={profileStyles.profile__mainContainer}>
      <ImageHero update mediaItemUrl={mediaItemUrl} />
      <Container>
        <h4 className={styles.profile__text}>
          <span className={styles.profile__text}>{title}</span>
        </h4>
        <p style={{ fontWeight: 100 }}>{stripped_content}</p>
        <GoPreviousNavigate />
        <div
          className={styles.Profile__form__container}
          style={{ margin: "1rem 0" }}
        >
          <Form id="my-form" onSubmit={handleSubmit} onChange={handleChange}>
            <InputGroup className="mb-2">
              <FormControl
                required
                onChange={(e) => setFieldValue("firstName", e.target.value)}
                type="text"
                id="firstName"
                name="firstName"
                aria-describedby="First name"
                aria-label="First name"
                defaultValue={user.firstName}
                className={`form-control ${
                  touched.firstName && errors.firstName && "error"
                }`}
              />
              <FormControl
                onChange={(e) => setFieldValue("lastName", e.target.value)}
                type="text"
                id="lastName"
                name="lastName"
                aria-describedby="Last name"
                aria-label="Last name"
                defaultValue={user.lastName}
                className={`form-control ${
                  touched.lastName && errors.lastName && "error"
                }`}
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                required
                onChange={(e) => setFieldValue("email", e.target.value)}
                type="email"
                id="email"
                name="email"
                aria-describedby="email"
                aria-label="Email"
                defaultValue={user.email}
                className={`form-control ${
                  touched.email && errors.email && "error"
                }`}
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <FormControl
                type="text"
                id="username"
                name="username"
                className="form-control"
                aria-label="User name"
                aria-describedby="username"
                defaultValue={user.username}
                disabled
              />
            </InputGroup>
            <InputGroup className="mb-2">
              {/* <Select
                id="newsletter"
                name="newsletter"
                defaultValue={{ label: "Set subscription status" }}
                options={[
                  { label: "Confirmed" },
                  { label: "Not Confirmed" },
                  {
                    label: "Unsubscribed",
                  },
                ]}
                val={"test"}
                onChange={(option) => setFieldValue("state", option)}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "#f1f1f1",
                    primary: "black",
                  },
                })}
                styles={{
                  container: (baseStyles) => ({
                    ...baseStyles,
                    width: "100%",
                  }),
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: "#dee2e6",
                  }),
                }}
              /> */}
              <select
                onChange={handleChange}
                id="newsletter"
                name="newsletter"
                aria-label="Select newsletter status"
                className={`form-select ${
                  touched.email && errors.email && "error"
                }`}
              >
                <option value="" disabled>
                  Subscribe to newsletter
                </option>
                <option value="confirmed">Subscribe</option>
                <option value="not_confirmed">Not confirmed</option>
                <option value="unsubscribed">Unsubscribe</option>
                <option value="bounced">Bounced</option>
              </select>
            </InputGroup>
            <Button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={fieldsFilled.length > 0 ? false : true}
            >
              Update
              {isLoading && (
                <Spinner
                  className="spinner-border spinner-border-sm"
                  role="status"
                  style={{ margin: "0 0 0 0.3rem" }}
                />
              )}
            </Button>
          </Form>
          <hr />
        </div>
      </Container>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const parsed = cookie.parse(context.req.headers.cookie);
  const token = parsed.bbp_token;

  const get_coupons_response = await axios.get(
    process.env.NEXT_PUBLIC_COUPONS_URL as string,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const coupon = await get_coupons_response.data;

  const res = await axios.post(process.env.GRAPHQL_URL as string, {
    query: GET_UPDATE_INFO_PAGE,
  });
  const json = await res.data;

  return {
    props: {
      page: json.data.page,
      coupon: coupon,
    },
  };
}
