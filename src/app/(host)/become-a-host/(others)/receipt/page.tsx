import type { Metadata } from "next";

import Receipt from "@/components/pages/Receipt/Receipt";

export const metadata: Metadata = {
  title: "Review and save your listing - Guestay",
};

export default function ReceiptPage() {
  return <Receipt />;
}
