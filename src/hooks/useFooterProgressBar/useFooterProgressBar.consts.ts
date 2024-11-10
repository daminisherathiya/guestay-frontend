import { FooterDetailsType } from "./useFooterProgressBar.types";

export const DEFAULT_FOOTER_DETIALS = {
  backUrl: "/",
  nextUrl: "/",
  progressPercentage: { setp1: 0, setp2: 0, setp3: 0 },
};

/* eslint-disable sort-keys */
export const URL_TO_FOOTER_DETAILS: Record<string, FooterDetailsType> = {
  // Step 1
  "/become-a-host/overview": {
    backUrl: "/become-a-host",
    nextUrl: "/become-a-host/[propertyId]/about-your-place",
    progressPercentage: {
      setp1: 0,
      setp2: 0,
      setp3: 0,
    },
  },
  "/become-a-host/[propertyId]/about-your-place": {
    backUrl: "/become-a-host/",
    nextUrl: "/become-a-host/[propertyId]/structure",
    progressPercentage: {
      setp1: 16.66,
      setp2: 0,
      setp3: 0,
    },
  },
  "/become-a-host/[propertyId]/structure": {
    backUrl: "/become-a-host/[propertyId]/about-your-place",
    nextUrl: "/become-a-host/[propertyId]/location",
    progressPercentage: {
      setp1: 2 * 16.66,
      setp2: 0,
      setp3: 0,
    },
  },
  "/become-a-host/[propertyId]/location": {
    backUrl: "/become-a-host/[propertyId]/structure",
    nextUrl: "/become-a-host/[propertyId]/floor-plan",
    progressPercentage: {
      setp1: 3 * 16.66,
      setp2: 0,
      setp3: 0,
    },
  },
  "/become-a-host/[propertyId]/floor-plan": {
    backUrl: "/become-a-host/[propertyId]/location",
    nextUrl: "/become-a-host/[propertyId]/stand-out",
    progressPercentage: {
      setp1: 5 * 16.66,
      setp2: 0,
      setp3: 0,
    },
  },
  "/become-a-host/[propertyId]/stand-out": {
    backUrl: "/become-a-host/[propertyId]/floor-plan",
    nextUrl: "/become-a-host/[propertyId]/amenities",
    progressPercentage: {
      setp1: 100,
      setp2: 0,
      setp3: 0,
    },
  },
  // Step 2
  "/become-a-host/[propertyId]/amenities": {
    backUrl: "/become-a-host/[propertyId]/stand-out",
    nextUrl: "/become-a-host/[propertyId]/photos",
    progressPercentage: {
      setp1: 100,
      setp2: 1 * 20,
      setp3: 0,
    },
  },
  "/become-a-host/[propertyId]/photos": {
    backUrl: "/become-a-host/[propertyId]/amenities",
    nextUrl: "/become-a-host/[propertyId]/title",
    progressPercentage: {
      setp1: 100,
      setp2: 2 * 20,
      setp3: 0,
    },
  },
  "/become-a-host/[propertyId]/title": {
    backUrl: "/become-a-host/[propertyId]/photos",
    nextUrl: "/become-a-host/[propertyId]/description",
    progressPercentage: {
      setp1: 100,
      setp2: 3 * 20,
      setp3: 0,
    },
  },
  "/become-a-host/[propertyId]/description": {
    backUrl: "/become-a-host/[propertyId]/title",
    nextUrl: "/become-a-host/[propertyId]/finish-setup",
    progressPercentage: {
      setp1: 100,
      setp2: 4 * 20,
      setp3: 0,
    },
  },
  "/become-a-host/[propertyId]/finish-setup": {
    backUrl: "/become-a-host/[propertyId]/description",
    nextUrl: "/become-a-host/[propertyId]/price",
    progressPercentage: {
      setp1: 100,
      setp2: 100,
      setp3: 0,
    },
  },
  // Step 3
  "/become-a-host/[propertyId]/price": {
    backUrl: "/become-a-host/[propertyId]/finish-setup",
    nextUrl: "/become-a-host/[propertyId]/discount",
    progressPercentage: {
      setp1: 100,
      setp2: 100,
      setp3: 1 * 33,
    },
  },
  "/become-a-host/[propertyId]/discount": {
    backUrl: "/become-a-host/[propertyId]/price",
    nextUrl: "/become-a-host/[propertyId]/receipt",
    progressPercentage: {
      setp1: 100,
      setp2: 100,
      setp3: 2 * 33,
    },
  },
  "/become-a-host/[propertyId]/receipt": {
    backUrl: "/become-a-host/[propertyId]/discount",
    nextUrl: "/become-a-host",
    progressPercentage: {
      setp1: 100,
      setp2: 100,
      setp3: 100,
    },
  },
  "/become-a-host/[propertyId]/publish": {
    backUrl: "/become-a-host/[propertyId]/receipt",
    nextUrl: "/become-a-host",
    progressPercentage: {
      setp1: 100,
      setp2: 100,
      setp3: 100,
    },
  },
};
/* eslint-enable sort-keys */
