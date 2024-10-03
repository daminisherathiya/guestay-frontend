import { Box } from "@mui/material";

import FooterProgressBar from "@/components/organisms/FooterProgressBar/FooterProgressBar";

export default function ListingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="mb-24 flex min-h-[calc(100vh-192px)] items-center justify-center">
      <Box className="flex h-full items-center">{children}</Box>
      <FooterProgressBar />
    </Box>
  );
}
