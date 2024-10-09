import type { Metadata } from "next";

import Overview from "@/components/pages/Overview/Overview";

export const metadata: Metadata = {
  title: "Create your listing - Guestay",
};

export default function OverviewPage() {
  return <Overview />;
}
