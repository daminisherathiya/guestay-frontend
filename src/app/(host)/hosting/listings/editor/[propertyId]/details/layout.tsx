import { ReactNode } from "react";

import { ListingEditor } from "@/components/pages/ListingEditor/components/ListingEditor/ListingEditor";

export default function EditorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <ListingEditor>{children}</ListingEditor>;
}
