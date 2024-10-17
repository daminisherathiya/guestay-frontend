import type { Metadata } from "next";

import { ListingHome } from "@/components/pages/ListingHome/ListingHome";

export const metadata: Metadata = {
  title: "Become a Host - Guestay",
};

export default function ListingHomePage() {
  return <ListingHome />;
}
