import type { Metadata } from "next";

import { Price } from "@/components/pages/Price/Price";

export const metadata: Metadata = {
  title: "Set your price - Guestay",
};

export default function PricePage() {
  return <Price />;
}
