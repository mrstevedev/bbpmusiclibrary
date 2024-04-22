import path from "path";
import axios from "axios";
import { generateNonce, generatePassword } from "../util";

import { type RequestProps, type ResponseProps } from "../types/types";
import transporter from "../config/nodemailer";

const create_customer = async (req: RequestProps, res: ResponseProps) => {
  const body = req.body;
  const coupon = body.coupon;
  const product_name = body.product_name;
  const email = body.email;
  const first_name = body.name.split(" ")[0];
  const last_name = body.name.split(" ")[1];
  const username = body.email;
  const password = generatePassword();
  const price = body.price;
  const admin_area_1 = body.admin_area_1;
  const admin_area_2 = body.admin_area_2;
  const state = body.state;
  const city = body.city;
  const address = body.address;
  const address_line_1 = body.address_line_1;
  const postal_code = body.postal_code;
  const country_code = body.country_code;
  const phone = body.phone;
  const product_id = body?.databaseId;

  const orders_url = process.env.ORDERS_URL;
  const user_create_url = process.env.USER_CREATE_URL;
  const search_url = process.env.SEARCH_URL;
  const downloads_url = process.env.DOWNLOADS_URL;

  const users_json = JSON.stringify({
    first_name,
    last_name,
    username,
    password,
    email,
  });

  let orders_json = {
    payment_method: req.body.payment_method,
    payment_method_title: req.body.payment_method,
    set_paid: true,
    status: "completed",
    customer_id: null,
    billing: {
      first_name: first_name,
      last_name: last_name,
      address_1: address_line_1 || address,
      city: admin_area_2 || city,
      state: admin_area_1 || state,
      postcode: postal_code,
      country: country_code,
      email: email,
      phone: phone,
    },
    coupon_lines: coupon ? [{ code: coupon }] : null,
    line_items: [
      {
        product_id: product_id,
        quantity: 1,
        total: price.toString(),
      },
    ],
  };

  // Generate a JWT here so that we can create users
  const response_generate_jwt = await axios.post(
    process.env.AUTH_USER_URL +
      `?username=${process.env.CREATE_USER_USERNAME}&password=${process.env.CREATE_USER_PASSWORD}`
  );

  const auth_data = await response_generate_jwt.data;
  const JWT_TOKEN = auth_data.token;

  const response_validate_user_exist = await axios.get(
    `${search_url}${email}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + JWT_TOKEN,
      },
    }
  );

  const response_user_exist = await response_validate_user_exist.data;

  if (response_user_exist.length === 1) {
    // get user id from response and append as customer_id
    const [user_id] = response_user_exist.map((user: { id: any }) => user.id);

    const get_orders_response = await axios(`${orders_url}`, {
      headers: {
        Authorization: "Bearer " + JWT_TOKEN,
      },
    });

    const has_purchased = get_orders_response.data.some(
      (data: { customer_id: any; line_items: any[] }) => {
        if (data.customer_id === user_id) {
          return data.line_items.some(
            (item: { name: string }) => item.name === product_name
          );
        }
      }
    );

    if (has_purchased) {
      return res
        .status(500)
        .json({ message: "You cannot purchase this item again" });
    }

    // if we return a user then just create an order
    orders_json.customer_id = user_id;

    try {
      await axios.post(orders_url as string, orders_json, {
        headers: {
          Authorization: "Bearer " + JWT_TOKEN,
        },
      });
    } catch (error) {
      console.log("error", error);
    }

    const response_downloads = await axios.get(
      `${downloads_url}/${user_id}/downloads`,
      {
        headers: {
          Authorization: "Bearer " + JWT_TOKEN,
        },
      }
    );

    const response_downloads_data = await response_downloads.data;

    if (response_downloads_data) {
      const getLastUrl =
        response_downloads_data[response_downloads_data.length - 1]
          .download_url;

      const downloadUrl = response_downloads_data
        .filter(
          (data: { download_url: string }) => data.download_url === getLastUrl
        )
        .pop().download_url;

      const getLastProductName =
        response_downloads_data[response_downloads_data.length - 1]
          .product_name;

      const productName = response_downloads_data
        .filter(
          (data: { product_name: string }) =>
            data.product_name === getLastProductName
        )
        .pop().product_name;

      const mailOptions = {
        from: '"Bonita Basics Productions Music Library" no-reply@bbpmusiclibrary.com',
        to: email, // Change to email address that you want to receive messages on
        subject: "Your purchase",
        template: "purchase_template",
        attachments: [
          {
            filename: "logo.png",
            path: path.join(__dirname, "../public/images/logo.png"),
            cid: "logo",
          },
        ],
        context: {
          username: username,
          downloadLink: downloadUrl,
          productName: productName,
          profileUrl: process.env.ORIGIN_URL + "/profile",
        },
      };
      transporter.sendMail(
        mailOptions,
        (err: any, data: { response: string }) => {
          if (err) {
            console.log(err);
            res.json({
              status: "Email was not sent",
            });
          } else {
            console.log("Email sent: " + data.response);
            res.json({
              status: "success",
            });
          }
        }
      );
    }
  } else if (response_user_exist.length <= 0) {
    // Else create a customer then create an order
    const response_user = await axios.post(
      user_create_url as string,
      users_json,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JWT_TOKEN,
        },
      }
    );

    const response_user_data = response_user.data;
    // get user id from response and append as customer_id
    const arr_val = response_user_data.id;
    const user_id = arr_val;
    // if we return a user then just create an order
    orders_json.customer_id = user_id;
    // Create an order here
    const response_orders = await axios.post(
      orders_url as string,
      orders_json,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JWT_TOKEN,
        },
      }
    );

    /**
     *  CREATE A NEWSLETTER USER
     *  */

    const payload = JSON.stringify({
      email: response_user_data.email,
      first_name: response_user_data.first_name,
      last_name: response_user_data.last_name,
    });

    const newsletter_url = `${process.env.NEWSLETTER_URL}/?client_key=${process.env.CLIENT_KEY}&client_secret=${process.env.CLIENT_SECRET}`;

    await axios.post(newsletter_url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    await response_orders.data;
    // Get download link
    const response_downloads = await axios.get(
      `${downloads_url}/${user_id}/downloads`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JWT_TOKEN,
        },
      }
    );
    const response_data = await response_downloads.data;
    if (response_data) {
      const productName = response_data[0].product_name;
      const downloadUrl = response_data[0].download_url;

      const mailOptions1 = {
        from: "Bonita Basics Productions Music Library",
        to: "stevendotpulido@gmail.com", // Change to email address that you want to receive messages on
        subject: "Your purchase",
        template: "purchase_template",
        attachments: [
          {
            filename: "logo.png",
            path: path.join(__dirname, "../public/images/logo.png"),
            cid: "logo",
          },
        ],
        context: {
          username: username,
          downloadLink: downloadUrl,
          productName: productName,
          profileUrl: process.env.ORIGIN_URL + "/profile",
        },
      };

      const mailOptions2 = {
        from: "Bonita Basics Productions Music Library",
        to: "stevendotpulido@gmail.com", // Change to email address that you want to receive messages on
        subject: "Account created",
        template: "create_password_template",
        attachments: [
          {
            filename: "2.png",
            path: path.join(__dirname, "../public/images/2.png"),
            cid: "logo",
          },
        ],
        context: {
          username: username,
          createPasswordLink:
            process.env.ORIGIN_URL +
            "/create-password?username=" +
            username +
            "&nonce=" +
            generateNonce() +
            "&userId=" +
            user_id,
        },
      };

      Promise.all(
        [mailOptions1, mailOptions2].map((opt) =>
          transporter.sendMail(opt).catch(console.log)
        )
      )
        .then(([res1, res2]) => {
          res.json({
            status: "success",
          });
        })
        .catch((err) => {
          if (err) {
            res.json({
              status: "Email was not sent",
            });
          }
        });
    }
  }
};
module.exports = { create_customer };
