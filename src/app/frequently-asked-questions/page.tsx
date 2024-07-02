import React from "react";
import { Metadata } from "next";
import { Container } from "react-bootstrap";
import AccordionFAQ from "@/components/Accordion/AccordionFAQ";

export const metadata: Metadata = {
  title:
    "BBP Music Library | Bonita Basics Productions Music Library | Frequently Asked Questions",
  description:
    "About BBPMusicLibrary, Sample Curator, Digital download Sample Packs for Hip Hop, Boom Bap music production",
};

export default function page() {
  return (
    <Container>
      <div style={{ padding: "1rem 0" }}>
        <h6>FAQ</h6>
        <p style={{ fontWeight: 100 }}>Frequently Asked Questions</p>
      </div>
      <AccordionFAQ />
    </Container>
  );
}
