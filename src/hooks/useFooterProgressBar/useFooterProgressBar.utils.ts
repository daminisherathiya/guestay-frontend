import { PROPERTY_ID_STR } from "@/components/pages/ListingHome/ListingHome.consts";

import {
  DEFAULT_FOOTER_DETIALS,
  URL_TO_FOOTER_DETAILS,
} from "./useFooterProgressBar.consts";

export const getFooterDetailsFromUrl = ({
  url,
  propertyId,
}: {
  propertyId: string;
  url: string;
}) => {
  const maskedUrl = url.replace(/\/\d+(\/|$)/, `/${PROPERTY_ID_STR}/`);
  const footerDetails = URL_TO_FOOTER_DETAILS[maskedUrl]
    ? { ...URL_TO_FOOTER_DETAILS[maskedUrl] }
    : DEFAULT_FOOTER_DETIALS;
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
