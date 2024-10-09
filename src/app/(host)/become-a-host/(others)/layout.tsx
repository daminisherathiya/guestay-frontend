import { Box } from "@/components/atoms/Box";
import { Toolbar } from "@/components/atoms/Toolbar";
import FooterProgressBar from "@/components/organisms/FooterProgressBar/FooterProgressBar";

export default function ListingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="flex min-h-[calc(100vh-192px)] flex-col items-center justify-center">
      <Box className="my-5 flex size-full items-center md:my-10">
        {children}
      </Box>
      <Box className="w-full">
        <Toolbar className="min-h-[5.375rem]" />
        <FooterProgressBar />
      </Box>
    </Box>
  );
}
