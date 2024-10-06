import type { Metadata } from "next";

import AboutYourPlace from "@/components/pages/AboutYourPlace/AboutYourPlace";
export const metadata: Metadata = {
  title: "Step 1: Tell us about your place - Guestay",
};

export default function AboutYourPlacePage() {
  return <AboutYourPlace />;
}
