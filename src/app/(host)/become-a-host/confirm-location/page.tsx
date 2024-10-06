import type { Metadata } from "next";

import ConfirmLocation from "@/components/pages/ConfirmLocation/ConfirmLocation";

export const metadata: Metadata = {
  title: "Enter the location - Guestay",
};
export default function ConfirmLocationPage() {
  return <ConfirmLocation />;
}
