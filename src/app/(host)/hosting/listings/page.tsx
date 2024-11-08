import type { Metadata } from "next";

import { Listings } from "@/components/pages/Listings/Listings";

export const metadata: Metadata = {
  title: "Listings - Guestay",
};

export default function ListingsPage() {
  return <Listings />;
}
