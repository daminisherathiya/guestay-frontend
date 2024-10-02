import type { Metadata } from "next";

import localFont from "next/font/local";

import "../globals.css";
import { Box, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { Header } from "@/components/organisms/Header";
import { ThemeProvider as CustomThemeProvider } from "@/theme/ThemeProvider"; // Import your custom ThemeProvider

const airbnbCerealRegular = localFont({
  src: "../fonts/AirbnbCereal_W_Regular.otf",
  variable: "--font-airbnb-cereal-regular",
  weight: "400", // Regular
});

const airbnbCerealMedium = localFont({
  src: "../fonts/AirbnbCereal_W_Medium.otf",
  variable: "--font-airbnb-cereal-medium",
  weight: "500", // Medium
});

const airbnbCerealBold = localFont({
  src: "../fonts/AirbnbCereal_W_Bold.otf",
  variable: "--font-airbnb-cereal-bold",
  weight: "700", // Bold
});

const airbnbCerealExtraBold = localFont({
  src: "../fonts/AirbnbCereal_W_ExtraBold.otf",
  variable: "--font-airbnb-cereal-extra-bold",
  weight: "800", // Extra Bold
});

const airbnbCerealBlack = localFont({
  src: "../fonts/AirbnbCereal_W_Black.otf",
  variable: "--font-airbnb-cereal-black",
  weight: "900", // Black
});

export const metadata: Metadata = {
  description:
    "Guestay - Find and book the best guest accommodations, vacation rentals, and unique stays worldwide. Discover comfortable, affordable, and conveniently located lodging options for your next trip. Easy online booking and secure payment.",
  icons: {
    icon: "/images/logo.svg",
  },
  title: "Guestay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html id="html" lang="en">
      <body
        className={`${airbnbCerealRegular.variable} ${airbnbCerealMedium.variable} ${airbnbCerealBold.variable} ${airbnbCerealExtraBold.variable} ${airbnbCerealBlack.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <CustomThemeProvider>
            <CssBaseline />
            <Header />
            <Box className="pt-24">{children}</Box>
          </CustomThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
