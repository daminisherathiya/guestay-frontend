import type { Metadata } from "next";

import { Discount } from "@/components/pages/Discount/Discount";

export const metadata: Metadata = {
  title: "Set your discount - Guestay",
};

export default function DiscountPage() {
  return <Discount />;
}
