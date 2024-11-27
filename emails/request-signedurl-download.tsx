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

interface RequestNewDownloadLinkProps {
  username?: string;
  signedCloudFrontUrl: string;
  fileName: string;
}

const RequestNewDownloadLink = ({
  username,
  signedCloudFrontUrl,
  fileName,
}: RequestNewDownloadLinkProps) => {
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
              <React.Fragment></React.Fragment>
            </Section>
            <Section className="text-left">
              <Text className="text-md font-bold"></Text>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello <strong>{username}</strong>,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Here is your request for a new download link for{" "}
              <strong>{fileName}</strong>
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              The link will expire within 15 minutes of the receipt of this
              email. You can still download the file as long as the file memory
              remains in your browser cache. Others will not be able to use this
              link.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <DownloadFileButton url={signedCloudFrontUrl} />
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              <Link href={"/downloads"} className="text-blue-600 no-underline">
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

export default RequestNewDownloadLink;

const DownloadFileButton = ({ url }) => (
  <React.Fragment>
    <Button
      title="Download your file"
      href={url}
      style={{ color: "#61dafb", padding: "10px 0" }}
      className="bg-black hover:bg-black-700 active:bg-black-900 rounded text-white text-[12px] font-semibold no-underline text-center w-full"
      download="my_file"
      target="_blank"
    >
      Download Your File
    </Button>
  </React.Fragment>
);
