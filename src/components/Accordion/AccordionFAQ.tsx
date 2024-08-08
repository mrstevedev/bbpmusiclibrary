"use client";
import { Accordion } from "react-bootstrap";
import { useTranslations } from "next-intl";

export default function AccordionFAQ() {
  const t = useTranslations("FAQ");
  return (
    <Accordion style={{ fontWeight: 100 }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{t("question_1")}</Accordion.Header>
        <Accordion.Body>{t("answer_1")}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{t("question_2")}</Accordion.Header>
        <Accordion.Body>{t("answer_2")}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>{t("question_3")}</Accordion.Header>
        <Accordion.Body>{t("answer_3")}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
