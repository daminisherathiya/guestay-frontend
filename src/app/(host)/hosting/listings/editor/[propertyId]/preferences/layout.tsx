import { ListingEditor } from "@/components/pages/ListingEditor/components/ListingEditor/ListingEditor";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ListingEditor>{children}</ListingEditor>;
}
