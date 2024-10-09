import type { Metadata } from "next";

import Photos from "@/components/pages/Photos/Photos";

export const metadata: Metadata = {
  title: "Add some photos - Guestay",
};

export default function PhotosPage() {
  return <Photos />;
}
