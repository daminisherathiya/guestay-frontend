import type { Metadata } from "next";

import { RedirectToRightPropertyListingUrl } from "@/components/pages/RedirectToRightPropertyListingUrl";

export const metadata: Metadata = {
  title: "Become a Host - Guestay",
};

export default function RedirectToRightPropertyListingUrlPage() {
  return <RedirectToRightPropertyListingUrl />;
}
