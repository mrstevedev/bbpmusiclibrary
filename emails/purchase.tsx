import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface Order {
  node: {
    databaseId: number;
    datePaid: string;
  };
}

interface Product {
  node: {
    downloadId: string;
    name: string;
    url: string;
    download: {
      file: string;
      name: string;
    };
    accessExpires: string;
    product: {
      name: string;
    };
  };
}

interface PurchaseEmailProps {
  username?: string;
  profileUrl: string;
  products: {
    databaseId: number;
    date: string;
    downloadableItems: {
      edges: Product[];
    };
    orders: {
      edges: Order[];
    };
  };
}

const PurchaseEmail = ({
  username,
  products,
  profileUrl,
}: PurchaseEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px] text-center">
              <Img
                width="70"
                height="67"
                className="my-0 mx-auto"
                src="https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/06/logo.png"
                alt="BBP Music Library"
              />
            </Section>

            <Section className="text-left">
              <React.Fragment>
                {products?.downloadableItems.edges.length <= 1 ? (
                  <React.Fragment>
                    {products?.downloadableItems.edges.map((product) => (
                      <Text className="text-2xl" key={product.node.downloadId}>
                        Your purchased file{" "}
                        <strong>{product.node.product.name}</strong>
                      </Text>
                    ))}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Text className="text-2xl">
                      Your purchased Files{" "}
                      {products?.downloadableItems.edges.map((product) => (
                        <strong key={product.node.downloadId}>
                          {product.node.product.name}{" "}
                        </strong>
                      ))}
                    </Text>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Section>
            <Section className="text-left">
              <Text className="text-md font-bold">
                OrderId: #{products?.orders.edges[0].node.databaseId}
              </Text>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello <strong>{username}</strong>,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for your purchase.
            </Text>

            <Text className="text-md font-bold">Lost files?</Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Click the <strong>Request Link</strong> button to send a new
              download link to your email under your account profile.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              {products?.downloadableItems.edges ? (
                products?.downloadableItems.edges.length <= 1 ? (
                  <React.Fragment>
                    {products?.downloadableItems.edges?.map((product) => (
                      <DownloadFileButton
                        key={product.node.downloadId}
                        url={product.node.url}
                      />
                    ))}
                  </React.Fragment>
                ) : null
              ) : null}

              {products?.downloadableItems.edges ? (
                products?.downloadableItems.edges.length > 1 ? (
                  <React.Fragment>
                    {products?.downloadableItems.edges.map((product) => (
                      <Link
                        key={product.node.downloadId}
                        href={product.node.url}
                        style={{ padding: "0 0.4rem" }}
                      >
                        {product.node.product.name}
                      </Link>
                    ))}
                  </React.Fragment>
                ) : null
              ) : null}
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Find the download page here:{" "}
              <Link
                href={profileUrl + "/downloads"}
                className="text-blue-600 no-underline"
              >
                https://bbpmusiclibrary.com/profile/downloads
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PurchaseEmail;

const DownloadFileButton = ({ url }) => (
  <React.Fragment>
    <Button
      title="Download your file"
      href={url}
      style={{ color: "#61dafb", padding: "10px 0" }}
      className="bg-black rounded text-white text-[12px] font-semibold no-underline text-center w-full"
      download="my_file"
      target="_blank"
    >
      Download Your File
    </Button>
  </React.Fragment>
);
