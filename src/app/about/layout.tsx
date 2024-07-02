import { Metadata } from "next";
import styles from "@/styles/About.module.scss";

export const metadata: Metadata = {
  title: "BBP Music Library | Bonita Basics Productions Music Library | About",
  description:
    "About BBPMusicLibrary, Sample Curator, Digital download Sample Packs for Hip Hop, Boom Bap music production",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.BBP__About_mainContainer}>{children}</main>;
}
