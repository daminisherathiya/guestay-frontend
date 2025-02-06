import "./wdyr";

import { ReactNode } from "react";

import type { Metadata } from "next";

import localFont from "next/font/local";

import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Toolbar } from "@/components/atoms/Toolbar";
import { AuthenticationLoader } from "@/components/molecules/AuthenticationLoader";
import { GlobalSnackbarAlert } from "@/components/molecules/GlobalSnackbarAlert";
import { Header } from "@/components/organisms/Header/Header";
import { AuthenticationProvider } from "@/providers/AuthenticationProvider/AuthenticationProvider";
import { GlobalSnackbarAlertProvider } from "@/providers/GlobalSnackbarAlertProvider/GlobalSnackbarAlertProvider";
import { QueryProvider as CustomQueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider as CustomThemeProvider } from "@/providers/ThemeProvider";

import "../globals.css";

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
    icon: "/images/logoIcon.svg",
  },
  title: "Guestay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html id="html" lang="en">
      <body
        className={`${airbnbCerealRegular.variable} ${airbnbCerealMedium.variable} ${airbnbCerealBold.variable} ${airbnbCerealExtraBold.variable} ${airbnbCerealBlack.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <CustomThemeProvider>
            <CustomQueryProvider>
              <AuthenticationProvider>
                <GlobalSnackbarAlertProvider>
                  <CssBaseline />
                  <Header />
                  <Toolbar className="min-h-[4.5rem] xs:min-h-[5.125rem] md:min-h-[5.625rem]" />
                  <AuthenticationLoader>{children}</AuthenticationLoader>
                  {process.env.NODE_ENV !== "production" && (
                    <ReactQueryDevtools initialIsOpen={false} />
                  )}
                  <GlobalSnackbarAlert />
                </GlobalSnackbarAlertProvider>
              </AuthenticationProvider>
            </CustomQueryProvider>
          </CustomThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
