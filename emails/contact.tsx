import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface Contact {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  issue?: string;
  message?: string;
}

const ContactTemplate = ({
  firstName,
  lastName,
  email,
  issue,
  message,
}: Contact) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px] text-center">
              <Img
                src="https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/06/logo.png"
                width="70"
                height="67"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Section>
              <Text className="text-black text-[14px] leading-[24px]">
                You have a new message from a user from{" "}
                <strong>bbpmusiclibrary</strong> contact form
              </Text>
              <Text className="m-0">
                <strong>First name:</strong> {firstName}
              </Text>
              <Text className="m-0">
                <strong>Last name:</strong> {lastName}
              </Text>
              <Text className="m-0">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="m-0">
                <strong>Issue:</strong> {issue}
              </Text>
              <Text className="m-0">
                <strong>Message:</strong> {message}
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
              <span className="text-black"> </span>.This invite was sent from{" "}
              <span className="text-black">inviteFromIp</span> located in{" "}
              <span className="text-black">inviteFromLocation</span>. If you
              were not expecting this invitation, you can ignore this email. If
              you are concerned about your account&apos;s safety, please reply
              to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default ContactTemplate;
