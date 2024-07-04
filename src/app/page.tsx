import Products from "@/components/Home/Products";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BBP Music Library | Bonita Basics Productions Music Library",
  description:
    "About BBPMusicLibrary, Sample Curator, Digital download Sample Packs for Hip Hop, Boom Bap music production",
  openGraph: {
    images:
      "https://d1hx41nm7bdfp5.cloudfront.net/wp-content/uploads/2024/07/02091123/bbpmusiclib_silhouette.webp",
  },
};

export default function Home() {
  return <Products />;
}
