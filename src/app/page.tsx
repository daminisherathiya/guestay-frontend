import type { Metadata } from "next";

import { Listings } from "@/components/pages/Listings/Listings";

export const metadata: Metadata = {
  title: "Become a Host - Guestay",
};

export default function ListingHomePage() {
  return <Listings />;
}
