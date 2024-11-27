import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Img,
  Hr,
  Html,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface AccountCreatedEmailProps {
  username?: string;
  firstName?: string;
  lastName?: string;
  createPasswordLink;
}

const AccountCreatedEmail = ({
  firstName,
  lastName,
  username,
  createPasswordLink,
}: AccountCreatedEmailProps) => {
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
            <Section className="text-center">
              <Text className="text-2xl">Your account has been created</Text>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello <strong>{username}</strong>,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Your account has been created.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Click the <strong>Create your password</strong> button below to
              create a password for your new account.
            </Text>
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
                  Create your password
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

export default AccountCreatedEmail;
