import { PROPERTY_ID_STR } from "@/components/pages/ListingHome/ListingHome.consts";

import { URL_TO_FOOTER_DETAILS } from "./useFooterProgressBar.consts";

export const getFooterDetailsFromUrl = ({
  url,
  propertyId,
}: {
  propertyId: string;
  url: string;
}) => {
  const maskedUrl = url.replace(/\/\d+(\/|$)/, `/${PROPERTY_ID_STR}/`);
  const footerDetails = URL_TO_FOOTER_DETAILS[maskedUrl] || {
    backUrl: "/",
    nextUrl: "/",
    progressPercentage: { setp1: 0, setp2: 0, setp3: 0 },
  };
  footerDetails.backUrl = footerDetails.backUrl.replace(
    PROPERTY_ID_STR,
    propertyId,
  );
  footerDetails.nextUrl = footerDetails.nextUrl.replace(
    PROPERTY_ID_STR,
    propertyId,
  );
  return footerDetails;
};
