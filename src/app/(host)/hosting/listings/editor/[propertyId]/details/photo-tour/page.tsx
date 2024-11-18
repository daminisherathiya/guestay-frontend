import type { Metadata } from "next";

import { PhotoTourEdit } from "@/components/pages/ListingEditor/components/PhotoTourEdit";

export const metadata: Metadata = {
  title: "Photo tour – Listing editor - Guestay",
};

export default function PhotoTourPage() {
  return <PhotoTourEdit />;
}
