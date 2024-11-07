import type { Metadata } from "next";

import { FinishSetup } from "@/components/pages/FinishSetup/FinishSetup";

export const metadata: Metadata = {
  title: "Step 3: Finish your listing - Guestay",
};

export default function FinishSetupPage() {
  return <FinishSetup />;
}
