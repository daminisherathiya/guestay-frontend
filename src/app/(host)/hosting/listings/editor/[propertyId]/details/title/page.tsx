import type { Metadata } from "next";

import { TitleEdit } from "@/components/pages/ListingEditor/components/TitleEdit";

export const metadata: Metadata = {
  title: "Title – Listing editor - Guestay",
};

export default function TitlePage() {
  return <TitleEdit />;
}
