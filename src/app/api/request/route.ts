import axios, { AxiosError } from "axios";
import { resend } from "@/config/resend";
import { NextResponse } from "next/server";
import { GET_S3_SIGNED_URL } from "@/query/getS3SignedUrl";
import { generateJSONWebToken } from "@/util/generateJWTToken";
import RequestNewDownloadLink from "@/emails/request-signedurl-download";
import { REQUEST_DOWNLOAD_FAILED } from "@/constants/index";

export async function POST(request: Request) {
  const body = await request.json();

  const { customerId, orderId, productId, email, fileName } = body;

  const GET_S3_SIGNED_URL_QUERY = JSON.stringify({
    query: GET_S3_SIGNED_URL,
    variables: { customerId },
  });

  try {
    const graphql_url = process.env.GRAPHQL_URL as string;

    const customer_orders = await axios.post(
      graphql_url,
      GET_S3_SIGNED_URL_QUERY,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await generateJSONWebToken()),
        },
      }
    );

    const orders = await customer_orders.data.data.customer.orders.edges
      .map((data) => data)
      .find((order) => order.node.databaseId === orderId);

    const filteredOrder = orders.node.downloadableItems.edges.find(
      (data) => data.node.product.databaseId === productId
    );

    const url = filteredOrder.node.download.file;

    const { data, error } = await resend.emails.send({
      from: "BBP Music Library <no-reply@bbpmusiclibrary.com>",
      to: email,
      subject: `Your Requested Download Link`,
      react: RequestNewDownloadLink({
        username: email,
        signedCloudFrontUrl: url,
        fileName: fileName,
      }),
    });

    if (error)
      return NextResponse.json({
        message: REQUEST_DOWNLOAD_FAILED,
      });

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }
  }
  return NextResponse.json("OK", { status: 200 });
}
