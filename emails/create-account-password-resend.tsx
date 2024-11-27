import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface AccountCreatedResendEmailProps {
  username?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
  createPasswordLink: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const AccountCreatedResendEmail = ({
  username,
  createPasswordLink,
  inviteFromIp = "204.13.186.218",
  inviteFromLocation = "São Paulo, Brazil",
}: AccountCreatedResendEmailProps) => {
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
            <Text className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Your account has been created
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello <strong>{username}</strong>,
            </Text>
            <Section>
              <Text className="text-black text-[14px] leading-[24px]">
                Your session had expired previously creating a password.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Click on the <strong>Create account password</strong> button
                below to update your password.
              </Text>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Link
                href={createPasswordLink}
                className="text-blue-600 no-underline"
              >
                <Button
                  style={{ color: "#61dafb", padding: "10px 20px" }}
                  className="bg-black rounded text-white text-[12px] font-semibold no-underline text-center"
                  href={createPasswordLink}
                >
                  Create account password
                </Button>
              </Link>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AccountCreatedResendEmail;
