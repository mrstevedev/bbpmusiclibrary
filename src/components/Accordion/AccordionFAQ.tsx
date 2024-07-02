"use client";
import { Accordion } from "react-bootstrap";

export default function AccordionFAQ() {
  return (
    <Accordion style={{ fontWeight: 100 }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Where is my download file?</Accordion.Header>
        <Accordion.Body>
          <strong>bbpmusiclibrary</strong> uses a service called Resend to send
          emails of the files to users after purchase. It should arrive, give it
          time. If it has not arrived, send us a message.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>What if I lost files I purchased?</Accordion.Header>
        <Accordion.Body>
          Not a problem. If you lose your files and find that you want to use
          them again and make something new, just sign into your account, click
          on your username in the top right of{" "}
          <strong>bbpmusiclibrary.com</strong> to open the dropdown menu. Click
          on Profile then click on Downloads. A button to request a new download
          link will be available to you. After initial download, this request
          will not be available for about 8 hours. After that amount of time
          elapses, it will be available to you. Note that this link will expire
          within 15 minutes of your request.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>How do I get an account?</Accordion.Header>
        <Accordion.Body>
          You will need to make your first purchase. Our backend server will
          create an account based on your email address from PayPal, Stripe, or
          GooglePay. We will generate a random password on the server to which
          you will be sent an email informing you to create a password for your
          new account after your purchase.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
