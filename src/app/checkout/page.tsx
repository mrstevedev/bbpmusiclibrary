import CheckoutWrapper from "@/components/Checkout/CheckoutWrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title:
    "BBP Music Library | Bonita Basics Productions Music Library | Checkout",
  description:
    "About BBPMusicLibrary, Sample Curator, Digital download Sample Packs for Hip Hop, Boom Bap music production",
};
export default function page() {
  return (
    <Suspense>
      <CheckoutWrapper />;
    </Suspense>
  );
}
