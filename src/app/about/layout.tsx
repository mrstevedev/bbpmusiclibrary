import { Metadata } from "next";
import styles from "@/styles/About.module.scss";

export const metadata: Metadata = {
  title: "About Bonita Basics Productions Music Library",
  description:
    "Download Sample Packs - Hip Hop, Boom Bap, Soul, Jazz - Sample Curator",
};
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.about__mainContainer}>{children}</main>;
}
