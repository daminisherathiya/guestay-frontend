import { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Toolbar } from "@/components/atoms/Toolbar";
// import { FooterProgressBar } from "@/hooks/useFooterProgressBarProps/useFooterProgressBarProps";

export default function ListingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Box className="flex min-h-[calc(100vh-11.625rem)] flex-col items-center justify-center">
        <Box className="my-5 flex size-full grow flex-col items-center justify-center md:my-10">
          {children}
        </Box>
        {/* <Box className="w-full">
          <FooterProgressBar />
        </Box> */}
      </Box>
      <Toolbar className="min-h-[5.25rem]" />
    </>
  );
}
