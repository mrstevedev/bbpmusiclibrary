const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const creds = require("./config");
const shorten = require("simple-short");
const oauthSignature = require("oauth-signature");
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const {
  generatePassword,
  generateTimestamp,
  generateNonce,
} = require("./util/generate");
app.use(express.json());
require("dotenv").config({ path: "./.env" });

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);

let transport = {
  host: "smtp.gmail.com", // Don’t forget to replace with the SMTP host of your provider
  port: 587,
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
};

let transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

// // point to the template folder
// const handlebarOptions = {
//     viewEngine: {
//         partialsDir: path.resolve('./email/purchase/'),
//         defaultLayout: false,
//     },
//     viewPath: path.resolve('./email/purchase/'),
// };

// // use a template file with nodemailer
// transporter.use('compile', hbs(handlebarOptions))

app.post("/register-customer", async (req, res) => {
  const first_name = req.body.firstName;
  const last_name = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const UnixTimestamp = generateTimestamp();

  const json = JSON.stringify({
    first_name,
    last_name,
    username,
    password,
    email,
  });

  const httpMethod = "POST",
    url = process.env.USERS_URL,
    requestParams = {
      oauth_consumer_key: process.env.CONSUMER_KEY,
      oauth_token: process.env.TOKEN,
      oauth_nonce: generateNonce(),
      oauth_timestamp: UnixTimestamp,
      oauth_signature_method: "HMAC-SHA1",
    };

  const consumerSecret = process.env.CONSUMER_SECRET;
  const tokenSecret = process.env.TOKEN_SECRET;

  const encodedSignature = oauthSignature.generate(
    httpMethod,
    url,
    requestParams,
    consumerSecret,
    tokenSecret,
    {
      encodeSignature: true,
    }
  );

  const authorizationHeader =
    'OAuth oauth_consumer_key="' +
    requestParams.oauth_consumer_key +
    '",oauth_nonce="' +
    requestParams.oauth_nonce +
    '",oauth_signature_method="' +
    requestParams.oauth_signature_method +
    '",oauth_timestamp="' +
    requestParams.oauth_timestamp +
    '",oauth_token="' +
    requestParams.oauth_token +
    '",oauth_signature="' +
    encodedSignature +
    '"';

  axios
    .post(url, json, {
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': authorizationHeader
        Authorization: "Bearer " + process.env.JWT_TOKEN,
      },
    })
    .then((data) => {
      res.send().status(data.response.data.message);
    })
    .catch((error) => {
      console.log(error.response.status);
      res.send(error.response.data.message).status(error.response.status);
    });
});

app.post("/create-customer", async (req, res) => {
  const body = req.body;
  const name = req.body.description;
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const username = req.body.email;
  const password = generatePassword();
  const price = req.body.price;
  const admin_area_1 = req.body.admin_area_1;
  const admin_area_2 = req.body.admin_area_2;
  const address_line_1 = req.body.address_line_1;
  const postal_code = req.body.postal_code;
  const country_code = req.body.country_code;
  const phone = req.body.phone;
  const product_id = req.body.databaseId;

  const orders_url = process.env.ORDERS_URL;
  const users_url = process.env.USERS_URL;
  const search_url = process.env.SEARCH_URL;
  const downloads_url = process.env.DOWNLOADS_URL;

  const users_json = JSON.stringify({
    first_name,
    last_name,
    username,
    password,
    email,
  });

  axios
    .get(`${search_url}${email}`, {
      headers: {
        Authorization: "Bearer " + process.env.JWT_TOKEN,
      },
    })
    .then((response) => {
      if (response.data.length === 1) {
        // get user id from response and append as customer_id
        const arr_val = response.data.map((user) => user.id);
        const [user_id] = arr_val;

        const orders_json = {
          payment_method: body.payment_method,
          payment_method_title: body.payment_method,
          set_paid: true,
          status: "completed",
          customer_id: user_id,
          billing: {
            first_name: first_name,
            last_name: last_name,
            address_1: address_line_1,
            city: admin_area_2,
            state: admin_area_1,
            postcode: postal_code,
            country: country_code,
            email: email,
            phone: phone,
          },
          line_items: [
            {
              product_id: product_id,
              quantity: 1,
              name: name,
              total: price,
            },
          ],
          shipping_lines: [
            {
              method_id: "flat_rate",
              method_title: "Flat Rate",
              total: "0",
            },
          ],
        };

        // if we return a user then just create an order
        axios
          .post(orders_url, orders_json, {
            headers: {
              Authorization: "Bearer " + process.env.JWT_TOKEN,
            },
          })
          .then((response) => {
            // console.log(res)
            axios
              .get(`${downloads_url}/${user_id}/downloads`, {
                headers: {
                  Authorization: "Bearer " + process.env.JWT_TOKEN,
                },
              })
              .then((response) => {
                const getLastUrl =
                  response.data[response.data.length - 1].download_url;
                const download_url = response.data
                  .filter(({ download_url }) => download_url === getLastUrl)
                  .pop().download_url;

                const getLastProductName =
                  response.data[response.data.length - 1].product_name;
                const product_name = response.data
                  .filter(
                    ({ product_name }) => product_name === getLastProductName
                  )
                  .pop().product_name;

                const data = JSON.stringify({
                  title: "Bonita Basics Productions",
                  destination:
                    "http://bonitabasicsproductions.com/?download_file=1148&order=wc_order_DaMPnJc0gjNBY&email=sb-gvxya7393660%40personal.example.com&key=3803f3f9-2610-46fa-9393-8c9b0d274dba",
                  domain: {
                    id: "8f104cc5b6ee4a4ba7897b06ac2ddcfb",
                  },
                });

                const config = {
                  method: "post",
                  url: "https://api.rebrandly.com/v1/links",
                  headers: {
                    apikey: "523e8cfe04cf4b50870882e2d829c556",
                    "Content-Type": "application/json",
                  },
                  data: data,
                };

                axios(config)
                  .then((res) => {
                    const url = res.data.shortUrl;
                  })
                  .catch((err) => console.log(err));

                const mail = {
                  from: "stevendotpulido@gmail.com",
                  to: "stevendotpulido@gmail.com", // Change to email address that you want to receive messages on
                  subject: "Your purchase",
                  html: `
                      <div>
                        <a href='https://svgshare.com/s/hJ8' ><img src='https://svgshare.com/i/hJ8.svg' title='bbp' /></a>
                        <h3>Thank you for your purchase</h3>
                        <h2>${product_name}</h2>
                        <strong>Your download link</strong><br/>
                        <a href="${download_url}">Download File</a>
                      <div>`,
                };

                transporter.sendMail(mail, (err, data) => {
                  if (err) {
                    res.json({
                      status: "fail",
                    });
                  } else {
                    res.json({
                      status: "success",
                    });
                  }
                });
              });
          })
          .catch((err) => console.log(err));
      } else if (res.data.length <= 0) {
        // Else create a customer then create an order
        axios
          .post(users_url, users_json, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.JWT_TOKEN,
            },
          })
          .then((res) => {
            // console.log(res)

            // Create an order here
            axios
              .post(orders_url, orders_json, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + process.env.JWT_TOKEN,
                },
              })
              .then((res) => {
                // Get download link
                axios
                  .get(`${downloads_url}/${cusomer_id}/downloads`)
                  .then((res) => {
                    console.log("Checking response in downloads_url", res);
                  });
              });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));

  // res.send('ok')
});

const PORT = 5000;

app.listen(PORT, () => console.log(`App started on PORT ${PORT}`));
