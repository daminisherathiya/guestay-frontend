import type { Metadata } from "next";

import { PricingEdit } from "@/components/pages/ListingEditor/components/PricingEdit/PricingEdit";

export const metadata: Metadata = {
  title: "Pricing tour – Listing editor - Guestay",
};

export default function PricingPage() {
  return <PricingEdit />;
}
