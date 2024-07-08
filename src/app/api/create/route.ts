import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import {
  generateSessionID,
  generatePassword,
  calculateOrderAmount,
  calculateOrderAmountAndSplitStripe,
  calculateOrderAmountAndSplitPayPal,
} from "@/util/index";
import PurchaseTemplate from "emails/purchase";
import { resend } from "src/app/config/resend";
import { generateJSONWebToken } from "@/util/generateJWTToken";
import AccountCreatedEmail from "emails/create-account-password";
import { generatePayPalAccessToken } from "@/util/generatePayPalAccessToken";

import {
  GET_USER,
  CREATE_USER,
  CREATE_ORDER,
  UPDATE_ORDER,
  GET_CUSTOMER_ORDERS,
  GET_CUSTOMER_DOWNLOADS,
} from "@/query/index";
import { PURCHASE, PAYOUT, STATUS, METHOD, TRANSFER } from "@/constants/index";
import { format } from "date-fns";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const splitPaymentAmount = (amount: number) => {
  console.log("split payments");
};

export async function POST(request: Request) {
  const body = await request.json();

  const id = body.id;
  const coupon = body.coupon;
  const email = body.email;
  const first_name = body.name.split(" ")[0];
  const last_name = body.name.split(" ")[1];
  const username = body.email;
  const password = generatePassword();

  const state = body.state || body.admin_area_1;
  const city = body.city || body.admin_area_2;
  const address = body.address;
  const postal_code = body.postal_code;
  const country_code = body.country_code;
  const phone = body.phone;
  const payment_method = body.payment_method;
  const purchaseUnits = body.purchaseUnits;

  const currencyCode = purchaseUnits[0].amount.currency_code;

  const productDescription = purchaseUnits
    .map((data) => data.description)
    .toString();

  const productIds = body.purchaseUnits.map((data) =>
    Number(data.reference_id)
  );

  const lineItems = purchaseUnits.map((data) => ({
    productId: Number(data.reference_id),
    quantity: 1,
    total: data.amount.value,
  }));

  const graphQLURL = process.env.GRAPHQL_URL as string;
  const payoutsURL = process.env.PAYPAL_PAYOUTS_URL as string;
  const newsletter_url = `${process.env.NEWSLETTER_URL}/?client_key=${process.env.CLIENT_KEY}&client_secret=${process.env.CLIENT_SECRET}`;

  let order_json = {
    paymentMethod: payment_method,
    paymentMethodTitle: payment_method,
    status: STATUS.STATUS_PROCESSING,
    customerId: null,
    coupons: coupon,
    isPaid: true,
    lineItems: lineItems,
    billing: {
      firstName: first_name,
      lastName: last_name,
      address1: address,
      city: city,
      state: state,
      postcode: postal_code,
      country: country_code,
      email: email,
      phone: phone,
    },
  };

  // !! TODO - Maybe there is a better way to organize into functions.

  const verifyIfUserExists = () => {
    console.log("Verify if a user exists");
  };

  /**
   * RETURNING CUSTOMER
   * 1. Validate user
   * 2. Get customer
   * 3. Create order
   * 4. Update order
   * 5. Get download url
   * 6. PayPal Payout
   * 7. Create Stripe transaction
   * 8. Transfer to Stripe connected account
   * 9. Send email
   */

  /**
   * 1. VALIDATE USER EXIST
   * */

  const GET_USER_QUERY = JSON.stringify({
    query: GET_USER,
    variables: { id: email },
  });

  const response_validate_user_exist = await axios.post(
    graphQLURL,
    GET_USER_QUERY,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await generateJSONWebToken()),
      },
    }
  );

  const USER_EXIST = await response_validate_user_exist.data.data.user;

  if (USER_EXIST) {
    const userId = USER_EXIST.databaseId;
    order_json.customerId = userId;

    const retrieveSingleCustomer = () => {
      console.log("Retrieve a single customer a Token");
    };

    /**
     * 2. GET CUSTOMER
     * */

    const GET_CUSTOMER_ORDERS_QUERY = JSON.stringify({
      query: GET_CUSTOMER_ORDERS,
      variables: { customerId: userId },
    });

    const response_get_customer_orders = await axios.post(
      graphQLURL,
      GET_CUSTOMER_ORDERS_QUERY,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await generateJSONWebToken()),
        },
      }
    );

    const customer_orders_data =
      response_get_customer_orders.data.data.customer.orders.edges.map(
        (data) => data.node.lineItems.nodes
      );

    const customer_orders_data_flattened = customer_orders_data.flat();

    const hasPurchased = customer_orders_data_flattened.some((data) =>
      productIds.includes(data.product.databaseId)
    );

    if (hasPurchased) {
      return NextResponse.json(
        { message: PURCHASE.CANNOT_PURCHASE },
        { status: 400 }
      );
    }

    /**
     * 3. CREATE ORDER
     * */

    const CREATE_ORDER_QUERY = JSON.stringify({
      query: CREATE_ORDER,
      variables: {
        input: order_json,
      },
    });

    const response_create_order = await axios.post(
      graphQLURL,
      CREATE_ORDER_QUERY,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await generateJSONWebToken()),
        },
      }
    );

    const ORDER_CREATED = await response_create_order.data;

    /**
     * 4. UPDATE ORDER
     * */

    if (ORDER_CREATED) {
      const UPDATE_ORDER_QUERY = JSON.stringify({
        query: UPDATE_ORDER,
        variables: {
          input: {
            orderId: ORDER_CREATED.data.createOrder.orderId,
            status: STATUS.STATUS_COMPLETED,
          },
        },
      });

      const response_update_order = await axios.post(
        graphQLURL,
        UPDATE_ORDER_QUERY,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await generateJSONWebToken()),
          },
        }
      );

      await response_update_order.data;
    }

    /**
     * 5. GET DOWNLOAD URL
     * */

    // Filter from proudct query where databaseId
    // in the response === product_id from incoming response body

    const GET_CUSTOMER_DOWNLOADS_QUERY = JSON.stringify({
      query: GET_CUSTOMER_DOWNLOADS,
      variables: { customerId: userId },
    });

    const response_products_downloads = await axios.post(
      graphQLURL,
      GET_CUSTOMER_DOWNLOADS_QUERY,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await generateJSONWebToken()),
        },
      }
    );

    const products = response_products_downloads.data.data.customer;

    /**
     * !! TODO - Add my bank info in Stripe.
     *
     * Use the Payouts API to make PayPal payments to multiple PayPal accounts in a single API call.
     * The Payouts API is a fast, convenient way to send commissions, rebates, rewards,
     * and general disbursements.
     *
     * */

    /**
     * 6. PAYPAL PAYOUT
     * */

    let payoutsTransfer;

    const payoutMapped = purchaseUnits.map((data) => ({
      amount: {
        currency: data.amount.currency_code,
        value: calculateOrderAmountAndSplitPayPal(purchaseUnits),
      },
      sender_item_id: data.reference_id,
      recipient_type: TRANSFER.TRANSFER_RECIPIENT_TYPE,
      note: `Payout for ${data.description} on ${format(
        new Date(),
        "LLL. dd, yyyy"
      )}
    }`,
      receiver: PAYOUT.PAYPAL_PAYOUT_ACCOUNT,
    }));

    const payoutsPayload = JSON.stringify({
      sender_batch_header: {
        sender_batch_id: id,
        email_subject: "You have a payout!",
        email_message: "You have received a payout!",
      },
      items: payoutMapped,
    });

    // Paypal uses Payouts
    // Stripe uses Transfers

    payment_method === METHOD.METHOD_PAYPAL
      ? (payoutsTransfer = await axios.post(payoutsURL, payoutsPayload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await generatePayPalAccessToken()),
          },
        }))
      : null;

    // console.log("payoutsTransfer:", payoutsTransfer);

    /**
     *  7. CREATE STRIPE TRANSACTION
     * */

    //? - Stripe Test Card -> {{4000000000000077}}

    const customer =
      payment_method === METHOD.METHOD_STRIPE
        ? await stripe.customers.create({
            email: email,
            name: first_name + " " + last_name,
          })
        : null;

    let paymentIntent;

    payment_method === METHOD.METHOD_STRIPE
      ? (paymentIntent = await stripe.paymentIntents.create({
          customer: customer.id,
          amount: calculateOrderAmount(purchaseUnits),
          currency: currencyCode,
          description: productDescription,
        }))
      : null;

    /**
     * 8. TRANSFER FUNDS TO CONNECTED STRIPE ACCOUNT
     * */

    payment_method === METHOD.METHOD_STRIPE
      ? await stripe.transfers.create({
          amount: calculateOrderAmountAndSplitStripe(purchaseUnits),
          currency: currencyCode,
          destination: TRANSFER.TRANSFER_DESTINATION,
          transfer_group: TRANSFER.TRANSFER_GROUP,
        })
      : null;

    /**
     * 9. SEND EMAIL
     * */

    const { data } = await resend.emails.send({
      from: "BBP Music Library <no-reply@bbpmusiclibrary.com>",
      to: email,
      subject: "Your Purchase",
      react: PurchaseTemplate({
        products,
        username,
        profileUrl: process.env.ORIGIN_URL + "/profile",
      }),
    });
    console.log("email data:", data);
    if (data) {
      return NextResponse.json({
        transactionId: id,
        orderId: ORDER_CREATED.data.createOrder.orderId,
        clientSecret: paymentIntent ? paymentIntent.client_secret : null,
        status: 204,
      });
    }
  }
  /**
   * GUEST PURCHASE
   * 1. Create a customer
   * 2. Create a newsletter user
   * 3. Append the customer_id to order_json
   * 4. Create an Order
   * 5. Update order
   * 6. Get Product name, download link of file
   * 7. Create Stripe transaction
   * 8. Transfer funds to connected account
   * 9.10. Send 2 emails
   *     5a.) Purchased template with (Product Name, Download Link, Username)
   *     5b.) Account Created template (Username and a link to create-password form)
   */

  /**
   * 1. CREATE A CUSTOMER
   * */
  const CREATE_USER_QUERY = JSON.stringify({
    query: CREATE_USER,
    variables: {
      input: {
        firstName: first_name,
        lastName: last_name,
        username,
        email,
        password,
        roles: "customer",
      },
    },
  });

  const response_create_user = await axios.post(graphQLURL, CREATE_USER_QUERY, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await generateJSONWebToken()),
    },
  });

  const response_create_user_data = response_create_user.data;

  /**
   * 2. CREATE A NEWSLETTER USER
   * */

  const payload = JSON.stringify({
    email: response_create_user_data.data.createUser.user.email,
    first_name: response_create_user_data.data.createUser.user.firstName,
    last_name: response_create_user_data.data.createUser.user.lastName,
    status: STATUS.STATUS_CONFIRMED,
  });

  await axios.post(newsletter_url, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  /**
   * 3. APPEND CUSTOMER_ID
   */
  const userId = (response_create_user_data.data =
    response_create_user_data.data.createUser.user.databaseId);

  order_json.customerId = userId;

  /**
   * 4. CREATE ORDER
   * */

  const CREATE_ORDER_QUERY = JSON.stringify({
    query: CREATE_ORDER,
    variables: { input: order_json },
  });

  const response_create_order = await axios.post(
    graphQLURL,
    CREATE_ORDER_QUERY,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await generateJSONWebToken()),
      },
    }
  );

  const ORDER_CREATED = await response_create_order.data;

  /**
   * 5. UPDATE ORDER
   */
  if (ORDER_CREATED) {
    const UPDATE_ORDER_QUERY = JSON.stringify({
      query: UPDATE_ORDER,
      variables: {
        input: {
          orderId: ORDER_CREATED.data.createOrder.orderId,
          status: STATUS.STATUS_COMPLETED,
        },
      },
    });

    const response_update_order = await axios.post(
      graphQLURL,
      UPDATE_ORDER_QUERY,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await generateJSONWebToken()),
        },
      }
    );
    await response_update_order;
  }

  /**
   * 6. GET DOWNLOAD LINK + PRODUCT NAME
   * */

  const GET_CUSTOMER_DOWNLOADS_QUERY = JSON.stringify({
    query: GET_CUSTOMER_DOWNLOADS,
    variables: { customerId: userId },
  });

  const response_products_downloads = await axios.post(
    graphQLURL,
    GET_CUSTOMER_DOWNLOADS_QUERY,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await generateJSONWebToken()),
      },
    }
  );

  const products = response_products_downloads.data.data.customer;

  /**
   * 6. PAYOUT PAYMENT
   * */

  let payoutsTransfer;

  const payoutMapped = purchaseUnits.map((data) => ({
    amount: {
      currency: data.amount.currency_code,
      value: calculateOrderAmountAndSplitPayPal(purchaseUnits),
    },
    sender_item_id: data.reference_id,
    recipient_type: TRANSFER.TRANSFER_RECIPIENT_TYPE,
    note: `Payout for ${data.description}`,
    receiver: PAYOUT.PAYPAL_PAYOUT_ACCOUNT,
  }));

  const payoutsPayload = JSON.stringify({
    sender_batch_header: {
      sender_batch_id: id,
      email_subject: "You have a payout!",
      email_message: "You have received a payout!",
    },
    items: payoutMapped,
  });

  payment_method === METHOD.METHOD_PAYPAL
    ? (payoutsTransfer = await axios.post(payoutsURL, payoutsPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await generatePayPalAccessToken()),
        },
      }))
    : null;

  console.log("payoutsTransfer:", payoutsTransfer);

  /**
   *  7. CREATE STRIPE TRANSACTION
   * */

  const customer =
    payment_method === METHOD.METHOD_STRIPE
      ? await stripe.customers.create({
          email: email,
          name: first_name + " " + last_name,
        })
      : null;

  let paymentIntent;

  payment_method === METHOD.METHOD_STRIPE
    ? (paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        amount: calculateOrderAmount(purchaseUnits),
        currency: currencyCode,
        description: productDescription,
      }))
    : null;

  /**
   * 8. TRANSFER FUNDS TO CONNECTED ACCOUNT
   * */

  payment_method === METHOD.METHOD_STRIPE
    ? await stripe.transfers.create({
        amount: calculateOrderAmountAndSplitStripe(purchaseUnits),
        currency: currencyCode,
        destination: TRANSFER.TRANSFER_DESTINATION,
        transfer_group: TRANSFER.TRANSFER_GROUP,
      })
    : null;

  /**
   * 9. PURCHASE EMAIL
   */
  const { data: purchaseData, error: purchaseError } = await resend.emails.send(
    {
      from: "BBP Music Library <no-reply@bbpmusiclibrary.com>",
      // to: email,
      to: email,
      subject: `Your purchase`,
      react: PurchaseTemplate({
        products,
        username: username,
        profileUrl: process.env.ORIGIN_URL + "/profile",
      }),
    }
  );

  /**
   * 10. CREATE ACCOUNT EMAIL
   * An Email is sent to the user to notify them of their account creation, but at this point they
   * Will not know a password because a WordPress Account is created
   * By the WordPress REST API via WPGraphQL
   * We need to present the ability to the user to create a password to override
   * the random password generated and used on the server.
   */
  const { data: accountData, error: accountError } = await resend.emails.send({
    from: "BBP Music Library <no-reply@bbpmusiclibrary.com>",
    // to: email,
    to: email,
    subject: "Account created",
    react: AccountCreatedEmail({
      firstName: first_name,
      lastName: last_name,
      username,
      createPasswordLink:
        process.env.ORIGIN_URL +
        "/create-password?email=" +
        username +
        "&sessionID=" +
        generateSessionID() +
        "&userID=" +
        userId,
    }),
  });

  if (purchaseData)
    return NextResponse.json({
      transactionId: id,
      orderId: ORDER_CREATED.data.createOrder.orderId,
      clientSecret: paymentIntent ? paymentIntent.client_secret : null,
      status: 204,
    });
}
